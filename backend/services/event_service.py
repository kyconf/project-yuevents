from fastapi import HTTPException
from repositories.event_repository import EventRepository

class EventService:
    def __init__(self, repo: EventRepository = None):
        self.repo = repo or EventRepository()

    def get_all_events(self):
        return self.repo.get_all()

    def get_event(self, event_id: str):
        event = self.repo.get_by_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return event

    def create_event(self, event_data: dict):
        return self.repo.create(event_data)

    def update_event(self, event_id: str, event_data: dict):
        updated_event = self.repo.update(event_id, event_data)
        if not updated_event:
            raise HTTPException(status_code=404, detail="Event not found")
        return updated_event

    def delete_event(self, event_id: str):
        deleted = self.repo.delete(event_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Event not found")
        return {"message": "Event deleted"}
