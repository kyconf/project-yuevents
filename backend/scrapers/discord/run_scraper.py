import asyncio
import os
import sys
import logging
from dotenv import load_dotenv

# --- PATH SETUP ---
# Get the directory where this script is located
current_file_dir = os.path.dirname(os.path.abspath(__file__))

# 1. Calculate the 'backend' root directory
# logical path: current -> discord -> scrapers -> backend
backend_root = os.path.normpath(os.path.join(current_file_dir, '..', '..'))

# 2. CRITICAL FIX: Add 'backend' root to sys.path
# This allows event_repository to find 'supabase_client'
if backend_root not in sys.path:
    sys.path.append(backend_root)

# 3. Add other directories (repositories, services, parsers)
repos_dir = os.path.join(backend_root, 'repositories')
if repos_dir not in sys.path:
    sys.path.append(repos_dir)

services_dir = os.path.join(backend_root, 'services')
if services_dir not in sys.path:
    sys.path.append(services_dir)

parsers_dir = os.path.join(backend_root, 'scrapers', 'parsers')
if parsers_dir not in sys.path:
    sys.path.append(parsers_dir)

# ------------------

# Now these imports will work because Python knows where to look
from event_repository import EventRepository
from event_service import EventService
# This import works because it is in the same folder as this script
from discord_scraper_service import DiscordScraperService

load_dotenv()
logging.basicConfig(level=logging.INFO)

def main():
    # CONFIGURATION
    # TODO: Replace these strings with the strings from the 
    CHANNEL_IDS = os.getenv("DISCORD_CHANNEL_IDS")  # e.g., [123456789012345678, 987654321098765432]
    CHANNEL_IDS = [int(x) for x in CHANNEL_IDS.split(",") if x.strip()]
    
    # DEPENDENCY INJECTION
    event_repo = EventRepository()
    event_service = EventService(repo=event_repo)
    scraper = DiscordScraperService(event_service=event_service)

    # EXECUTION
    try:
        asyncio.run(scraper.scrape_and_save(CHANNEL_IDS))
    except KeyboardInterrupt:
        print("\nScraper stopped.")

if __name__ == "__main__":
    main()