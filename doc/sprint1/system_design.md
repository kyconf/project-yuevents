# YUEvents — System Design Document (Sprint 1)

**Location:** `doc/sprint1/system_design.md`  
**Format:** Markdown (can be exported to PDF / MS-Word / HTML)  
**Version:** 1.0  
**Date:** October 2025  
**Team Members:**

- Ethan Constantin
- Jason Hu
- Nathan Benayguev
- Pham Duc
- Kyle Fernandez

---

## Table of Contents

1. [Overview](#overview)
2. [High-Level Goals for Sprint 1](#high-level-goals-for-sprint-1)
3. [System Context and Environment](#system-context-and-environment)
4. [Architecture (Diagram)](#architecture-abstract-view)
5. [System Decomposition and Component Roles](#system-decomposition-and-component-roles)
6. [CRC Cards (Class-Level Summary)](#crc-cards-class-level-summary)
7. [Data Models (Example Fields)](#data-models-example-fields)
8. [API Surface (Selected Endpoints)](#api-surface-selected-endpoints)
9. [Error & Exception Strategy](#error--exception-strategy)
10. [Security Considerations](#security-considerations)
11. [UI / UX Notes (Sprint 1 Minimal Set)](#ui--ux-notes-sprint-1-minimal-set)
12. [Acceptance Criteria Mapping (Sprint 1 Focus)](#acceptance-criteria-mapping-sprint-1-focus)
13. [Implementation Plan & Milestones (Sprint 1)](#implementation-plan--milestones-sprint-1)
14. [Risks & Mitigations](#risks--mitigations)
15. [Appendix: Example Repository Layout](#appendix-example-repository-layout)

---

## 1. Overview

[YUEvents System Design Diagram](https://apps.nulab.com/i/1bvwmIYyn3d5w8YydF3R1K2R8KjmnZvd)

YUEvents is a web application that aggregates university and club events (scraped from sources such as YuConnect, Discord, and Instagram) and provides a single feed, search, calendar views, and club-exec posting tools.

Sprint 1 focuses on the initial foundation so that 3 layer architecture is demonstrated and the individual components of the 3 layer function properly.

**Tech Stack (Project Baseline):**

- **Frontend:** Next.js
- **Backend:** Python + FastAPI
- **Database:** PostgreSQL through Supabase
- **Scraper:** BeautifulSoup (+ Discord bot / Instagram scraping where permitted)
- **Auth:** JWT-based session and role management (student, exec, admin)

---

## 2. High-Level Goals for Sprint 1

- Implement `Event`, `Club`, `User` model, services and repositories and API endpoints for create/read/list events, clubs, and users.
- Build basic Next.js pages: event feed list, home page, sign up page, login page.
- Establish DB connectivity to store Events, Clubs, and user.

---

## 3. System Context and Environment

**Assumptions & Dependencies**

- Target OS: macOS/Windows.
- Python 3.11+ (FastAPI + Uvicorn) and Node 18+ for Next.js.
- PostgreSQL 13+ recommended; MySQL 8+ supported with minimal changes.
- Later integration (Discord API, Instagram scraping, YuConnect API) will require tokens and rate-limit handling.

**Network & Infrastructure**

- Backend exposes REST API .
- Frontend communicates via same-origin or configured CORS for development.
- JWT stored in secure HttpOnly cookie (preferred) or localStorage.

---

## 4. Architecture (Abstract View)

We follow a **three-tier architecture**:

- **Presentation Layer (Frontend):** Next.js pages, components, client-side API calls to backend. Handles UI, infinite-scroll feed, search.
- **Application Layer (Backend/API):** FastAPI app exposing REST endpoints, implementing business logic, authentication, input validation, and authorization.
- **Data Layer:** PostgreSQL database, migration scripts, ORM models (SQLModel or SQLAlchemy).
- **Scraper / Aggregator:** Independent worker scripts (BeautifulSoup) or microservices posting validated JSON to backend endpoints.

### Component Diagram (3 Layer Architecture)

![System MVC Diagram](SystemMVC.png)

## 5. System Decomposition and Component Roles

This section maps each architectural component to its corresponding code modules and responsibilities.

### Frontend (`frontend/`)

[Frontend Docs](FrontendDocs.html)

### Backend (`backend/fastapi_app/`)

[Backend Docs](BackendDocs.html)

### Database

- **Tables:** users, clubs, events, tags, event_tags, rsvps, comments (future sprints)

### Scraper Scripts

- `scrapers/yuconnect_scraper.py`
- `scrapers/discord_bot.py` _(requires token/permissions)_
- `scrapers/instagram_scraper.py` _(rate-limited)_

---

## 6. CRC Cards (Class-Level Summary)

### Class Name: User

**Responsibilities:**

- Represent a platform user (student, exec, or admin)
- Store credentials and profile data
- Link to events created or attended
- Support role-based permissions

**Collaborators:**  
`UserRepo`, `UserService`, `UserController`

---

### Class Name: UserRepo

**Responsibilities:**

- Handle CRUD operations for users
- Query users by email, ID, or role
- Manage persistence with SQLModel or SQLAlchemy

**Collaborators:**  
`User`, `UserService`, `UserController`

---

### Class Name: UserController

**Responsibilities:**

- Expose HTTP endpoints for user management & auth
  - POST `/login`, `/register`, `/logout`
  - GET `/users/me`, `/users/{id}`, PUT `/users/me`
- Handle validation, authorization, and JWT return

**Collaborators:**  
`UserService`, `UserRepo`, `User`

---

### Class Name: UserService

**Responsibilities:**

- Validate credentials, register users, hash passwords
- Manage JWT creation and permissions
- Bridge between controller and repo layers

**Collaborators:**  
`UserRepo`, `UserController`, `User`

---

### Class Name: Event

**Responsibilities:**

- Represent an event (title, description, date, location, organizer)
- Store relationships (club, tags, attendees)
- Used for scraped and manually added events

**Collaborators:**  
`EventRepo`, `EventService`, `EventController`

---

### Class Name: EventRepo

**Responsibilities:**

- Manage CRUD operations for events
- Query by date, tag, or organizer
- Prevent duplicates

**Collaborators:**  
`Event`, `EventService`, `EventController`

---

### Class Name: EventService

**Responsibilities:**

- Validate and manage event creation, update, and deletion
- Handle search, filtering, tagging
- Integrate with scrapers

**Collaborators:**  
`EventRepo`, `EventController`, `Event`

---

### Class Name: EventController

**Responsibilities:**

- CRUD API:
  - POST `/events`, GET `/events/{id}`, PUT `/events/{id}`, DELETE `/events/{id}`
- Enforce permissions and coordinate validation

**Collaborators:**  
`EventService`, `EventRepo`, `UserController`, `Event`

---

## 7. Data Models (Example Fields)

## 🗓️ Events Table

| Field           | Type         | Description                                                      |
| ---------------- | ------------ | ---------------------------------------------------------------- |
| id               | UUID         | Unique event ID (primary key)                                    |
| creator_id       | UUID (FK)    | References `auth.users(id)` — creator of the event               |
| title            | text         | Event title                                                      |
| description      | text         | Event description                                                |
| location         | text         | Location or venue                                                |
| start_at         | timestamp tz | Event start date and time                                        |
| end_at           | timestamp tz | Event end date and time                                          |
| rsvp_deadline    | timestamp tz | Optional RSVP deadline                                           |
| capacity         | integer      | Max number of attendees (nullable, must be ≥ 0 if set)           |
| is_public        | boolean      | Whether the event is visible to everyone                         |
| slug             | text (unique)| URL-friendly identifier for the event                            |
| created_at       | timestamp tz | When the record was created (default: now)                       |
| updated_at       | timestamp tz | When the record was last updated (default: now)                  |

---

## 🏛️ Clubs Table

| Field         | Type          | Description                                                      |
| -------------- | ------------- | ---------------------------------------------------------------- |
| id             | UUID          | Unique club ID (primary key)                                     |
| owner_id       | UUID (FK)     | References `auth.users(id)` — the club’s owner                   |
| name           | text          | Club name                                                        |
| slug           | text (unique) | URL-friendly identifier for the club                             |
| about          | text          | Club description or mission                                      |
| avatar_url     | text          | URL to club logo/avatar                                          |
| banner_url     | text          | URL to banner image                                              |
| is_public      | boolean       | Whether the club is visible to everyone                          |
| join_policy    | enum          | Join policy (`open`, `request`, etc., from `club_join_policy`)   |
| contact_email  | text          | Contact email for inquiries                                      |
| website        | text          | Club website URL                                                 |
| socials        | JSONB         | Object containing social media links                             |
| created_at     | timestamp tz  | When the club was created (default: now)                         |
| updated_at     | timestamp tz  | When the club was last updated (default: now)                    |

---

## 👤 Profiles Table

| Field        | Type          | Description                                                    |
| ------------- | ------------- | -------------------------------------------------------------- |
| id            | UUID (FK)     | References `auth.users(id)` — user’s unique ID                 |
| username      | text (unique) | Display username                                               |
| full_name     | text          | Full name of the user                                          |
| avatar_url    | text          | Profile picture URL                                            |
| role          | enum          | User role (`user`, `exec`, `admin`) from `user_role` enum      |
| about         | text          | Short bio or description                                       |
| created_at    | timestamp tz  | When the profile was created (default: now)                    |
| updated_at    | timestamp tz  | When the profile was last updated (default: now)               |

---
---

## 8. API Surface (Sprint 1 Endpoints)

The backend exposes RESTful endpoints organized by resource type: **Users**, **Clubs**, and **Events**.  
Each category supports full CRUD operations (Create, Read, Update, Delete).

| Category   | Method | Endpoint           | Description                          |
| ---------- | ------ | ------------------ | ------------------------------------ |
| **Users**  | POST   | `/api/users`       | Create new user (registration)       |
|            | GET    | `/api/users`       | Get all users                        |
|            | GET    | `/api/users/{id}`  | Get user by ID                       |
|            | PUT    | `/api/users/{id}`  | Update existing user                 |
|            | DELETE | `/api/users/{id}`  | Delete user account                  |
| **Clubs**  | POST   | `/api/clubs`       | Create new club                      |
|            | GET    | `/api/clubs`       | Get all clubs                        |
|            | GET    | `/api/clubs/{id}`  | Get club by ID                       |
|            | PUT    | `/api/clubs/{id}`  | Update existing club                 |
|            | DELETE | `/api/clubs/{id}`  | Delete club                          |
| **Events** | POST   | `/api/events`      | Create new event (manual or scraper) |
|            | GET    | `/api/events`      | Get all events (feed)                |
|            | GET    | `/api/events/{id}` | Get event by ID                      |
|            | PUT    | `/api/events/{id}` | Update existing event                |
|            | DELETE | `/api/events/{id}` | Delete event                         |

**Notes:**

- All `POST`, `PUT`, and `DELETE` routes require authentication and role-based authorization (exec/admin).
- `GET` routes are publicly accessible unless restricted by design (e.g., user profiles).
- Pagination, filtering, and search parameters are supported on collection endpoints (e.g., `/api/events?tag=music&limit=10`).

---

## 9. Error & Exception Strategy

### Principles

- Fail fast with clear validation messages (`400 Bad Request`)
- Use consistent HTTP codes:
  - `200/201` success
  - `400` invalid input
  - `401/403` auth/permissions
  - `404` not found
  - `409` duplicate/conflict
  - `500` server error
- Log unexpected exceptions with request IDs

### Specific Cases

- Invalid input → 400 + JSON field details
- DB failure → 503 Service Unavailable
- Scraper malformed payload → 422 with explanation
- Duplicate inserts → 409 Conflict

## 10. Security Considerations

- Use parameterized queries / ORM to prevent SQL injection
- HTTPS for all communication
- JWTs in HttpOnly cookies (short expiry + refresh tokens if needed)
- Rate-limit scraper endpoints; require API keys


---

## 11. Acceptance Criteria Mapping (Sprint 1 Focus)

**Features to complete:**

- Event feed skeleton
- Home Page
- API endpoints
- database connected to backend
- functional frontend

---

## 12. Appendix: Example Repository Layout

```
/ (repo root)
├─ README.md
│
├─ backend/
│  ├─ controllers/
│  ├─ entities/
│  ├─ repositories/
│  ├─ services/
│  ├─ tests/
│  └─ main.py
│ 
│
│
├─ frontend/
│  └─ next-app/
│     ├─ public/
│     └─ src/
│        └─ app/
│           ├─ assets/
│           ├─ components/
│           
│           ├─ login/
│           ├─ clubs/
│           ├─ join/
│           ├─ signup/
│           └─ events/
│             ├─ calendar/
│             ├─ event-feed/
│             └─ post-event/
│
└─ doc/
   ├─ sprint0/
   ├─ sprint1/
   ├─ sprint2/
   └─ sprint3/
```

---
