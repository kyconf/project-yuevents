# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase
from controllers.event_controller import router as event_router
from controllers.user_controller import router as user_router
from controllers.club_controller import router as club_router
from controllers.review_controller import router as review_router

app = FastAPI()
# Allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # <-- allow all origins
    allow_credentials=True,
    allow_methods=["*"],   # <-- allow all HTTP methods
    allow_headers=["*"],   # <-- allow all headers
)

app.include_router(event_router)
app.include_router(user_router)
app.include_router(club_router)
app.include_router(review_router)

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