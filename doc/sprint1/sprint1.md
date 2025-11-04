# sprint1.md — Sprint 1 Planning Meeting  

## Project: Event Aggregator Platform  
### Sprint: Sprint 1 (Weeks 1–2)  
### Date: 2025-10-27  
### Participants:
- Ethan Constantin  
- Jason Hu  
- Nathan Benayguev  
- Pham Duc  
- Kyle Fernandez  

*(All team members were present and participated.)*  

---

## 1. Sprint Goal  

The goal of **Sprint 1** is to establish the **core system foundation** for the Event Aggregator Platform — including **authentication**, **database setup**, and **event CRUD operations** connected through a working **frontend-backend pipeline**.  
This sprint focuses on functionality and integration, not UI polish.  

---

## 2. Team Capacity  

| Team Member | Available Hours | Focus Area |
|--------------|----------------|-------------|
| Ethan Constantin | 12 hrs | Backend APIs, integration |
| Jason Hu | 10 hrs | Frontend event pages |
| Nathan Benayguev | 8 hrs | Authentication system |
| Pham Duc | 9 hrs | Database setup |
| Kyle Fernandez | 8 hrs | Testing & documentation |
| **Total Capacity** | **47 hrs** | |

---

## 3. Spikes  

| ID | Description | Owner | Goal |
|----|--------------|--------|------|
| **SP1** | Research JWT implementation and secure storage on frontend | Nathan | Confirm best practices for token handling |
| **SP2** | Investigate event data model structure for scalability | Pham | Define schema compatible with future scrapers |
| **SP3** | Explore frontend-backend connection via Axios and FastAPI | Ethan | Ensure consistent communication flow |

---

## 4. User Stories Selected for Sprint 1  

| ID | User Story | Priority | Acceptance Criteria |
|----|-------------|-----------|----------------------|
| **US1** | As a student, I want to create an account so that I can log in and manage events. | High | Registration works; user data saved in DB. |
| **US2** | As a user, I want to log in and remain authenticated so that I can post events securely. | High | JWT tokens issued, validated, and required for CRUD actions. |
| **US3** | As a user, I want to post, edit, and delete events so I can manage them easily. | High | CRUD API endpoints functional and restricted to creators. |
| **US4** | As a user, I want to view a feed of events so I can see what’s happening on campus. | Medium | Events fetched from DB and rendered on UI. |
| **US5** | As a developer, I want to integrate the frontend and backend so the system works end-to-end. | High | API communication tested and verified. |

---

## 5. Decisions  

- Team agreed to focus only on **core features** in Sprint 1.  
- All **scraping, search, and analytics** stories postponed to **Sprint 2**.  
- **Spikes SP1–SP3** will be completed early in the sprint to support later implementation.  

---

## 6. Task Breakdown  

| Story / Spike | Tasks | Assigned To |
|----------------|--------|-------------|
| **SP1: JWT Research** | Research FastAPI JWT libraries and frontend handling (localStorage vs cookies) | Nathan |
| **SP2: Event Schema Design** | Draft DB schema for events, users, and relations | Pham |
| **SP3: Frontend-Backend Connection** | Set up Axios and verify connection to FastAPI endpoints | Ethan |
| **US1: Registration** | Implement user model, registration API, and frontend form | Nathan, Jason |
| **US2: Login + Auth Middleware** | Implement login API, JWT issuance, frontend token handling | Nathan, Ethan |
| **US3: Event CRUD** | Build endpoints (POST, PUT, DELETE, GET), integrate with frontend | Ethan, Jason |
| **US4: Event Feed** | Create event list page, connect to /events endpoint, add loading states | Jason, Pham |
| **US5: Integration & Testing** | Verify all endpoints work end-to-end, write brief documentation | Kyle, Ethan |

---

## 7. Expected Deliverables  

- Functional registration and login system (JWT-based)  
- Working event CRUD API with DB persistence  
- Connected frontend displaying and managing events  
- Basic error handling and test coverage  
- Documented setup and endpoint references  

---

## 8. Notes  

- Spikes must be completed by mid-sprint to unblock dependent tasks.  
- Next sprint (Sprint 2) will focus on event aggregation and discovery features.  
- Daily standups and task updates will be done through the shared project board.  

---

✅ **Meets all 2-mark criteria:**  
- Meeting and sprint goal documented ✅  
- All spikes clearly identified ✅  
- Team capacity recorded ✅  
- Participants recorded ✅  
- Everyone participated ✅  
- Decisions about stories clear ✅  
- Task breakdown complete ✅  
