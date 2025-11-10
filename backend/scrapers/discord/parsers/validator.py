# parsers/validator.py
from datetime import datetime
from typing import Tuple, List, Dict, Any
from pydantic import ValidationError
import sys
import os

# All this to import Event from backend/entities/event.py
current_file_dir = os.path.dirname(os.path.abspath(__file__))
entities_dir = os.path.normpath(os.path.join(current_file_dir, '..', '..', '..', 'entities'))
if entities_dir not in sys.path:
    sys.path.append(entities_dir)
from event import EventBase

REQUIRED_FIELDS = [
    "title",
    "description",
    "location",
    "start_at",
    "end_at",
    "rsvp_deadline",
    "capacity",
    "is_public",
    "slug",
]

# Fields that can be None
NULLABLE_FIELDS = {"description", "location", "rsvp_deadline", "capacity", "slug"}

def validate_event_data(event: Dict[str, Any]) -> Tuple[bool, str, List[str]]:
    """
    Validate a parsed event dict. Returns (is_valid, reason, repairable_fields).
    """
    repairable = []

    # --- 1. Structural validation ---
    for field in REQUIRED_FIELDS:
        if field not in event:
            # Missing field is repairable if we have a default/fallback strategy
            repairable.append(field)
            continue
        if event[field] is None and field not in NULLABLE_FIELDS:
            # Mark non-nullable None fields as repairable
            repairable.append(field)

    # --- 2. Datetime validation ---
    def parse_dt(value, field):
        if isinstance(value, datetime):
            return value
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value.replace("Z", "+00:00"))
            except ValueError:
                repairable.append(field)
                return None
        if value is None and field in ["start_at", "end_at", "rsvp_deadline"]:
            # Treat missing datetime as repairable
            repairable.append(field)
            return None
        return None

    start_at = parse_dt(event.get("start_at"), "start_at")
    end_at = parse_dt(event.get("end_at"), "end_at")

    # --- 3. Temporal logic ---
    if start_at and end_at and end_at < start_at:
        repairable.append("end_at")

    # --- 4. Sanity checks ---
    title = event.get("title", "")
    if not title or len(title) < 5:
        repairable.append("title")

    # --- 5. Check for literal strings like "none" or "null" ---
    for key, value in event.items():
        if isinstance(value, str) and value.strip().lower() in {"none", "null", "n/a"}:
            repairable.append(key)

    # --- 6. Final decision ---
    if repairable:
        return False, "Minor fixable issues", list(set(repairable))

    return True, "Valid event data", []

def validate_event_post_repair(event_dict: dict) -> Tuple[bool, str]:
    """
    Strict post-repair validator using Pydantic Event model.
    Returns (is_valid, reason). No repairable fields.
    """
    try:
        EventBase(**event_dict)  # Will raise ValidationError if invalid
        return True, "Event is fully valid"
    except ValidationError as e:
        return False, f"Fatal validation error: {e}"
    
# TODO: Fix it so it works with the events schema from pydantic