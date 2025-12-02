# Event Scraping & Aggregation Architecture

This directory contains the unified scraping pipeline for collecting event data from external platforms (Discord, etc.) and normalizing it for the database.

## 🏗 System Design

The system follows a **Aggregator → Fetch → Parse → Enrich → Save** pipeline:

1.  **The Aggregator (`run_aggregator.py`):**
    * The single entry point for the system.
    * Initializes the Backend Services (Repository/Service).
    * Runs all registered scrapers concurrently using `asyncio`.
    * Generates a summary report of success/failures.

2.  **Scraper Services (e.g., `DiscordScraperService`):**
    * **Must inherit from `BaseScraper`.**
    * Handles platform connection (API/Client).
    * Manages state (tracking `last_seen_id` in `scraper_state.json`).
    * **Crucial Step:** Injects the `club_id` (context) into the parsed data before saving.

3.  **Parsers (`parsers/`):**
    * Pure logic functions that take raw text and return a dictionary.
    * **Router (`hybrid_parse_event`):** Orchestrates the parsing strategy.
    * **LLM Parser:** Uses HuggingFace Inference (Mistral) to extract JSON from unstructured text.
    * **Heuristic Parser:** (Fallback) Uses Regex/Rules for simple formats.

## 📂 Directory Structure

```text
scrapers/
├── run_aggregator.py        # 🚀 MAIN ENTRY POINT
├── base_scraper.py          # Abstract Base Class (Interface)
├── discord/                 # Discord-specific implementation
│   ├── discord_scraper_service.py
│   ├── discord_client.py
│   └── scraper_state.json
├── parsers/                 # Shared parsing logic
│   ├── parsing_router.py
│   ├── discord_llm_parser.py
│   └── discord_heuristic_parser.py
└── ... (future platforms)
```
## ⚙️ Configuration & Environment
The system relies on a .env file in the project root.

Required Variables:

```Bash

# --- LLM & Parsing ---
HUGGINGFACE_API_KEY=hf_your_api_key_here
# Optional: Set to True to skip API calls and return dummy data for testing
MOCK_LLM=False  

# --- Discord Configuration ---
DISCORD_TOKEN=your_bot_token
DISCORD_CHANNEL_IDS=123456789,987654321

# --- Data Injection ---
# The UUID of the club these events belong to (Required for Database Validation)
DEFAULT_CLUB_ID=your-club-uuid-here
```
## 🚀 Developer Guide: Adding a New Scraper
To add a new platform (e.g., instagram), follow these steps to ensure it works with the Aggregator:

1. Create Directory: Create scrapers/instagram/.

2. Inherit Base: Create a service class that inherits from BaseScraper.

3. Implement scrape():

    - Fetch raw data.

    - Import hybrid_parse_event from parsers.parsing_router.

    - IMPORTANT: After parsing, you must manually inject the club_id into the dictionary (see DiscordScraperService for reference).

    - Call self.event_service.create_event().

4. Register: Add your new service class to the scrapers list inside run_aggregator.py.

## 🧪 Testing & Debugging
- Mock Mode: If you don't want to waste LLM credits while testing the pipeline, set MOCK_LLM=True in your .env. The parser will return a hardcoded "Mock Event".

- Standalone Test: You can run python backend/scrapers/run_aggregator.py directly to test the full loop.