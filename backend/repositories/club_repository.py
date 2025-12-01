from supabase_client import supabase
from typing import List, Optional

class ClubRepository:
    def get_all(
        self,
        search: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> List[dict]:
        query = supabase.table("clubs").select("*")

        if search:
            pattern = f"%{search}%"
            # name OR description OR name matches 
            query = query.or_(
                f"name.ilike.{pattern},about.ilike.{pattern}"
            )

        # Supabase range is inclusive: start, end
        query = query.range(offset, offset + limit - 1)
        res = query.execute()
        return res.data


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
