from supabase_client import supabase

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
                .select("id,title,starts_at,location,description,club:clubs(id,name,slug)")
                .order("starts_at", desc=not asc)
                .range(offset, offset + limit - 1)
            )

            return res.execute().data

    def get_by_id(self, event_id: str):
        res = (
            supabase
            .table("events")
            .select("id,title,starts_at,location,description,club:clubs(id,name,slug)")
            .eq("id", event_id)
            .single()
            .execute()
        )
        return res.data

    def create(self, event_data: dict):
        res = supabase.table("events").insert(event_data).execute()
        return res.data[0]

    def update(self, event_id: str, event_data: dict):
        res = supabase.table("events").update(event_data).eq("id", event_id).execute()
        return res.data[0] if res.data else None

    def delete(self, event_id: str):
        res = supabase.table("events").delete().eq("id", event_id).execute()
        return res.data
