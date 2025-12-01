import asyncio
import os
import sys
import logging
from dotenv import load_dotenv
import time

# --- PATH SETUP ---
current_file_dir = os.path.dirname(os.path.abspath(__file__))
# Logic: backend/scrapers/ -> backend/
backend_root = os.path.normpath(os.path.join(current_file_dir, '..'))

if backend_root not in sys.path:
    sys.path.append(backend_root)

# Add sub-directories for cleaner imports
services_dir = os.path.join(backend_root, 'services')
if services_dir not in sys.path: sys.path.append(services_dir)

repos_dir = os.path.join(backend_root, 'repositories')
if repos_dir not in sys.path: sys.path.append(repos_dir)
# ----------------------------------------

from event_repository import EventRepository
from event_service import EventService

# Import Scrapers
from discord.discord_scraper_service import DiscordScraperService

load_dotenv()
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def main():
    start_time = time.time()
    logger.info("🚀 STARTING GLOBAL EVENT AGGREGATOR")

    # 1. Initialize Core Backend Services (Singleton pattern)
    event_repo = EventRepository()
    event_service = EventService(repo=event_repo)

    # 2. Define the list of scrapers to run
    scrapers = [
        DiscordScraperService(event_service),
    ]

    # 3. Execute concurrently
    # The interface is standard now: .scrape() returns a DICTIONARY
    tasks = [scraper.scrape() for scraper in scrapers]
    results = await asyncio.gather(*tasks)

    # 4. Report Summary
    logger.info("="*40)
    logger.info("📊 AGGREGATION REPORT")
    logger.info("="*40)
    
    total_new = 0
    for res in results:
        status_icon = "✅" if res.get('status') == 'success' else "❌"
        if res.get('status') == 'skipped': status_icon = "⚠️"
        
        # EXTRACT THE COUNT CORRECTLY FROM THE DICTIONARY
        count = res.get('new_events', 0)
        total_new += count
        
        print(f"{status_icon} {res['platform']:<15} | New Events: {count}")

    duration = time.time() - start_time
    logger.info(f"\n🏁 Finished in {duration:.2f} seconds. Total New Events: {total_new}")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nAggregator stopped by user.")