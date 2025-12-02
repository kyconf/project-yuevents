from supabase_client import supabase

class ReviewRepository:
    
    def get_by_id(self, review_id: str):
        res = (
            supabase
            .table("event_reviews")
            .select("*")
            .eq("id", review_id)
            .single()
            .execute()
        )
        return res.data

    def get_by_event_id(self, events_id: str):
        """
        Fetches all reviews associated with a specific event
        """
        res = (
            supabase
            .table("event_reviews")
            .select("*")
            .eq("events_id", events_id)
            .order("create_at", desc=True)
            .execute()
        )
        return res.data

    def create(self, payload: dict) -> dict:
        res = supabase.table("event_reviews").insert(payload).execute()
        return res.data[0] 

    def update(self, review_id: str, review_data: dict):
        res = (
            supabase
            .table("event_reviews")
            .update(review_data)
            .eq("id", review_id)
            .execute()
        )
        return res.data[0] if res.data else None

    def delete(self, review_id: str):
        res = supabase.table("event_reviews").delete().eq("id", review_id).execute()
        return res.data