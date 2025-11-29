# Event Scraping Architecture

This directory contains the scraping logic for various platforms (Discord, Instagram, etc.) and the shared parsing logic used to normalize event data.

## 🏗 System Design

The system follows a **Fetch → Parse → Save** pipeline:

1.  **Scrapers (e.g., `discord/`, `instagram/`):** - Responsible for connecting to external APIs or Clients.
    - Fetches raw text, HTML, or JSON.
    - Handles state (e.g., `scraper_state.json` to remember the last scraped item).
    - **Output:** Passes raw text to the Parsers.

2.  **Parsers (`parsers/`):** - Shared logic that takes raw text and extracts structured event data (Name, Date, Location).
    - Uses a **Hybrid Approach**: Fast Heuristics (Regex/Rules) + LLM Fallback (HuggingFace).
    - **Output:** A standardized dictionary ready for the database.

3.  **Services:**
    - The scrapers inject the parsed data into the `EventService` (Backend) to save to Supabase.

## 📂 Directory Structure

- **`discord/`**: The Discord bot client and scraper service.
- **`instagram/`**: (Planned) Instagram scraping logic.
- **`parsers/`**: Reusable parsing logic. **All new scrapers should use `parsing_router.py`** to ensure consistent data formatting.

## 🚀 Quick Start for Developers (Adding a New Scraper)

1. Create a new folder (e.g., `tiktok/`).
2. Implement a fetcher that retrieves raw text.
3. Import `hybrid_parse_event` from `../parsers/parsing_router.py`.
4. Pass the text to the parser to get a standardized dictionary.
5. Use `EventService` to save the result.

## ⚙️ Setup Requirements

Because the parsers module uses LLMs for fallback parsing, you must provide an API Key.

**Add this to your `.env` file:**

```bash
HUGGINGFACE_API_KEY=hf_your_api_key_here