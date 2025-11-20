# parsers/heuristic_parser.py
"""
Robust heuristic parser that takes message_content:str and returns a dict
compatible with EventCreate (no creator_id). All datetimes are ISO 8601
timezone-aware (UTC).
"""

import re
from datetime import datetime, timedelta, timezone
from dateparser.search import search_dates
import dateparser
from slugify import slugify

# Regex helpers
TIME_RE = re.compile(r'\b\d{1,2}(:\d{2})?\s*(?:AM|PM|am|pm)\b')
CAPACITY_RE = re.compile(r'\b(?:capacity|limit|spots|seats|max(?:imum)?|places)\b[:\s]*([0-9]{1,4})\b', re.I)
RSVP_RE = re.compile(r'\bRSVP\b[:\s]*(?:by|before)?\s*([^\n.,;!]+)', re.I)
WEEKDAY_RE = re.compile(r'\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b', re.I)

def _now_utc():
    return datetime.now(timezone.utc)

def _search_dates(text, base=None):
    """Wrapper for dateparser.search.search_dates with sane settings."""
    if base is None:
        base = _now_utc()
    try:
        results = search_dates(
            text,
            settings={
                "PREFER_DATES_FROM": "future",
                "RELATIVE_BASE": base,
                "RETURN_AS_TIMEZONE_AWARE": False,
            },
        )
    except Exception:
        results = None
    return results or []  # list of (matched_text, dt)


def _select_location(text: str):
    """
    Smarter location selector.
    - Collects candidates from:
        * explicit cues (location:, venue:, place:, where:)
        * lazy 'at/in/inside' matches (non-greedy, stop at punctuation or known stopwords)
        * parentheses
        * trailing clause after a dash or newline
    - Cleans candidates, filters obvious junk (times, dates, pure digits), and scores them.
    - Scoring boosts candidates containing venue keywords (Room, Hall, Centre, Building, Theatre, Studio, Cinema, Park, Lounge, Cafe, Lab, Auditorium),
      titlecase sequences, or 'Room #' patterns.
    - Penalizes if candidate contains time-like tokens, weekday/month words, or looks numeric.
    - Returns the best candidate or None.
    """
    # helper regexes (reuse TIME_RE from module scope)
    STOP_AFTER = r'(?:[.,;!?]|\b(?:starting|from|on|at|for|join|rsvp|capacity|register)\b)'
    candidates = []

    # 1) explicit cues
    for m in re.finditer(r'\b(?:location|venue|place|where|room|hall|building)[:\s\-]*([^\n,!.]{2,140})', text, re.I):
        candidates.append(m.group(1).strip())

    # 2) 'at/in/inside' lazy, stop at punctuation or common stopwords
    for m in re.finditer(r'\b(?:at|in|inside)\s+(.{2,140}?)' + STOP_AFTER, text, re.I):
        cand = (m.group(1) or "").strip()
        if cand:
            candidates.append(cand)

    # 3) parentheses
    for m in re.finditer(r'\(([^)]+)\)', text):
        candidates.append(m.group(1).strip())

    # 4) trailing after dash or newline (short clauses)
    for m in re.finditer(r'[-–—]\s*([A-Z][^.\n]{2,120})', text):
        candidates.append(m.group(1).strip())

    # cleanup and scoring
    venue_keywords = {
        "room","hall","centre","center","building","theatre","theater","studio","cinema",
        "park","lounge","cafe","lab","auditorium","tower","plaza","garden","gym","hallway",
        "commons","student centre","student center","ballroom","classroom","library"
    }
    month_week_tokens = re.compile(r'\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b', re.I)

    scored = []
    for raw in candidates:
        c = re.sub(r'^[\s\-\:\–\—\(\[]+|[\s\-\:\)\]\.\,;!]+$', '', raw)  # trim edges
        c = re.sub(r'\s{2,}', ' ', c).strip()
        if not c:
            continue

        # filter obvious junk
        if TIME_RE.search(c):            # contains a time e.g. "7 PM"
            continue
        if re.search(r'\b\d{4}\b', c):   # a year 2025 inside -> probably not a venue
            # allow 'Room 203' though
            if not re.search(r'\broom\s*\d{1,4}\b', c, re.I):
                continue
        if re.fullmatch(r'[\d\W]+', c):  # only digits/punct
            continue
        if len(c) < 2:
            continue

        score = 0
        lc = c.lower()

        # +2 if contains explicit venue keywords
        for kw in venue_keywords:
            if kw in lc:
                score += 2

        # +2 if contains "Room 123" pattern
        if re.search(r'\broom\s*\d{1,4}\b', c, re.I):
            score += 2

        # +1 if any TitleCase word appears (likely proper noun)
        if re.search(r'\b[A-Z][a-z]{2,}\b', c):
            score += 1

        # +1 if has comma-separated structure (e.g., "Student Centre, Room 203")
        if ',' in c:
            score += 1

        # -2 if contains weekday or month token (likely a date fragment)
        if month_week_tokens.search(c):
            score -= 2

        # -1 if contains words that suggest it's not a place (e.g., "join us", "starting")
        if re.search(r'\b(join|starting|watch|movie|watching|register|rsvp|capacity|people|attendees|prizes)\b', lc):
            score -= 1

        # length-based nudges: prefer medium length (5-80 chars)
        if 5 <= len(c) <= 80:
            score += 1
        elif len(c) > 120:
            score -= 1

        scored.append((score, c))

    if not scored:
        return None

    # choose the highest score; tie-breaker: last occurrence in original candidates
    scored.sort(key=lambda x: (x[0], candidates[::-1].index(x[1])), reverse=True)
    best = scored[0][1]

    # final cleanup: remove leading filler words and stray punctuation
    best = re.sub(r'^(the|at|in)\s+', '', best, flags=re.I).strip()
    best = re.sub(r'[\.\,\;\:]+$', '', best).strip()
    if len(best) > 140:
        best = best[:140].rsplit(' ', 1)[0]

    return best

def _extract_duration_hours(text, base=None):
    """
    Try to extract an explicit duration in hours (e.g., "12 hours", "for 2 hours").
    If there's a 'from X to Y' or 'X - Y' range with times/dates, compute hours.
    Returns integer hours or None.
    """
    if base is None:
        base = _now_utc()
    # explicit 'N hours' patterns
    m = re.search(r'(\d{1,2})\s*(?:hours|hrs|hour|hr)\b', text, re.I)
    if m:
        try:
            h = int(m.group(1))
            if 0 < h <= 72:
                return h
        except Exception:
            pass
    # from X to Y
    m2 = re.search(r'from\s+(.{1,80}?)\s+(?:to|-)\s+(.{1,80}?)(?:[.,\n]|$)', text, re.I)
    if m2:
        left, right = m2.group(1).strip(), m2.group(2).strip()
        ldt = dateparser.parse(left, settings={'PREFER_DATES_FROM':'future','RELATIVE_BASE':base})
        rdt = dateparser.parse(right, settings={'PREFER_DATES_FROM':'future','RELATIVE_BASE':base})
        if ldt and rdt:
            delta = rdt - ldt
            hours = int(delta.total_seconds() // 3600)
            if 0 < hours <= 168:
                return hours
    return None

def _extract_title(text):
    """
    Try title extraction using:
      - bold/header style (first line before dash/colon)
      - phrases like 'presents', 'is hosting', 'join us for', 'come to'
      - fallback: first line truncated to ~12 words
    """
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    first_line = lines[0] if lines else text
    # header with punctuation
    m = re.search(r'^(?:\*\*|__)?(?P<head>.+?)(?:\*\*|__)?\s*[-–—:]\s', first_line)
    if m:
        t = m.group('head').strip()
    else:
        # phrase-based capture
        m2 = re.search(r'\b(?:presents|presents:|is hosting|is hosting a|hosting|hosting a|join us for|come to|come join us for|announces)\b\s+(?P<event>[^.\n,!]{2,80})', text, re.I)
        if m2:
            t = m2.group('event').strip()
        else:
            # fallback first line truncated
            words = first_line.split()
            if len(words) <= 12:
                t = first_line
            else:
                t = ' '.join(words[:12]) + '...'
    # clean trailing 'at <time>' etc
    t = re.sub(r'\s+at\s+\d{1,2}(:\d{2})?\s*(?:am|pm)?$', '', t, flags=re.I)
    t = re.sub(r'\s+starting\s+at.*$', '', t, flags=re.I)
    return t.strip() or "Untitled Event"

def parse_message_heuristic(message_content: str) -> dict:
    """
    Main entrypoint. Input: message_content (str).
    Output: dict compatible with EventCreate (no creator_id).
    Date/time strings are ISO 8601 (UTC).
    """
    text = (message_content or "").strip()
    base = _now_utc()
    description = text if len(text) <= 2000 else text[:2000]

    # Title
    title = _extract_title(text)

    # RSVP: parse separately (so RSVP doesn't become end_at)
    rsvp_iso = None
    rsvp_m = RSVP_RE.search(text)
    if rsvp_m:
        candidate = rsvp_m.group(1).strip()
        # try search_dates or parse
        rd = _search_dates(candidate, base=base)
        if rd:
            rsvp_iso = rd[0][1].replace(tzinfo=timezone.utc).isoformat()
        else:
            d = dateparser.parse(candidate, settings={'PREFER_DATES_FROM':'future','RELATIVE_BASE':base})
            if d:
                rsvp_iso = d.replace(tzinfo=timezone.utc).isoformat()

    # Full parsed dates (but exclude RSVP substrings from consideration)
    parsed = _search_dates(text, base=base)  # list of (matched_text, dt)
    filtered = []
    for match, dt in parsed:
        if rsvp_m and match in rsvp_m.group(0):
            continue
        filtered.append((match, dt))

    # Start / end determination
    start_dt = None
    end_dt = None
    if filtered:
        # use first parsed date for start; second (if present and not RSVP) for end
        start_dt = filtered[0][1].replace(tzinfo=timezone.utc)
        if len(filtered) >= 2:
            end_dt = filtered[1][1].replace(tzinfo=timezone.utc)

    # explicit 'from X to Y' range (prefer this if present)
    m_range = re.search(r'from\s+(.{1,80}?)\s+(?:to|-)\s+(.{1,80}?)(?:[.,\n]|$)', text, re.I)
    if m_range:
        left, right = m_range.group(1).strip(), m_range.group(2).strip()
        ldt = dateparser.parse(left, settings={'PREFER_DATES_FROM':'future','RELATIVE_BASE':base})
        rdt = dateparser.parse(right, settings={'PREFER_DATES_FROM':'future','RELATIVE_BASE':base})
        if ldt:
            start_dt = ldt.replace(tzinfo=timezone.utc)
        if rdt:
            end_dt = rdt.replace(tzinfo=timezone.utc)

    # weekday names if no explicit date found
    if not start_dt:
        wd = WEEKDAY_RE.search(text)
        if wd:
            weekday = wd.group(1).lower()
            idx = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].index(weekday)
            today_idx = base.weekday()
            days_ahead = (idx - today_idx) % 7
            if days_ahead == 0:
                days_ahead = 7
            start_dt = (base + timedelta(days=days_ahead)).replace(hour=0, minute=0, second=0, microsecond=0)
    # apply time if present (to start_dt or create start_dt)
    time_m = TIME_RE.search(text)
    if time_m:
        tstr = time_m.group(0)
        tparsed = dateparser.parse(tstr, settings={'RELATIVE_BASE':base})
        if tparsed:
            if start_dt:
                # keep date, apply hour/min
                start_dt = start_dt.replace(hour=tparsed.hour, minute=tparsed.minute, second=0, microsecond=0)
            else:
                start_dt = tparsed.replace(tzinfo=timezone.utc)
    # durations
    duration_hours = _extract_duration_hours(text, base=base) or 2
    if start_dt and not end_dt:
        end_dt = start_dt + timedelta(hours=duration_hours)

    # if end < start, fix it to start + duration
    if start_dt and end_dt and end_dt < start_dt:
        end_dt = start_dt + timedelta(hours=duration_hours)

    # if neither start nor end, default to base + 2h
    if not start_dt:
        start_dt = base
        end_dt = base + timedelta(hours=duration_hours)
    if not end_dt:
        end_dt = start_dt + timedelta(hours=duration_hours)

    # location, capacity, public flag
    location = _select_location(text)
    capacity = None
    mcap = CAPACITY_RE.search(text)
    if mcap:
        try:
            capacity = int(mcap.group(1))
        except Exception:
            capacity = None
    is_public = True
    if re.search(r'\b(private|invite only|members only|internal)\b', text, re.I):
        is_public = False

    # slug (short)
    slug = slugify(f"{title}-{start_dt.date()}")[:120]

    return {
        "title": title,
        "description": description,
        "location": location,
        "start_at": start_dt.replace(tzinfo=timezone.utc).isoformat(),
        "end_at": end_dt.replace(tzinfo=timezone.utc).isoformat(),
        "rsvp_deadline": rsvp_iso,
        "capacity": capacity,
        "is_public": is_public,
        "slug": slug,
    }