from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict
from enum import Enum

class ClubJoinPolicy(str, Enum):
    open = "open"
    invite_only = "invite_only"
    request = "request"
    # Add more policies if needed

class ClubBase(BaseModel):
    owner_id: str
    name: str
    slug: Optional[str]
    about: Optional[str]
    avatar_url: Optional[str]
    banner_url: Optional[str]
    is_public: bool
    join_policy: ClubJoinPolicy
    contact_email: Optional[EmailStr]
    website: Optional[str]
    socials: Optional[Dict]

class ClubCreate(ClubBase):
    pass

class ClubUpdate(BaseModel):
    name: Optional[str]
    slug: Optional[str]
    about: Optional[str]
    avatar_url: Optional[str]
    banner_url: Optional[str]
    is_public: Optional[bool]
    join_policy: Optional[ClubJoinPolicy]
    contact_email: Optional[EmailStr]
    website: Optional[str]
    socials: Optional[Dict]

class Club(ClubBase):
    id: str
    created_at: datetime
    updated_at: datetime
