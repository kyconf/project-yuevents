from typing import Optional, Dict, Any, List
from time import sleep
from supabase_client import supabase

class UserRepository:
    def get_all(self):
        return supabase.table("profiles").select("*").execute().data

    def get_by_id(self, user_id: str):
        res = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        return res.data
    
    def get_by_email(self, user_email: str):
        res = supabase.table("profiles").select("*").eq("email", user_email).single().execute()
        return res.data

    # NEW: simple create() that extracts email/password and forwards the rest
    def create(self, user_data: dict):
        email = user_data["email"]
        password = user_data["password"]
        # everything else is considered profile fields
        profile_fields = {k: v for k, v in user_data.items() if k not in ("email", "password")}
        return self.create_auth_and_profile(email, password, profile_fields)

    # NEW: direct profile insert (use only if auth.users row already exists)
    def create_profile(self, profile_data: dict):
        res = supabase.table("profiles").insert(profile_data).execute()
        return res.data[0]  # keep your simple style

    def create_auth_and_profile(self, email: str, password: str, profile_fields: Optional[Dict[str, Any]] = None):
        profile_fields = profile_fields or {}
        metadata = {}
        if "full_name" in profile_fields:
            metadata["full_name"] = profile_fields["full_name"]
        if "avatar_url" in profile_fields:
            metadata["avatar_url"] = profile_fields["avatar_url"]

        # Create auth user (pass metadata so trigger can use it)
        payload = {"email": email, "password": password}
        if metadata:
            payload["options"] = {"data": metadata}

        # ✅ Correct way to call supabase.auth.sign_up
        result = supabase.auth.sign_up(payload)

        # The result has `.user` and `.session`
        user = result.user
        if not user:
            raise RuntimeError("User creation failed — no user returned from Supabase")

        user_id = user.id

        # Wait briefly for Supabase trigger to insert into 'profiles'
        for _ in range(10):
            prof = self.get_by_id(user_id)
            if prof:
                break
            sleep(0.2)

        # Update extra fields if any
        if profile_fields:
            supabase.table("profiles").update(profile_fields).eq("id", user_id).execute()

        # Return the final profile row
        return self.get_by_id(user_id)


    def update(self, user_id: str, user_data: dict):
        res = supabase.table("profiles").update(user_data).eq("id", user_id).execute()
        return res.data[0] if res.data else None

    def delete(self, user_id: str):
        res = supabase.table("profiles").delete().eq("id", user_id).execute()
        return res.data

    def login(self, email: str, password: str):
        """Authenticate user using Supabase Auth."""
        result = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if not result or not result.user:
            raise RuntimeError("Invalid credentials")

        # Return both auth and profile info
        user_id = result.user.id
        profile = self.get_by_id(user_id)
        return {
            "session": result.session,  # contains access_token, refresh_token, etc.
            "user": profile
        }
