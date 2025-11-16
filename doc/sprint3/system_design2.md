Understood — here is the **entire Sprint 3 `system_design.md` file**, in **ONE SINGLE unrendered markdown block**, with **no formatting outside the block**.

---
# YUEvents — System Design Document (Sprint 3)

**Location:** `doc/sprint3/system_design.md`  
**Version:** 3.0  
**Date:** November 2025  
**Team Members:**
- Ethan Constantin  
- Jason Hu  
- Nathan Benayguev  
- Pham Duc  
- Kyle Fernandez  

---

# Table of Contents
1. Overview
2. System Context & Goals (Sprint 3)
3. Updated Architecture
4. Component Responsibilities (Three-Layer Breakdown)
5. Scraper Architecture (Discord + Parsers)
6. Data Model (Updated for Sprint 3)
7. API Surface (Updated Sprint 3)
8. Authentication & Security Design
9. Search, Editing, Deletion, and Comments Flows
10. Frontend Architecture (Next.js App Router)
11. Error Handling & Logging Strategy
12. Risks & Considerations
13. Appendix: Updated Repository Layout

---

# 1. Overview

YUEvents is a full-stack event aggregation platform that consolidates student-club events from multiple sources (manual posting, Discord scraping, and future Instagram / YuConnect scrapers).  

By Sprint 3, the system now supports:
- Manual event posting  
- Event editing & deletion  
- Club profile pages  
- Direct-match event search  
- Authentication with JWT  
- Event comments  
- Aggregator endpoint for scrapers  

This document reflects the updated design of the entire system as of Sprint 3.

---

# 2. System Context & Sprint 3 Goals

### External Systems:
- Discord Bot / Scraper  
- HuggingFace Inference API (LLM parser)  
- Supabase PostgreSQL  
- Next.js Frontend  
- FastAPI Backend  

### Sprint 3 Feature Goals:
- Club profiles  
- Search events (direct text match)
- Event editing & deletion  
- Reviews/comments  
- Security hardening  
- Complete aggregator ingestion endpoint

---

# 3. Updated Architecture

### Overall Architecture Diagram (Text Form)


[Frontend - Next.js 14 (App Router)]
|
v
[Backend - FastAPI Controllers]
|
v
[Services Layer]
|
v
[Repository Layer]
|
v
[PostgreSQL Database via Supabase]

[Scrapers (Discord, Instagram, YuConnect)]
|
v
POST /api/events/aggregate

### Key Architectural Principles:
- Three-layer backend (controller → service → repo)
- Frontend uses Next.js App Router
- Scrapers run independently and push validated events
- JWT authentication with role-based access

---

# 4. Component Responsibilities (Three-Layer Breakdown)

## Controllers
- Define REST routes  
- Validate input  
- Authenticate using JWT  
- Forward requests to services  
- Return HTTP responses  

## Services
- Business logic  
- Permission checks  
- Data validation  
- Scraper ingestion logic  
- Event editing and deletion  
- Searching  

## Repositories
- Direct SQL queries  
- Interact with Supabase client  
- Insert/update/delete rows  
- Prevent duplicate events  
- Return entity objects  

---

# 5. Scraper Architecture (Discord + Parsers)

### Directory

backend/scrapers/
discord/
instagram/
yuconnect/
parsers/
llm_parser.py
regex_parser.py
hybrid.py


### Hybrid Parsing Pipeline
1. Extract raw text from Discord message  
2. Try LLM parse via HuggingFace Mistral  
3. If rate-limited → fallback to regex parser  
4. Normalize into standard event schema  
5. Submit to backend via:
```
POST /api/events/aggregate
```

### Aggregator Endpoint Responsibilities:
- Validate incoming event  
- Prevent duplicates via slug/timestamp hash  
- Store event with source metadata  
- Sanitize fields  

---

# 6. Data Model (Updated for Sprint 3)

### Table: events
| Field        | Type                                   | Description                                  |
|--------------|----------------------------------------|----------------------------------------------|
| id           | uuid (PK)                              | Unique event identifier                      |
| creator_id   | uuid (FK)                              | User who created the event                   |
| club_id      | uuid (FK, nullable)                    | Club associated with the event (optional)    |
| title        | text                                   | Event title                                   |
| description  | text                                   | Full event description                        |
| location     | text                                   | Event location                                |
| start_at     | timestamptz                            | Event start time                              |
| end_at       | timestamptz                            | Event end time                                |
| source       | enum('manual','discord','instagram','yuconnect') | How the event was created / scraped |
| slug         | text (unique)                          | URL-friendly unique identifier                |
| created_at   | timestamptz                            | Timestamp when event was created              |
| updated_at   | timestamptz                            | Timestamp of last update                      |


### Table: clubs
| Field         | Type          | Description                                   |
|---------------|---------------|-----------------------------------------------|
| id            | uuid (PK)     | Unique club identifier                        |
| name          | text          | Club name                                     |
| slug          | text (unique) | URL-friendly unique identifier                |
| about         | text          | Club description / mission                    |
| avatar_url    | text          | URL to club avatar image                      |
| banner_url    | text          | URL to club banner                            |
| contact_email | text          | Contact email                                 |
| website       | text          | Club website URL                              |
| socials       | jsonb         | Social links (Instagram, Discord, etc.)       |
| owner_id      | uuid (FK)     | User who owns/manages the club                |
| created_at    | timestamptz   | Timestamp when club was created               |
| updated_at    | timestamptz   | Timestamp when club was last updated          |


### Table: comments (NEW)
| Field       | Type        | Description                           |
|-------------|-------------|---------------------------------------|
| id          | uuid (PK)   | Unique comment identifier             |
| event_id    | uuid (FK)   | Event this comment belongs to         |
| user_id     | uuid (FK)   | User who posted the comment           |
| content     | text        | Comment text                          |
| created_at  | timestamptz | Timestamp when comment was created    |


### Table: users
| Field           | Type                                 | Description                           |
|-----------------|---------------------------------------|---------------------------------------|
| id              | uuid (PK)                             | Unique user identifier                |
| email           | text (unique)                         | Email / login identifier              |
| hashed_password | text                                  | Bcrypt-hashed password                |
| role            | enum('user','exec','admin')           | User role / privileges                |
| created_at      | timestamptz                           | Timestamp when user was created       |


---

# 7. API Surface (Sprint 3 Updated)

This section documents all REST endpoints implemented across the Users, Events, and Clubs controllers, including authentication routes and upcoming calendar endpoints.

---

## Authentication (Users Controller)

| Method | Endpoint        | Description                     | Body Model      | Auth Required |
|--------|-----------------|---------------------------------|------------------|---------------|
| POST   | /users/signup   | Register a new user and return JWT | UserCreate       | No |
| POST   | /users/login    | Login with email/password and return JWT + Supabase session | UserLogin | No |

---

## Users API

| Method | Endpoint            | Description                       | Body Model  | Auth Required |
|--------|---------------------|-----------------------------------|--------------|---------------|
| GET    | /users              | Get all users                     | None         | No |
| GET    | /users/{user_id}    | Get user by ID                    | None         | No |
| POST   | /users              | Create a new user                 | UserCreate   | No |
| PUT    | /users/{user_id}    | Update user information           | UserUpdate   | Yes |
| DELETE | /users/{user_id}    | Delete a user                     | None         | Yes |

---

## Events API

| Method | Endpoint                | Description                                     | Body Model     | Auth Required |
|--------|--------------------------|-------------------------------------------------|-----------------|---------------|
| GET    | /events                  | Get all events (optional ?limit=X)             | None            | No |
| GET    | /events/{event_id}       | Get event by ID                                | None            | No |
| POST   | /events                  | Create a new event                             | EventCreate     | Yes (exec/admin) |
| PUT    | /events/{event_id}       | Update an existing event                       | EventUpdate     | Yes (owner/admin) |
| DELETE | /events/{event_id}       | Delete an event                                | None            | Yes (owner/admin) |
| POST   | /events/aggregate        | Scraper ingestion endpoint                     | Raw JSON (validated) | Yes (scraper key/admin) |
| GET    | /events/search?q=        | Direct keyword search for events               | None            | No |
| POST   | /events/{id}/comments    | Add a comment to an event                      | CommentCreate   | Yes |
| GET    | /events/{id}/comments    | Get all comments for an event                  | None            | No |
| GET    | /events/calendar?month=&year= | Get events for a calendar view (UPCOMING) | None | No |

---

## Clubs API

| Method | Endpoint              | Description                       | Body Model   | Auth Required |
|--------|------------------------|-----------------------------------|---------------|---------------|
| GET    | /clubs                | Get all clubs                     | None          | No |
| GET    | /clubs/{club_id}      | Get club by ID                    | None          | No |
| POST   | /clubs                | Create a new club                 | ClubCreate    | Yes (exec/admin) |
| PUT    | /clubs/{club_id}      | Update a club                     | ClubUpdate    | Yes |
| DELETE | /clubs/{club_id}      | Delete a club                     | None          | Yes |

---

## Planned New Endpoint (Sprint 3)

### Calendar Event Endpoint
To support the calendar page, you will add:

# 8. Authentication & Security Design

### JWT Payload
```
{
            "user_id": user_id,
            "username": username,
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=self.expiry_minutes),
            "iat": datetime.datetime.now(datetime.timezone.utc)
        }
```

### Permissions
- Only exec/admin can create/edit/delete events  
- Aggregator endpoint uses API key  
- Club creation/edit restricted to exec/admin  
- Comments require authentication  

### Security Measures
- Bcrypt password hashing  
- Short-lived JWT  
- CORS configured for Next.js domain  
- Validation against tampered tokens  

---


# 9. Frontend Architecture (Next.js App Router)

### Directory Structure
```

frontend/next-app/src/app/
events/
event-feed/
calendar/
post-event/
[id]/
clubs/
[slug]/
login/
signup/
components/

```

### Notes
- Server components handle rendering  
- Client components handle forms, editing, posting  
- State stored minimally, backend is source of truth  

---


# 10. Risks & Considerations

### Technical Risks
- Scraper API changes (Discord/Instagram)
- LLM rate limits  
- Committee-style queries causing performance issues  

### Design Risks
- Event duplication between manual + scraped
- Permission enforcement must be tested thoroughly  

---

# 11. Appendix: Updated Repository Layout

```

/repo-root
├─ backend/
│  ├─ controllers/
│  ├─ entities/
│  ├─ repositories/
│  ├─ services/
│  ├─ scrapers/
│  │   ├─ discord/
│  │   ├─ instagram/
│  │   ├─ yuconnect/
│  │   └─ parsers/
│  ├─ tests/
│  ├─ main.py
│  ├─ supabase_client.py
│  └─ requirements.txt
│
├─ frontend/
│  └─ next-app/
│     ├─ public/
│     └─ src/app/
│        ├─ events/
│        ├─ clubs/
│        ├─ login/
│        ├─ signup/
│        └─ components/
│
└─ doc/
├─ sprint1/
├─ sprint2/
├─ sprint3/
└─ README.md