from fastapi import HTTPException
from repositories.review_repository import ReviewRepository
from entities.review import Review
from typing import List, Dict

class ReviewService:
    def __init__(self, repo: ReviewRepository = None):
        self.repo = repo or ReviewRepository()

    def get_review(self, review_id: str):
        review = self.repo.get_by_id(review_id)
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")
        return review

    def get_reviews_by_event(self, events_id: str) -> List[dict]:
        return self.repo.get_by_event_id(events_id)

    def get_average_rating(self, events_id: str) -> Dict:
        """
        Fetches reviews and calculates the mathematical average.
        """
        reviews = self.repo.get_by_event_id(events_id)
        
        if not reviews:
            return {
                "events_id": events_id,
                "average_rating": 0.0,
                "review_count": 0
            }

        total_score = sum(r['rating'] for r in reviews if r.get('rating') is not None)
        count = len(reviews)
        average = total_score / count if count > 0 else 0.0

        return {
            "events_id": events_id,
            "average_rating": round(average, 2),
            "review_count": count
        }

    def create_review(self, review_data: dict):
        # TODO: Add logic here to check if user already reviewed this event
        # to prevent duplicates
        return self.repo.create(review_data)

    def update_review(self, review_id: str, review_data: dict):
        # TODO: manually update 'update_at' or let Supabase handle it via trigger
        # For now, we just pass the data.
        updated_review = self.repo.update(review_id, review_data)
        if not updated_review:
            raise HTTPException(status_code=404, detail="Review not found")
        return updated_review

    def delete_review(self, review_id: str):
        deleted = self.repo.delete(review_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Review not found")
        return {"message": "Review deleted"}