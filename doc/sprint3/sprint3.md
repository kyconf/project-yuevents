# 🚀 Sprint 3 Planning Meeting

**Project:** Event Aggregator Platform  
**Sprint:** Sprint 3 (Weeks 6–7)  
**Date:** 2025-11-17  

---

## 👥 Participants

| Team Members |
| ------------- |
| Ethan Constantin |
| Jason Hu |
| Nathan Benayguev |
| Pham Duc |
| Kyle Fernandez |

*(All team members were present for planning.)*

---

## 🎯 Sprint Goal

The goal of **Sprint 3** is to introduce **club profiles**, **search functionality**, and **event editing/deletion**, while expanding user-generated content with **reviews/comments**.  
This sprint focuses on improving overall platform usability and management tools, while strengthening security and data integrity.

---

## 🧮 Team Capacity

| Team Member | Available Hours | Focus Area |
|--------------|----------------|-------------|
| Ethan Constantin | 1.5 hrs | Aggregator & security fixes |
| Jason Hu | 1.5 hrs | Club profiles & UI pages |
| Nathan Benayguev | 1.67 hrs | Backend search & security |
| Pham Duc | 1.5 hrs | Database schema updates |
| Kyle Fernandez | 1.69 hrs | Event editing/deletion & reviews UI |
| **Total Capacity** | **7.86 hrs** | |

---

## 🔍 Spikes

| ID | Description | Owner | Goal |
|----|-------------|--------|------|
| **SP7** | Investigate best method for secure event editing/deletion permissions | Nathan | Ensure only event creators or admins can modify/delete events |
| **SP8** | Explore search algorithms for direct text matches | Kyle | Determine optimal filtering & query methods |
| **SP9** | Investigate schema updates for reviews/comments system | Pham | Finalize structure for user-generated content |

---

## 📜 User Stories Selected for Sprint 3

| ID | User Story | Priority | Acceptance Criteria |
|----|-------------|-----------|----------------------|
| **YE-51** | As a developer, I want security fixes implemented so that the system handles authentication and permissions safely. | High | Sensitive routes protected, tokens verified reliably. |
| **YE-20** | As a student, I want to view club profiles so I can learn more about the organizers and their events. | High | Profile pages render with club info and upcoming events. |
| **YE-2** | As a student, I want to search for events by title or keywords so I can quickly find relevant events. | High | Searching keyword returns direct matched events from DB. |
| **YE-4** | As a system, I want to automatically ingest events from external sources so that the aggregator populates events without manual posting. | Medium | Aggregator endpoint accepts event input & stores properly. |
| **YE-9** | As a club executive, I want to edit events I posted so that I can correct mistakes or update details. | Medium | Edit form loads event data and saves new values to DB. |
| **YE-10** | As a club executive, I want to delete events so that I can remove outdated or incorrect postings. | Medium | Deletion only possible by authorized users. |
| **YE-17** | As a student, I want to leave comments or reviews on events so that I can share my thoughts or feedback. | Low | Users can post review text linked to event and user. |

---

## ✅ Decisions

- The team will begin Sprint 3 by completing **YE-51 Security Fixes**, ensuring a stable and secure base before adding new features.
- **YE-20 Club Profiles** will be built using existing event data, requiring minor schema additions for social links/logos.
- **YE-2 Search Events** uses direct text matching for simplicity; fuzzy search deferred to future sprints.
- **YE-4 Post Event (Aggregator)** will be connected to the partially completed work from Sprint 2, but the focus is solely on the **backend ingestion endpoint**, not the Discord scraper UI.
- **YE-9 / YE-10 Event Editing & Deletion** require new permission checks; Nathan will finalize rules via spike SP7.
- **YE-17 Reviews/Comments** will begin with a simple text-based comment system without upvotes or threading.
- No UI redesigns will be attempted this sprint.
- Daily standups continue; team updates the project board after each work session.

---

## 🧩 Task Breakdown

| Story ID | Task | Assigned To |
|-----------|------|--------------|
| **YE-51** | Patch security vulnerabilities and enforce route protection | Nathan |
| **YE-20** | Implement backend model for club profiles | Pham |
| **YE-20** | Create UI page for viewing club profiles | Jason |
| **YE-2** | Implement search query endpoint for direct matches | Nathan |
| **YE-2** | Add frontend search bar and event result display | Kyle |
| **YE-4** | Build aggregator ingestion endpoint | Ethan |
| **YE-9** | Build event editing form and connect it to backend | Kyle |
| **YE-10** | Implement secure deletion logic | Kyle |
| **YE-17** | Create reviews/comments table and backend API | Pham |
| **YE-17** | Add frontend UI component for posting/displaying comments | Jason |

---

## 🎯 Expected Deliverables

- **Security Fixes (YE-51)**  
  All protected routes verified with token checks.  
  Editing/deleting restricted to owners/admins.  
  No accidental privilege escalation.

- **Club Profiles (YE-20)**  
  Backend schema for club information.  
  Pages showing club name, description, contact, and event list.

- **Event Search (YE-2)**  
  Search page with direct keyword matching.  
  Results appear instantly from the API.

- **Event Aggregator Endpoint (YE-4)**  
  Backend route that accepts event payloads from external scrapers.  
  Validates fields and stores events in unified schema.

- **Event Editing (YE-9)**  
  Club executives can modify previously created events.  
  Updated data saved and reflected across the UI.

- **Event Deletion (YE-10)**  
  Executives or admins can delete events securely.  
  Deleted events removed from frontend and backend.

- **Reviews & Comments (YE-17)**  
  Simple comment model tied to event and user.  
  UI for posting and viewing comments under events.

- **End-to-End System Stability**  
  All new features tested for integration with authentication and event data flows.

---

## 📝 Notes

- The team will continue using feature branches and PR reviews.  
- Avoid merging late on the final day of the sprint.  
- Updated DB schema must be documented in `/doc/schema_changes.md`.  
- The scraper portion (Discord bot) will continue next sprint; only aggregator ingestion is in scope here.

