from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict
from enum import Enum
from uuid import UUID
class ClubJoinPolicy(str, Enum):
    open = "open"
    invite_only = "invite_only"
    request = "request"
   

class ClubBase(BaseModel):
    owner_id: str
    name: str
    slug: Optional[str]
    about: Optional[str]
    avatar_url: Optional[str] = "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/default-avatar-icon-of-social-media-user-vector.jpg"
    banner_url: Optional[str] = "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/banner-clubs.png"
    is_public: bool
    join_policy: ClubJoinPolicy
    contact_email: Optional[EmailStr]
    website: Optional[str]
    socials: Optional[Dict]

class ClubCreate(ClubBase):
    owner_id: UUID

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

class ClubWithEvent(BaseModel):
    id: str
    name: str
    slug: str