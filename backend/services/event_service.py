from fastapi import HTTPException
from repositories.event_repository import EventRepository
from datetime import date, datetime, time, timezone
from typing import List, Dict, Optional
import calendar
from itertools import groupby
from entities.event import Event


class EventService:
    def __init__(self, repo: EventRepository = None):
        self.repo = repo or EventRepository()

    def get_all_events(
        self,
        search: Optional[str] = None,
        club_ids: Optional[List[str]] = None,  # <-- CHANGED
    ) -> List[dict]:

        return self.repo.get_all(
            search=search,
            club_ids=club_ids,   # <-- CHANGED
            limit=1000,
            offset=0,
        )

    def get_event(self, event_id: str):
        event = self.repo.get_by_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    
    def get_monthly_calendar(self, year: int, month_index: int) -> List[List[Event]]:
        """
        Returns a 2d array of events. The outer array represents all events in a month,
        and each inner array represents each day. Each day is a list of Event objects.
        [ [Events for Day X], [Events for Day Y] ]
        """
        py_month = month_index + 1  # Convert 0 indexed to 1 indexed

        # Getting precise start and end timestamps
        _, num_days = calendar.monthrange(year, py_month)
        start_dt = datetime(year, py_month, 1, 0, 0, 0, tzinfo=timezone.utc)
        end_dt = datetime.combine(
            date(year, py_month, num_days), 
            time.max  # Ensure we catch events late on the final day of the month
        ).replace(tzinfo=timezone.utc)

        # Convert to ISO format strings for Supabase
        start_str = start_dt.isoformat()
        end_str = end_dt.isoformat()
        
        raw_events = self.repo.get_by_date_range(start_str, end_str)
        events_list = [Event(**item) for item in raw_events]

        # Grouping by the DATE part of start_at, ignoring the time.
        key_func = lambda x: x.start_at.date()
        
        events_list.sort(key=key_func)
        
        grouped_output = []
        
        for event_date, group in groupby(events_list, key=key_func):
            day_events = list(group)
            grouped_output.append(day_events)
            
        return grouped_output

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
