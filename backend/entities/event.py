from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventBase(BaseModel):
   id: str
   title: str
   description: Optional[str]
   location: str
   start_at: str
   end_at: str
   rsvp_deadline: Optional[str]
   capacity: int
   is_public: bool
   slug: Optional[str]
   created_at: str
   updated_at: str
   banner: str
   club_id: str

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    location: Optional[str]
    start_at: Optional[datetime]
    end_at: Optional[datetime]
    rsvp_deadline: Optional[datetime]
    capacity: Optional[int]
    is_public: Optional[bool]
    slug: Optional[str]

class Event(EventBase):
    id: str
    created_at: datetime
    updated_at: datetime
