import asyncio
import discord
from discord import Intents, Object
import os
from dotenv import load_dotenv

load_dotenv()

DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

try:
    MESSAGE_FETCH_LIMIT = int(os.getenv("MESSAGE_FETCH_LIMIT", 100))
except ValueError:
    MESSAGE_FETCH_LIMIT = 100

intents = Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

async def start_client() -> None:
    if not client.is_ready():
        print("[DEBUG] Client not ready. Logging in...")
        await client.login(DISCORD_TOKEN)
        asyncio.create_task(client.connect())
        await client.wait_until_ready()
        print(f" Bot connected as {client.user}")
    else:
        print("[DEBUG] Client already ready.")

async def fetch_messages_from_channel(channel_id: int, after_id: int = None, limit: int = MESSAGE_FETCH_LIMIT) -> list[discord.Message]:
    print(f"[DEBUG] Starting fetch for channel: {channel_id}")
    await start_client()

    print(f"[DEBUG] Getting channel object for {channel_id}...")
    channel = client.get_channel(channel_id)
    if channel is None:
        try:
            print(f"[DEBUG] Channel not in cache, fetching from API...")
            channel = await client.fetch_channel(channel_id)
        except Exception as e:
            print(f"[DEBUG] Could not fetch channel {channel_id}: {e}")
            return []

    print(f"[DEBUG] Channel found: {channel.name if hasattr(channel, 'name') else 'Unknown'}")
    
    # Setup the 'after' object
    after_obj = Object(id=after_id) if after_id else None
    if after_obj:
        print(f"[DEBUG] Fetching history AFTER message ID: {after_id}")
    else:
        print(f"[DEBUG] Fetching latest {limit} messages...")

    # Fetch
    try:
        messages = [m async for m in channel.history(limit=limit, after=after_obj)]
        print(f"[DEBUG] Successfully fetched {len(messages)} messages.")
        return messages
    except Exception as e:
        print(f"[DEBUG] Error during history iteration: {e}")
        return []

async def fetch_messages_from_channels(channel_ids: list[int], last_known_ids: dict[int, int] = None, limit: int = MESSAGE_FETCH_LIMIT) -> dict[int, list[discord.Message]]:
    await start_client()
    if last_known_ids is None:
        last_known_ids = {}

    all_messages = {}
    for channel_id in channel_ids:
        print(f"[DEBUG] Processing channel ID from list: {channel_id}")
        after_id = last_known_ids.get(str(channel_id)) or last_known_ids.get(channel_id)
        
        try:
            messages = await fetch_messages_from_channel(channel_id, after_id=after_id, limit=limit)
            all_messages[channel_id] = messages
        except Exception as e:
            print(f"[DEBUG] Error in loop for {channel_id}: {e}")
            all_messages[channel_id] = []

    return all_messages