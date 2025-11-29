import asyncio
import os
import sys
import logging
import json
from dotenv import load_dotenv

# --- 1. PATH SETUP (Copied from run_scraper.py to ensure imports work) ---
current_file_dir = os.path.dirname(os.path.abspath(__file__))
backend_root = os.path.normpath(os.path.join(current_file_dir, '..', '..'))

if backend_root not in sys.path:
    sys.path.append(backend_root)

# Add services and parsers to path so the Scraper can find them
services_dir = os.path.join(backend_root, 'services')
if services_dir not in sys.path: sys.path.append(services_dir)

parsers_dir = os.path.join(backend_root, 'scrapers', 'parsers')
if parsers_dir not in sys.path: sys.path.append(parsers_dir)

# -------------------------------------------------------------------------

from discord_scraper_service import DiscordScraperService

# Load environment variables
load_dotenv()
logging.basicConfig(level=logging.INFO)

# --- 2. DEFINE A MOCK SERVICE ---
class MockEventService:
    """
    This pretends to be EventService. 
    Instead of saving to the DB, it just prints the parsed result.
    """
    def create_event(self, event_data: dict):
        print("\n" + "✅" * 20)
        print(" [PARSER SUCCESS] Ready to Save:")
        print("✅" * 20)
        
        # Pretty print the dictionary so you can verify the parsing logic
        print(json.dumps(event_data, indent=4, default=str))
        
        print("-" * 40 + "\n")
        return event_data

async def main():
    print("--- STARTING TEST: FETCH + PARSE (NO DB) ---")

    # 1. Get Channel IDs from env
    CHANNEL_IDS = os.getenv("DISCORD_CHANNEL_IDS")
    if not CHANNEL_IDS:
        print("Error: DISCORD_CHANNEL_IDS not found in .env")
        return
        
    # Convert string list to int list
    channel_ids = [int(x) for x in CHANNEL_IDS.split(",") if x.strip()]
    
    # 2. Setup the Scraper with the MOCK service
    # We pass 'MockEventService()' instead of the real 'EventService()'
    mock_service = MockEventService()
    scraper = DiscordScraperService(event_service=mock_service)

    # 3. Run the scraper
    # This will: Fetch -> Parse -> Call mock_service.create_event() -> Print
    await scraper.scrape_and_save(channel_ids)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nTest stopped.")