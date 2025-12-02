import os, json, sys
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
from datetime import datetime
load_dotenv()
# TODO: Make the backend folder a package to load the env once at the root

# --- PATH SETUP (Condensed) ---
current_dir = os.path.dirname(os.path.abspath(__file__))
root_backend = os.path.normpath(os.path.join(current_dir, '..', '..'))
sys.path.extend([
    root_backend, 
    os.path.join(root_backend, 'entities'),
])
# ------------------------------
from event import EventBase

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
if not HUGGINGFACE_API_KEY:
    raise RuntimeError("Please set HUGGINGFACE_API_KEY in environment")
DEFAULT_CLUB_ID = os.getenv("DEFAULT_CLUB_ID")
if not DEFAULT_CLUB_ID:
    logger.warning("⚠️ DEFAULT_CLUB_ID not set in .env. Events will likely fail validation.")

client = InferenceClient(api_key=HUGGINGFACE_API_KEY)

def parse_message_llm(message_content: str) -> dict:

    
    schema = EventBase.model_json_schema()
    current_time = datetime.now()
    current_iso = current_time.isoformat()
    current_day = current_time.strftime("%A")

    prompt = f"""
You are an assistant that extracts event information from unstructured Discord messages. You must respond with a JSON object only, following these strict guidelines:
Unless otherwise given permission to do so by the user, you must NOT hallucinate any information. Current Reference Time: {current_iso} (Day: {current_day})
Given the following message, extract and return only **valid JSON object** only with absolutely zero commentary matching this Pydantic schema:

EventCreate:
{{
"title": str,
"description": str | null,
"location": str | null,
"start_at": str (ISO 8601),
"end_at": str (ISO 8601),
"rsvp_deadline": str | null (ISO 8601),
"capacity": int | null,
"is_public": bool,
"slug": str
"banner": 
}}

Important rules:
- You may guess start_at and end_at if no times are provided.
- You may guess is_public based on context (e.g., "public event" vs "private group").
- **NEVER INVENT other information** that is not present in the message.
- If something is **missing or unclear**, set it to **null**.
- Do NOT guess RSVP deadlines, capacities, or locations.
- Dates must be realistic. If no date is found, set start_at and end_at to null.
- Do NOT add any extra keys or text.
- Output must be **pure JSON** (no markdown, no explanations).
- The fields title, start_at, end_at, is_public, and slug are REQUIRED and cannot be null.

Example outputs:

Message: "Club movie night this Friday 7pm at Curtis Lecture Hall."
→
{{
  "title": "Club movie night",
  "description": "Club movie night this Friday 7pm at Curtis Lecture Hall.",
  "location": "Curtis Lecture Hall",
  "start_at": "2025-11-14T19:00:00Z",
  "end_at": "2025-11-14T21:00:00Z",
  "rsvp_deadline": null,
  "capacity": null,
  "is_public": true,
  "slug": "club-movie-night-2025-11-14"
  "banner": null
}}

Message: "End of semester mixer — RSVP before Dec 10!"
→
{{
  "title": "End of semester mixer",
  "description": "End of semester mixer — RSVP before Dec 10!",
  "location": null,
  "start_at": null,
  "end_at": null,
  "rsvp_deadline": "2025-12-10T00:00:00Z",
  "capacity": null,
  "is_public": true,
  "slug": "end-of-semester-mixer"
  "banner": null
}}

Now extract the event information from this message:

Message:
\"\"\"{message_content}\"\"\"
"""
# Currently in the db, end time is non-nullable, so i prompted the model to estimate an end time if missing, but ideally i think this should be nullable too.
    # TODO: Use built-in huggingface scturturing JSON parsing
    completion = client.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object", "schema": schema},
        temperature=0.1, # Keep strict
        max_tokens=500
    )

    text = completion.choices[0].message.content
    # text = """
    # {
    #     "title": "Test Movie Night",
    #     "description": "This is a mocked response to test ID injection.",
    #     "location": "Virtual",
    #     "start_at": "2025-11-20T18:00:00",
    #     "end_at": "2025-11-20T20:00:00",
    #     "rsvp_deadline": null,
    #     "capacity": null,
    #     "is_public": true,
    #     "slug": "test-movie-night",
    #     "banner": null
    # }
    # """

    try:
        parsed = json.loads(text)
        parsed['club_id'] = DEFAULT_CLUB_ID  # Assign default club ID
        print(DEFAULT_CLUB_ID)
        print(parsed)
    except json.JSONDecodeError:
        raise ValueError(f"LLM returned invalid JSON: {text}")
    return parsed

