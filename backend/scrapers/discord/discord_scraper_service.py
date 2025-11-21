import logging
import asyncio
import os
import sys
from typing import Dict, List, Callable, Any

# TODO: REALLY NEED to make backend a package to avoid this sys.path hackery
# --- IMPORT SETUP ---
current_file_dir = os.path.dirname(os.path.abspath(__file__))

# 1. Import Services (../../services)
services_dir = os.path.normpath(os.path.join(current_file_dir, '..', '..', 'services'))
if services_dir not in sys.path:
    sys.path.append(services_dir)

# 2. Import Parsers (../parsers)
parsers_dir = os.path.normpath(os.path.join(current_file_dir, '..', 'parsers'))
if parsers_dir not in sys.path:
    sys.path.append(parsers_dir)

# 3. Import Entities (../../entities)
entities_dir = os.path.normpath(os.path.join(current_file_dir, '..', '..', 'entities'))
if entities_dir not in sys.path:
    sys.path.append(entities_dir)

# Now we can import safely
from event_service import EventService
from parsing_router import hybrid_parse_event

try:
    import discord_client
except ImportError:
    # If running from a different root, we might need to append current dir
    if current_file_dir not in sys.path:
        sys.path.append(current_file_dir)
    import discord_client
# --------------------

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class DiscordScraperService:
    def __init__(
        self, 
        event_service: EventService,
        fetch_messages_func: Callable = discord_client.fetch_messages_from_channels,
        parse_event_func: Callable[[str], dict] = hybrid_parse_event
    ):
        self.event_service = event_service
        self.fetch_messages_func = fetch_messages_func
        self.parse_event_func = parse_event_func

    async def scrape_and_save(self, channel_ids: List[str]):
        if not channel_ids:
            logger.warning("No channels provided.")
            return 0

        logger.info(f"Starting scrape for {len(channel_ids)} channels...")
        
        # 1. Fetch
        raw_data = await self.fetch_messages_func(channel_ids=channel_ids, limit=10)
        
        total_events = 0
        
        # 2. Process
        for channel_id, messages in raw_data.items():
                
            logger.info(f"Processing {len(messages)}")
            count = await self._process_messages(messages)
            total_events += count

        logger.info(f"Scraping run complete. New events: {total_events}")
        return total_events

    async def _process_messages(self, messages: List[Any]) -> int:
        saved_count = 0
        for msg in messages:
            content = msg.content
            if not content:
                continue

            try:
                # 3. Parse
                parsed_event = self.parse_event_func(content)
                
                # 4. Add Club ID (Transformation)
                event_payload = parsed_event.copy()

                # 5. Save
                self.event_service.create_event(event_payload)
                saved_count += 1
                
            except Exception as e:
                logger.error(f"Skipping message {msg.id}: {e}")
        
        return saved_count