from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from uuid import UUID


# KEEP THIS WHEN MERGING INTO DEV AND MAIN (this lets me debug stuff so much easier)
try:
    # Try the Server way first (Relative import)
    # This works when running FastAPI
    from .club import ClubWithEvent
except ImportError:
    # Fallback to the Scraper/Script way (Absolute import)
    # This works when running run_aggregator.py
    from club import ClubWithEvent


class EventBase(BaseModel):
   title: str
   description: Optional[str] = None
   location: Optional[str] = None
   start_at: datetime
   end_at: datetime
   rsvp_deadline: Optional[datetime] = None
   capacity: Optional[int] = Field(default=None, ge=0)
   is_public: bool = True
   slug: Optional[str] = None
   banner: Optional[str] = None 

  


class EventCreate(EventBase):
   club_id: UUID


class EventUpdate(BaseModel):
   title: Optional[str] = None
   description: Optional[str] = None
   location: Optional[str] = None
   start_at: Optional[datetime] = None
   end_at: Optional[datetime] = None
   rsvp_deadline: Optional[datetime] = None
   capacity: Optional[int] = None
   is_public: Optional[bool] = None
   slug: Optional[str] = None
   banner: Optional[str] = None


class Event(EventBase):
   id: str


class EventWithClub(Event):
   club: ClubWithEvent
