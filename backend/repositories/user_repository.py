from database.supabase_client import supabase

class UserRepository:
    def get_all(self):
        return supabase.table("profiles").select("*").execute().data

    def get_by_id(self, user_id: str):
        res = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
        return res.data

    def create(self, user_data: dict):
        res = supabase.table("profiles").insert(user_data).execute()
        return res.data[0]

    def update(self, user_id: str, user_data: dict):
        res = supabase.table("profiles").update(user_data).eq("id", user_id).execute()
        return res.data[0] if res.data else None

    def delete(self, user_id: str):
        res = supabase.table("profiles").delete().eq("id", user_id).execute()
        return res.data
