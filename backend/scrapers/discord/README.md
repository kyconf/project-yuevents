# Discord Event Scraper

This module runs a Discord Client that fetches messages from specific channels, parses them for event details, and saves them to the database.

## 🧩 Components

- **`discord_client.py`**: Handles the raw connection to Discord Gateway and message fetching.
- **`discord_scraper_service.py`**: Orchestrates the flow. It loads the `scraper_state`, calls the client, sends text to the `parsers`, and saves to the DB.
- **`run_scraper.py`**: The entry point script.
- **`scraper_state.json`**: A local file (git-ignored) that tracks the ID of the last scraped message to prevent duplicates.

## ⚙️ Setup

### 1. Environment Variables
Ensure your `.env` file contains the following:

```bash
DISCORD_TOKEN=your_bot_token_here
DISCORD_CHANNEL_IDS=123456789012345,987654321098765
MESSAGE_FETCH_LIMIT=100
```

### 2. Discord Permissions
- The Bot must be invited to the server.
- **CRITICAL:** You must enable **"Message Content Intent"** in the [Discord Developer Portal](https://discord.com/developers/applications) under your Bot's settings (Bot Tab -> Privileged Gateway Intents).

## 🏃‍♂️ How to Run

To run the scraper manually:

```bash
# From inside scrapers/discord/
python run_scraper.py
```

## 🧪 Testing
To test fetching and parsing without saving to the database:

```bash
python test_scraper_no_db.py
```

## ⚠️ Notes on State
The scraper_state.json file is generated automatically after the first successful run.

- It stores the ID of the newest message scraped.

- If you need to re-scrape old messages, delete this file. The scraper will then default to fetching the last MESSAGE_FETCH_LIMIT messages.