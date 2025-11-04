from supabase_client import supabase

class ClubRepository:
    def get_all(self):
        return supabase.table("clubs").select("*").execute().data

    def get_by_id(self, club_id: str):
        res = supabase.table("clubs").select("*").eq("id", club_id).single().execute()
        return res.data

    def create(self, club_data: dict):
        res = supabase.table("clubs").insert(club_data).execute()
        return res.data[0]

    def update(self, club_id: str, club_data: dict):
        res = supabase.table("clubs").update(club_data).eq("id", club_id).execute()
        return res.data[0] if res.data else None

    def delete(self, club_id: str):
        res = supabase.table("clubs").delete().eq("id", club_id).execute()
        return res.data
