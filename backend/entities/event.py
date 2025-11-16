from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventBase(BaseModel):
    # creator_id: str
    title: str
    description: Optional[str]
    location: Optional[str]
    start_at: datetime
    end_at: datetime
    rsvp_deadline: Optional[datetime]
    capacity: Optional[int]
    is_public: bool
    slug: Optional[str]

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
    # id: str
    created_at: datetime
    updated_at: datetime
