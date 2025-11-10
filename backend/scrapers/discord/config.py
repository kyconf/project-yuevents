import os
from dotenv import load_dotenv
load_dotenv()

DISCORD_TOKEN = os.getenv("DISCORD_BOT_TOKEN")
CHANNEL_IDS = [int(x) for x in os.getenv("DISCORD_CHANNEL_IDS", "").split(",") if x]
MESSAGE_FETCH_LIMIT = int(os.getenv("MESSAGE_FETCH_LIMIT"))
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")