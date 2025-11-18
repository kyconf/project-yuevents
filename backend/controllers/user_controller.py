from fastapi import APIRouter, HTTPException, status
from typing import List
from entities.user import User, UserCreate, UserUpdate, UserLogin
from services.user_service import UserService
from services.jwt_service import JwtService

router = APIRouter(prefix="/users", tags=["Users"])
service = UserService()
jwtService = JwtService("secret")

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def sign_up(user: UserCreate):
    try:
        # Create user in DB (returns dict from Supabase)
        new_user = service.create_user(user.model_dump())

        # Generate token using ID and username (dictionary keys)
        token = jwtService.create_token(
            user_id=new_user["id"],           # not .id
            username=new_user["username"]     # must exist in your profiles table
        )

        # Return both
        return {
            "user": new_user,
            "token": token
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(user: UserLogin):
    try:
        result = service.login_user(user.email, user.password)

        # Generate JWT for session (if you want to issue your own)
        token = jwtService.create_token(
            user_id=result["user"]["id"],
            username=result["user"].get("username", "")
        )

        return {
            "user": result["user"],
            "token": token,
            "supabase_session": result["session"]
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

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
