from supabase_client import supabase

class EventRepository:
    def get_all(self):
        return supabase.table("events").select("*").execute().data

    def get_by_id(self, event_id: str):
        res = supabase.table("events").select("*").eq("id", event_id).single().execute()
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
