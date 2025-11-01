from fastapi import APIRouter, HTTPException, status
from typing import List
from entities.user import User, UserCreate, UserUpdate
from services.user_service import UserService





router = APIRouter(prefix="/users", tags=["Users"])
service = UserService()

@router.get("/", response_model=List[User])
def get_users():
    try:
        return service.get_all_users()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}", response_model=User)
def get_user(user_id: str):
    try:
        return service.get_user(user_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate):
    try:
        return service.create_user(user.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{user_id}", response_model=User)
def update_user(user_id: str, user: UserUpdate):
    try:
        return service.update_user(user_id, user.model_dump(exclude_unset=True))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: str):
    try:
        service.delete_user(user_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
