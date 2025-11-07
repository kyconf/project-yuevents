from fastapi import HTTPException
from repositories.user_repository import UserRepository

class UserService:
    def __init__(self, repo: UserRepository = None):
        self.repo = repo or UserRepository()

    def get_all_users(self):
        return self.repo.get_all()

    def get_user(self, user_id: str):
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    
    def get_user_by_email(self, user_em: str):
        user = self.repo.get_by_(user_em)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def create_user(self, user_data: dict):
        return self.repo.create(user_data)

    def update_user(self, user_id: str, user_data: dict):
        updated_user = self.repo.update(user_id, user_data)
        if not updated_user:
            raise HTTPException(status_code=404, detail="User not found")
        return updated_user

    def delete_user(self, user_id: str):
        deleted = self.repo.delete(user_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "User deleted"}

    def login_user(self, email: str, password: str):
        return self.repo.login(email, password)
