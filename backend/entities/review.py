from pydantic import BaseModel, Field, UUID4, field_validator
from datetime import datetime
from typing import Optional

class ReviewBase(BaseModel):
    rating: float = Field(..., ge=1, le=5)

    @field_validator("rating")
    def validate_step(cls, v):
        if (v * 2) % 1 != 0:
            raise ValueError("Rating must be in increments of 0.5")
        return v
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    events_id: UUID4

class ReviewUpdate(BaseModel):
    rating: Optional[float] = Field(None, ge=1, le=5)

    @field_validator("rating")
    def validate_half_step(cls, v):
        if v is None:
            return v
        if (v * 2) % 1 != 0:
            raise ValueError("Rating must be in increments of 0.5")
        return v
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