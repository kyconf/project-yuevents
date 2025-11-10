import asyncio
import discord
from discord import Intents
from config import DISCORD_TOKEN, MESSAGE_FETCH_LIMIT

intents = Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

async def start_client() -> None:
    if not client.is_ready():
        await client.login(DISCORD_TOKEN)
        await client.connect(reconnect=True)
        await asyncio.sleep(1)


async def fetch_messages_from_channel(channel_id: int, limit: int = MESSAGE_FETCH_LIMIT) -> list[discord.Message]:
    """
    Fetch messages from a specific Discord channel.
    Automatically starts the client if not already started."""
    await start_client()

    channel = client.get_channel(channel_id)
    if channel is None:
        channel = await client.fetch_channel(channel_id)

    messages = [m async for m in channel.history(limit=limit)]
    return messages


async def fetch_messages_from_channels(channel_ids: list[int], limit: int = MESSAGE_FETCH_LIMIT) -> dict[int, list[discord.Message]]:
    """
    Fetch messages from multiple channels.
    Returns a dict mapping channel_id -> list of messages.
    """
    await start_client()

    all_messages = {}
    for channel_id in channel_ids:
        try:
            messages = await fetch_messages_from_channel(channel_id, limit=limit)
            all_messages[channel_id] = messages
        except Exception as e:
            print(f"Error fetching messages from channel {channel_id}: {e}")
            all_messages[channel_id] = []

    return all_messages