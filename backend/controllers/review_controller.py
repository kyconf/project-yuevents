from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from entities.review import Review, ReviewCreate, ReviewUpdate, ReviewAverage
from services.review_service import ReviewService
from services.jwt_service import JwtService
from fastapi.encoders import jsonable_encoder
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(prefix="/reviews", tags=["Reviews"])
service = ReviewService()
jwtService = JwtService("secret")

# JWT dependency
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        decoded_token = jwtService.decode_token(token)
        return decoded_token
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )

# Public endpoints - no authentication needed
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

# Protected endpoints - require authentication
@router.post("/", response_model=Review, status_code=status.HTTP_201_CREATED)
def create_review(
    review: ReviewCreate, 
    current_user: dict = Depends(get_current_user)
):
    try:
        # Extract profile_id from JWT token
        profile_id = current_user["user_id"]  # This comes from your JWT token
        
        # Convert to payload and add the profile_id from JWT
        payload = jsonable_encoder(review, exclude_none=True)
        payload["profile_id"] = profile_id  # Add the profile_id from JWT
        
        row = service.create_review(payload)
        return Review.model_validate(row)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{review_id}", response_model=Review)
def update_review(
    review_id: str, 
    review: ReviewUpdate,
    current_user: dict = Depends(get_current_user)
):
    try:
        # Get the existing review first
        existing_review = service.get_review(review_id)
        
        # Check if current user owns this review
        if existing_review["profile_id"] != current_user["user_id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this review"
            )
        
        payload = jsonable_encoder(review, exclude_none=True)
        updated = service.update_review(review_id, payload)
        return Review.model_validate(updated)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(
    review_id: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        # Get the existing review first
        existing_review = service.get_review(review_id)
        
        # Check if current user owns this review
        if existing_review["profile_id"] != current_user["user_id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this review"
            )
        
        service.delete_review(review_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))