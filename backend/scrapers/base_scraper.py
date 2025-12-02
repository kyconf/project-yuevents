from abc import ABC, abstractmethod
from typing import Any

class BaseScraper(ABC):
    """
    Abstract Base Class that all scrapers must inherit from.
    This ensures the Aggregator knows exactly how to run them.
    """

    @abstractmethod
    async def scrape(self) -> dict:
        """
        Main entry point for the scraper.
        
        Returns:
            dict: A summary of results, e.g., 
                  {'platform': 'discord', 'new_events': 5, 'errors': 0}
        """
        pass