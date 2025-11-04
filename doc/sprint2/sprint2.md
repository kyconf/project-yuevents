# 🚀 Sprint 2 Planning Meeting

**Project:** Event Aggregator Platform  
**Sprint:** Sprint 2 (Weeks 4–5)  
**Date:** 2025-11-03  

---

## 👥 Participants

| Team Members |
| ------------- |
| Ethan Constantin |
| Jason Hu |
| Nathan Benayguev |
| Pham Duc |
| Kyle Fernandez |

*(All members were present and participated in planning.)*

---

## 🎯 Sprint Goal

The goal of **Sprint 2** is to expand the Event Aggregator Platform’s core features by implementing **event posting for manual users**, **event display pages**, and the **Discord web scraper** for automated event ingestion.  
This sprint will also improve **frontend-backend integration** and **authentication stability** established during Sprint 1.

---

## 🧮 Team Capacity

| Team Member | Available Hours | Focus Area |
|--------------|----------------|-------------|
| Ethan Constantin | 1.5 hrs | Web Scraper |
| Jason Hu | 1.5 hrs | Frontend event UI & calendar |
| Nathan Benayguev | 1.67 hrs | Authentication, frontend to backend connections |
| Pham Duc | 1.5 hrs | Database and data consistency |
| Kyle Fernandez | 1.69 hrs | Testing, documentation |
| **Total Capacity** | **7.86 hrs** | |

---

## 🔍 Spikes

| ID | Description | Owner | Goal |
|----|--------------|-------|------|
| **SP4** | Investigate event calendar rendering libraries (e.g., React Big Calendar) | Jason | Choose a library for Sprint 2 UI implementation |
| **SP5** | Research Discord scraping methods and rate-limiting | Ethan | Confirm feasibility and data model for Discord scraper |
| **SP6** | Evaluate Supabase auth session persistence across tabs | Nathan | Ensure stable login session handling for users |

---

## 📜 User Stories Selected for Sprint 2

| ID | User Story | Priority | Acceptance Criteria |
|----|-------------|-----------|----------------------|
| **YE-5** | As a club executive, I want to be able to directly post an event to the website so that I don’t have to make an Instagram account or discord server. | High | Posting event form works and saves data in DB. |
| **YE-7** | As a student, I want to view events on a calendar so that I can easily see what is happening on specific days and plan my schedule accordingly. | High | Calendar and detail pages render correctly from DB. |
| **YE-6** | As a student, I want to click on an event to open a detailed page so that I can view full information such as the description, time, location, and organizer before deciding to attend. | Medium | Clicking view details will open an events info |
| **YE-11** | As a Dev I want to auto scrape through clubs using discord that have accepted our services, automatically populating the DB using a BOT | Medium | Scraping a server validates info and ads it to db |
| **YE-23** | As a student I want my session stored and also I want my account to be secure as I browse YUEvents | Medium | JWT allows access to endpoints and is persited to local storage/cookies |

---


## ✅ Decisions

- The team agreed to **prioritize YE-5 (Event Posting)** and **YE-7 (Calendar View)** early in the sprint, as these are the most visible user-facing features.
- **YE-6 (Event Details Page)** will follow once calendar rendering and event fetching are stable, as it depends on data retrieved from the same backend endpoints.
- **YE-11 (Discord Web Scraper)** will begin mid-sprint after Ethan completes the spike on Discord API testing to ensure scraping does not violate rate limits or bot policies.
- **YE-23 (Session Persistence & Security)** will be implemented in parallel, focusing on persistent JWT sessions and secure user authentication flows.
- Team will continue using Supabase for authentication and PostgreSQL for event storage, confirming integration with the frontend via REST endpoints.
- UI improvements and event filtering are postponed to Sprint 3 to focus on ensuring that event posting, display, and scraping pipelines are fully functional.
- Daily standups will continue to ensure blockers are addressed quickly, and team members will update the shared board after each work session.


---

## 🧩 Task Breakdown

| Story ID | Task | Assigned To |
|-----------|------|--------------|
| **YE-5** | Post Event (Manual User) – Implement event submission logic | Kyle & Trung |
| **YE-46** | Post Event UI (Manual User) – Create and style event posting form | Trung |
| **YE-47** | Post Event Backend (Manual User) – Connect form data to backend endpoint | Kyle |
| **YE-7** | Events Calendar View – Build and render calendar UI | Jason |
| **YE-6** | Event Details Page – Create detailed view for selected events | Trung |
| **YE-11** | Web Scraper (Discord) – Develop Discord bot to collect event data and push to DB | Ethan |
| **YE-23** | JWT System – Finalize and test authentication and session persistence | Nathan |
| **YE-44** | Connect login/sign-up to backend – Integrate auth endpoints with frontend forms | Nathan |
| **YE-45** | Connect event feed to backend – Fetch and display event list from API | Kyle |
| **YE-48** | Implement fetch requests for event feed – Connect event feed components to backend | Jason |
| **YE-49** | Implement fetch and post requests for login/sign-up page – Ensure secure data flow and token handling | Trung |



---

## 🎯 Expected Deliverables

- **Fully Functional Event Posting Flow (YE-5, YE-46, YE-47):**  
  Club executives can manually create and publish events through a complete frontend-backend workflow.  
  Events are validated, stored in the database, and retrievable through API endpoints.

- **Event Viewing Features (YE-6, YE-7):**  
  Students can browse upcoming events via a **calendar interface**, and click individual events to view their full details (description, location, time, and organizer).  
  UI dynamically renders from live backend data.

- **Discord Web Scraper Integration (YE-11):**  
  A prototype Discord bot can collect event announcements from approved club servers and automatically push them into the event database.  
  Scraped events will follow the same data schema as manually posted ones.

- **Authentication and Session Management (YE-23, YE-44, YE-49):**  
  JWT-based authentication system implemented and integrated with the frontend.  
  Users remain logged in through persistent sessions stored securely in cookies or local storage.  
  Both login and sign-up flows are connected to the backend.

- **Frontend-Backend Connectivity (YE-45, YE-48):**  
  The frontend event feed and calendar pull live data from backend APIs.  
  All major frontend pages (feed, calendar, post event, login/signup) now communicate with backend services through Axios calls.

- **Stable Integration and Testing:**  
  All implemented features tested for correct data flow between frontend, backend, and database.  
  Documentation of endpoints and setup steps updated to reflect new features.

- **Demonstrable End-to-End Prototype:**  
  By the end of Sprint 2, the system will allow users to **log in, post events, and view them**—either from manual input or Discord scraping—within a unified and functional interface.


---

## 📝 Notes

- Continue using the shared GitHub project board and jira for tracking progress.  
- Avoid late merges; schedule at least one team review before final submission.  

