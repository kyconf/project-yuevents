# main.py
from fastapi import FastAPI
from database.connection import get_connection
from fastapi.middleware.cors import CORSMiddleware

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
    # Get a connection and close it immediately (example)
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT 1")  # simple test query
    result = cur.fetchone()
    cur.close()
    conn.close()
    return {"message": "Connected to PostgreSQL!", "test_query": result[0]}

@app.get("/ping")
def pong():
    return {"pong"}
