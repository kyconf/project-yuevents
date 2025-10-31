from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    user = "user"
    admin = "admin"
    # Add more roles if needed

class ProfileBase(BaseModel):
    username: Optional[str]
    full_name: Optional[str]
    avatar_url: Optional[str]
    role: Optional[UserRole] = UserRole.user
    about: Optional[str]

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(BaseModel):
    username: Optional[str]
    full_name: Optional[str]
    avatar_url: Optional[str]
    role: Optional[UserRole]
    about: Optional[str]

class Profile(ProfileBase):
    id: str
    created_at: datetime
    updated_at: datetime
