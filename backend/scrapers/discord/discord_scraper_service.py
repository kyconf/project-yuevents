import logging
import os
import sys
import json
from typing import List, Any

# --- PATH SETUP (Condensed) ---
current_dir = os.path.dirname(os.path.abspath(__file__))
root_backend = os.path.normpath(os.path.join(current_dir, '..', '..'))
sys.path.extend([
    root_backend, 
    os.path.join(root_backend, 'services'),
    os.path.join(root_backend, 'entities'),
    os.path.join(current_dir, '..'),          # Base Scraper
    os.path.join(current_dir, '..', 'parsers') # Parsers
])
# ------------------------------

from event_service import EventService
from parsing_router import hybrid_parse_event
from base_scraper import BaseScraper 

try:
    import discord_client
except ImportError:
    sys.path.append(current_dir)
    import discord_client

logger = logging.getLogger(__name__)
STATE_FILE = os.path.join(current_dir, "scraper_state.json")

class DiscordScraperService(BaseScraper):
    def __init__(self, event_service: EventService):
        self.event_service = event_service
        self.fetch_func = discord_client.fetch_messages_from_channels
        self.parse_func = hybrid_parse_event

        self.default_club_id = os.getenv("DEFAULT_CLUB_ID")

    async def scrape(self) -> dict:
        """Main Entry Point: Orchestrates the Fetch -> Parse -> Save flow."""
        try:
            # 1. Configuration
            channel_ids = self._get_channel_ids()
            if not channel_ids:
                return {"platform": "Discord", "status": "skipped", "new_events": 0}

            # 2. Execution
            state = self._load_state()
            raw_data = await self.fetch_func(channel_ids=channel_ids, last_known_ids=state)
            
            total_events = 0
            
            # 3. Processing Loop
            for channel_id, messages in raw_data.items():
                if not messages: continue

                # Save Events
                total_events += await self._process_messages(messages)
                
                # Update State (Calculate newest message ID)
                self._update_channel_state(state, channel_id, messages)

            # 4. Cleanup
            self._save_state(state)
            return {"platform": "Discord", "status": "success", "new_events": total_events}

        except Exception as e:
            logger.error(f"[Discord] Critical Failure: {e}", exc_info=True)
            return {"platform": "Discord", "status": "error", "error": str(e)}

    # --- HELPER METHODS (Keep the main logic clean) ---

    def _get_channel_ids(self) -> List[int]:
        ids_str = os.getenv("DISCORD_CHANNEL_IDS", "")
        return [int(x) for x in ids_str.split(",") if x.strip()]

    def _update_channel_state(self, state: dict, channel_id: int, messages: List[Any]):
        """Decides which message ID is the 'newest' based on fetch order."""
        # If we used 'after' (key exists in state), Discord returns Oldest->Newest.
        # If first run, Discord returns Newest->Oldest.
        used_after_param = str(channel_id) in state or channel_id in state
        
        newest_msg = messages[-1] if used_after_param else messages[0]
        state[str(channel_id)] = newest_msg.id

    async def _process_messages(self, messages: List[Any]) -> int:
        count = 0
        for msg in messages:
            if not msg.content: continue
            try:
                parsed = self.parse_func(msg.content)
                self.event_service.create_event(parsed.copy())
                count += 1
            except Exception:
                pass # Skip unparsable messages silently
        return count

    def _load_state(self) -> dict:
        if os.path.exists(STATE_FILE):
            try:
                with open(STATE_FILE, 'r') as f:
                    data = json.load(f)
                    # Ensure all Message IDs are integers
                    return {k: int(v) for k, v in data.items() if v is not None}
            except Exception as e:
                logger.warning(f"State file exists but could not be loaded: {e}")
        return {}


    def _save_state(self, state: dict):
        try:
            with open(STATE_FILE, 'w') as f: json.dump(state, f, indent=4)
        except Exception as e:
            logger.error(f"Failed to save state: {e}")