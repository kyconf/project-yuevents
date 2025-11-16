from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Any
from entities.event import Event, EventCreate, EventUpdate, EventWithClub
from services.event_service import EventService
from fastapi.encoders import jsonable_encoder
from collections import defaultdict
from datetime import datetime

router = APIRouter(prefix="/events", tags=["Events"])
service = EventService()


@router.get("/", response_model=List[List[dict]])  #  innermost layer is json
def get_events(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    columns: List[str] = Query(["id", "title", "start_at", "end_at", "location", "is_public", "slug", "banner", "club"], alias="columns"),
):
    try:
  
        items = service.get_all_events(limit=limit, offset=offset)
        rows = jsonable_encoder(items, exclude_none=False)  

        grouped_events = defaultdict(list)
        for ev in rows:
          
            start_date = str(ev.get("start_at")).split("T")[0]  
            grouped_events[start_date].append(ev)

        matrix = []

        for date, events in grouped_events.items():
            event_group = []
            for ev in events:
                
                #append to dictionaries as json
                event_group.append({col: ev.get(col) for col in columns})
            matrix.append(event_group)

        return matrix  
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"/events failed: {e}")


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
        payload = jsonable_encoder(event, exclude_none=True)
    
        row = service.create_event(payload)
        return Event.model_validate(row)                 # Pydantic → ISO strings   

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

