from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from entities.club import Club, ClubCreate, ClubUpdate
from services.club_service import ClubService
from fastapi.encoders import jsonable_encoder
router = APIRouter(prefix="/clubs", tags=["Clubs"])
service = ClubService()

# Not a fuzzy search, checks for keyword in description and name
@router.get("/", response_model=List[Club])
def get_clubs(
    search: Optional[str] = Query(
        None,
        description="Search term to filter clubs by name/description/",
    ),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    try:
        return service.get_all_clubs(search=search, limit=limit, offset=offset)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{club_id}", response_model=Club)
def get_club(club_id: str):
    try:
        return service.get_club(club_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Club, status_code=status.HTTP_201_CREATED)
def create_club(club: ClubCreate):
    try:
        payload = jsonable_encoder(club, exclude_none=True)
    

        row = service.create_club(payload)
        return Club.model_validate(row)  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{club_id}", response_model=Club)
def update_club(club_id: str, club: ClubUpdate):
    try:
        return service.update_club(club_id, club.model_dump(exclude_unset=True))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{club_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_club(club_id: str):
    try:
        service.delete_club(club_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
