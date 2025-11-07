from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from entities.event import Event, EventCreate, EventUpdate, EventWithClub
from services.event_service import EventService



router = APIRouter(prefix="/events", tags=["Events"])
service = EventService()


# Retrieves list of events queried
@router.get("/", response_model=List[EventWithClub])
def get_events(limit: Optional[int] = None):
    try:
        events = service.get_all_events()
        return events[:limit] if limit else events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Only a specific event id queried
@router.get("/{event_id}", response_model=EventWithClub)
def get_event(event_id: str):
    try:
        return service.get_event(event_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Event, status_code=status.HTTP_201_CREATED)
def create_event(event: EventCreate):
    try:
        return service.create_event(event.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{event_id}", response_model=Event)
def update_event(event_id: str, event: EventUpdate):
    try:
        return service.update_event(event_id, event.model_dump(exclude_unset=True))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: str):
    try:
        service.delete_event(event_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
