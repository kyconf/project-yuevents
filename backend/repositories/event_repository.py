from supabase_client import supabase
from supabase import create_client, Client
from typing import Optional, List


class EventRepository:

    # This should return range(0,9) -- joined / queried together with clubs
    def get_all(
        self,
        search: Optional[str] = None,
        club_ids: Optional[List[str]] = None,  # <-- CHANGED
        limit: int = 1000,   # row-level limit, NOT group-level
        offset: int = 0,
        asc: bool = True,
    ) -> List[dict]:
        query = (
            supabase
            .table("events")
            .select(
                "id,title,description,location,start_at,end_at,is_public,slug,club_id,banner,"
                "club:clubs(id,name,slug)"
            )
            .order("start_at", desc=not asc)
        )

        # Filter by one or more club_ids if provided
        if club_ids:
            # Supabase: WHERE club_id IN (...)
            query = query.in_("club_id", club_ids)

        # Apply search if provided (title/description, case-insensitive)
        if search:
            pattern = f"%{search}%"
            query = query.or_(f"title.ilike.{pattern},description.ilike.{pattern}")

        # This is a *row* range, just to avoid pulling infinite data
        query = query.range(offset, offset + limit - 1)
        res = query.execute()
        return res.data

    def get_by_id(self, event_id: str):
        res = (
            supabase
            .table("events")
            .select(
                "id,title,description,location,start_at,end_at,is_public,slug,club_id,banner,"
                "club:clubs(id,name,slug)"
            )
            .eq("id", event_id)
            .single()
            .execute()
        )
        return res.data


    def get_by_date_range(self, start_iso: str, end_iso: str):
        """ 
        Fetches from start date to end date inclusive
        """
        response = supabase.table("events")\
        .select("*")\
        .gte("start_at", start_iso)\
        .lte("start_at", end_iso)\
        .execute()

        return response.data

    def create(self, payload: dict) -> dict:
        res = supabase.table("events").insert(payload).execute()
        return res.data[0]  # inserted row as a dict      

    def update(self, event_id: str, event_data: dict):
        res = supabase.table("events").update(event_data).eq("id", event_id).execute()
        return res.data[0] if res.data else None

    def delete(self, event_id: str):
        res = supabase.table("events").delete().eq("id", event_id).execute()
        return res.data
