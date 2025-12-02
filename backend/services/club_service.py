from fastapi import HTTPException
from repositories.club_repository import ClubRepository
from typing import List, Optional
class ClubService:
    def __init__(self, repo: ClubRepository = None):
        self.repo = repo or ClubRepository()

    def get_all_clubs(
        self,
        search: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[dict]:
        return self.repo.get_all(search=search, limit=limit, offset=offset)


    def get_club(self, club_id: str):
        club = self.repo.get_by_id(club_id)
        if not club:
            raise HTTPException(status_code=404, detail="Club not found")
        return club

    def create_club(self, club_data: dict):
        return self.repo.create(club_data)

    def update_club(self, club_id: str, club_data: dict):
        updated_club = self.repo.update(club_id, club_data)
        if not updated_club:
            raise HTTPException(status_code=404, detail="Club not found")
        return updated_club

    def delete_club(self, club_id: str):
        deleted = self.repo.delete(club_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Club not found")
        return {"message": "Club deleted"}