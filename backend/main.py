# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase

app = FastAPI()

# Allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # <-- allow all origins
    allow_credentials=True,
    allow_methods=["*"],   # <-- allow all HTTP methods
    allow_headers=["*"],   # <-- allow all headers
)


@app.get("/")
def home():
    try:
        users = supabase.auth.admin.list_users()  # Connection check
        return {"message": "Connected to Supabase!", "user_count": len(users)}
    except Exception as e:
        return {"error": str(e)}

@app.get("/ping")
def pong():
    return {"pong": True}