import os, json, sys
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
load_dotenv()
# TODO: Make the backend folder a package to load the env once at the root

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
if not HUGGINGFACE_API_KEY:
    raise RuntimeError("Please set HUGGINGFACE_API_KEY in environment")

client = InferenceClient(api_key=HUGGINGFACE_API_KEY)

def parse_message_llm(message_content: str) -> dict:
    prompt = f"""
You are an assistant that extracts event information from unstructured Discord messages. You must respond with a JSON object only, following these strict guidelines:
Unless otherwise given permission to do so by the user, you must NOT hallucinate any information.
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
}}

Now extract the event information from this message:

Message:
\"\"\"{message_content}\"\"\"
"""
# Currently in the db, end time is non-nullable, so i prompted the model to estimate an end time if missing, but ideally i think this should be nullable too.

    completion = client.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
        messages=[{"role": "user", "content": prompt}],
    )

    text = completion.choices[0].message.content
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        raise ValueError(f"LLM returned invalid JSON: {text}")
    return parsed

