# parsers/repair.py
from datetime import datetime, timedelta, timezone
import re
from typing import Dict, Any, List
import dateparser

def repair_event_data(event: Dict[str, Any], repairable_fields: List[str]) -> Dict[str, Any]:
    """
    Attempt to fix common minor issues in parsed event data.
    Returns a repaired event dict.
    """
    repaired = event.copy()

    def parse_dt(value):
        if isinstance(value, datetime):
            return value
        if not isinstance(value, str):
            return None

        s = value.strip()

        # 1) Fast try: direct fromisoformat (works for many ISO strings with tz offsets)
        try:
            return datetime.fromisoformat(s)
        except Exception:
            pass

        # 2) Normalize trailing 'Z' (Zulu / UTC) -> '+00:00'
        if s.endswith("Z"):
            s2 = s[:-1] + "+00:00"
            try:
                return datetime.fromisoformat(s2)
            except Exception:
                pass

        # 3) If there's no explicit timezone offset, append +00:00
        if not re.search(r"[+-]\d{2}:\d{2}$", s):
            s2 = s + "+00:00"
            try:
                return datetime.fromisoformat(s2)
            except Exception:
                pass

        # 4) Final fallback: use dateparser (very permissive)
        try:
            dt = dateparser.parse(value, settings={"RETURN_AS_TIMEZONE_AWARE": True})
            if dt:
                # ensure timezone-aware UTC if no tzinfo
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                return dt
        except Exception:
            pass

        return None

    # --- 1. Fix literal "none"/"null"/"n/a" strings ---
    for field in repairable_fields:
        val = repaired.get(field)
        if isinstance(val, str) and val.strip().lower() in {"none", "null", "n/a", "unknown"}:
            repaired[field] = None

    # --- 2. Ensure ISO 8601 timezone-aware datetimes ---
    for field in ["start_at", "end_at", "rsvp_deadline"]:
        if field in repairable_fields or isinstance(repaired.get(field), str):
            dt = parse_dt(repaired.get(field))
            if dt:
                repaired[field] = dt.astimezone(timezone.utc).isoformat()

    # --- 3. Fix reversed or missing end times ---
    start_at = parse_dt(repaired.get("start_at"))
    end_at = parse_dt(repaired.get("end_at"))

    if start_at:
        if not end_at or end_at < start_at:
            repaired["end_at"] = start_at + timedelta(hours=2)


    # --- 4. Strengthen title if too short ---
    title = repaired.get("title", "")
    if len(title) < 5 and repaired.get("description"):
        desc_words = repaired["description"].split()
        repaired["title"] = " ".join(desc_words[:8]).strip(".,!?")

    # --- 5. Auto-regenerate slug if needed ---
    slug = repaired.get("slug")
    if not slug or len(slug) < 3:
        cleaned_title = re.sub(r"[^a-zA-Z0-9]+", "-", repaired.get("title", "").lower()).strip("-")
        repaired["slug"] = f"{cleaned_title}-{datetime.now(timezone.utc).strftime('%Y-%m-%d')}"

    # --- 6. Ensure timezone awareness everywhere ---
    for field in ["start_at", "end_at", "rsvp_deadline"]:
        val = repaired.get(field)
        if isinstance(val, datetime):
            repaired[field] = val.astimezone(timezone.utc).isoformat()

    # --- 7. Final sanity: ensure is_public is bool ---
    repaired["is_public"] = bool(repaired.get("is_public", True))

    return repaired

