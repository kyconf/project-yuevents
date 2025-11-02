from supabase import create_client
import os
from dotenv import load_dotenv

# Loads Supabase URL and KEY from .env
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

response = supabase.table("clubs").select("*").limit(1).execute()
print(response)