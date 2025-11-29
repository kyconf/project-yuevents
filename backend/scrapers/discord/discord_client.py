import asyncio
import discord
from discord import Intents, Object
import os
from dotenv import load_dotenv
load_dotenv()
# TODO: Make the backend folder a package to load the env once at the root

DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
MESSAGE_FETCH_LIMIT = os.getenv("MESSAGE_FETCH_LIMIT")

intents = Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

async def start_client() -> None:
    if not client.is_ready():
        await client.login(DISCORD_TOKEN)
        asyncio.create_task(client.connect())
        await client.wait_until_ready()
        print(f" Bot connected as {client.user}")


async def fetch_messages_from_channel(channel_id: int, after_id: int = None, limit: int = MESSAGE_FETCH_LIMIT) -> list[discord.Message]:
    """
    Fetch messages from a specific Discord channel.
    Automatically starts the client if not already started.
    If `after_id` is provided, fetches messages created *after* that ID (Chronological: Oldest -> Newest).
    If `after_id` is None, fetches most recent messages (Reverse-Chronological: Newest -> Oldest).
    """
    await start_client()

    channel = client.get_channel(channel_id)
    if channel is None:
        channel = await client.fetch_channel(channel_id)

    after_obj = Object(id=after_id) if after_id else None

    messages = [m async for m in channel.history(limit=limit, after=after_obj)]
    return messages


async def fetch_messages_from_channels(channel_ids: list[int], last_known_ids: dict[int, int] = None, limit: int = MESSAGE_FETCH_LIMIT) -> dict[int, list[discord.Message]]:
    """
    Fetch messages from multiple channels, respecting the last_known_id for each
    Returns a dict mapping channel_id -> list of messages.
    """
    await start_client()
    if last_known_ids is None:
        last_known_ids = {}

    all_messages = {}
    for channel_id in channel_ids:
        # Get the specific last_id for this channel, or None if it's the first run
        after_id = last_known_ids.get(str(channel_id)) or last_known_ids.get(channel_id)

        try:
            messages = await fetch_messages_from_channel(channel_id, after_id=after_id, limit=limit)
            all_messages[channel_id] = messages
        except Exception as e:
            print(f"Error fetching messages from channel {channel_id}: {e}")
            all_messages[channel_id] = []

    return all_messages
