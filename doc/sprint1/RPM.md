# Release Planning Meeting (RPM.md)

**Date:** October 2025  
**Sprint:** 1  
**Duration:** 1 hour  
**Attendees:**
- Ethan Constantin 
- Jason Hu 
- Nathan Benayguev 
- Pham Duc
- Kyle Fernandez

---

## 1. Meeting Overview

The Release Planning Meeting defined the **scope and deliverables** for Sprint 1 of YUEvents.  
This sprint focuses on **building and documenting separate, working layers** of the system, backend, frontend, and database, so that each component is ready for integration in Sprint 2.

---

## 2. Release Goals

**Primary Goal:**  
Establish a stable **frontend**, **backend**, and **database foundation**, each verified to run independently.

**Objectives:**
- Implement **FastAPI backend** with working user and event endpoints.
- Implement **Next.js frontend** pages for login, signup, and event feed (mock data or local JSON).
- Instantiate and migrate a **PostgreSQL database** with `User` and `Event` tables.
- Deliver documentation and a short demo showing both layers running separately.
- Prepare the groundwork for full integration in Sprint 2.

---

## 3. Planned User Stories / Tasks (from Trello)

| ID | User Story / Task | Description | Owner |
|----|--------------------|--------------|--------|
| YE-01 | **Event Feed** | Display mock event data in feed view | Frontend (Jason) |
| YE-35 | **Implement Home Page** | Basic navigation and layout | Frontend (Louis) |
| YE-36 | **Implement Login Page** | Local auth mock (to be integrated later) | Frontend (Louis) |
| YE-37 | **Implement Signup Page** | Local form handling only | Frontend (Louis) |
| YE-38 | **Implement User Entity** | Backend `User` model | Backend (Nathan) |
| YE-39 | **Implement Event Controller** | Backend endpoints `/api/events` | Backend (Ethan) |
| YE-40 | **Implement User Controller** | Backend endpoints `/api/users` | Backend (Nathan) |
| YE-33 | **Instantiate PostgreSQL DB** | Configure ORM and migrations | Backend / Database (Kyle) |
| YE-31 | **Documentation (Frontend & Backend)** | Create setup and API docs | (Nathan) |
| YE-30 | **System Design Document** | Complete architecture doc | (All) |
| YE-29 | **Features Demo Recording** | Show each layer working independently | (All) |

---

## 4. Team Discussion Summary

- **Architecture:** Confirmed a three-layer structure (Frontend, Backend, Database).  
  Layers will remain **decoupled in Sprint 1**, integrated later via REST API.
- **Frontend:** Focus on building functional pages with mocked API responses.  
- **Backend:** Focus on defining REST endpoints and testing DB operations with Postgres. 
- **Database:** Verified migrations and table creation scripts.  

---

## 5. Deliverables for Release 1

- ✅ Working **FastAPI backend** (runs independently with Postgres DB)  
- ✅ Functional **Next.js frontend** with mock data  
- ✅ PostgreSQL database instantiated with migrations  
- ✅ System Design Document (`system_design.md`)  
- ✅ Demo recording showing backend and frontend running separately  

---
## 6. Meeting recorded

![Release Plan Meeting Recorded](1000022381.jpg)

