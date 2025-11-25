from fastapi import APIRouter, HTTPException, status
from typing import List
from entities.club import Club, ClubCreate, ClubUpdate
from services.club_service import ClubService
from fastapi.encoders import jsonable_encoder
router = APIRouter(prefix="/clubs", tags=["Clubs"])
service = ClubService()


@router.get("/", response_model=List[Club])
def get_clubs():
    try:
        return service.get_all_clubs()
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
