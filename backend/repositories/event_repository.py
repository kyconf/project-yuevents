from supabase_client import supabase
from supabase import create_client, Client



class EventRepository:

    # This should return range(0,9) -- joined / queried together with clubs
    def get_all(
            self,
            *,
            limit: int = 10,
            offset: int = 0,
            club_slug: str | None = None,
            from_dt: str | None = None,  
            to_dt: str | None = None,
            asc: bool = True,
        ):
            res = (
                supabase
                .table("events")
                .select("id,title,description,location,start_at,end_at,is_public,slug,club_id,banner,"
            "club:clubs(id,name,slug)"  )
                .order("start_at", desc=not asc)
                .range(offset, offset + limit - 1)
            )

            return res.execute().data

    def get_by_id(self, event_id: str):
        res = (
            supabase
            .table("events")
            .select("id,title,description,location,start_at,end_at,is_public,slug,club_id,banner,"
            "club:clubs(id,name,slug)")
            .eq("id", event_id)
            .single()
            .execute()
        )
        return res.data

    def create(self, payload: dict) -> dict:
        res = supabase.table("events").insert(payload).execute()
        return res.data[0]  # inserted row as a dict      

    def update(self, event_id: str, event_data: dict):
        res = supabase.table("events").update(event_data).eq("id", event_id).execute()
        return res.data[0] if res.data else None

    def delete(self, event_id: str):
        res = supabase.table("events").delete().eq("id", event_id).execute()
        return res.data