from pydantic import BaseModel, Field, UUID4
from datetime import datetime
from typing import Optional

class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Rating must be between 1 and 5")
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    events_id: UUID4

class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    comment: Optional[str] = None

class Review(ReviewBase):
    id: UUID4
    profile_id: UUID4
    events_id: UUID4
    create_at: datetime
    update_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ReviewAverage(BaseModel):
    events_id: UUID4
    average_rating: float
    review_count: int