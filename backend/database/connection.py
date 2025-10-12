# database/connection.py
import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    """
    Returns a new PostgreSQL connection.
    """
    conn = psycopg2.connect(
        host="localhost",
        database="yuevents",
        user="postgres",
        password="yourpassword"  # <-- replace with your actual password
    )
    return conn
