from fastapi import APIRouter, HTTPException, status
from typing import List
from entities.review import Review, ReviewCreate, ReviewUpdate, ReviewAverage
from services.review_service import ReviewService
from fastapi.encoders import jsonable_encoder

router = APIRouter(prefix="/reviews", tags=["Reviews"])
service = ReviewService()

@router.get("/event/{events_id}", response_model=List[Review])
def get_event_reviews(events_id: str):
    try:
        return service.get_reviews_by_event(events_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/event/{events_id}/average", response_model=ReviewAverage)
def get_event_average(events_id: str):
    try:
        return service.get_average_rating(events_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Review, status_code=status.HTTP_201_CREATED)
def create_review(review: ReviewCreate):
    try:
        payload = jsonable_encoder(review, exclude_none=True)
        row = service.create_review(payload)
        return Review.model_validate(row)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{review_id}", response_model=Review)
def update_review(review_id: str, review: ReviewUpdate):
    try:
        payload = jsonable_encoder(review, exclude_none=True)
        # TODO: Update the timestamp manually if DB trigger doesn't exist
        # payload['update_at'] = datetime.now(timezone.utc).isoformat()
        
        updated = service.update_review(review_id, payload)
        return Review.model_validate(updated)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(review_id: str):
    try:
        service.delete_review(review_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))