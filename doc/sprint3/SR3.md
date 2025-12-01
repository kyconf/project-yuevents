# 🌀 Sprint 3 Retrospective Meeting

**Date:** December 1, 2025
**Sprint Duration:** November 17 – December 1, 2025
**Sprint Goal:** Introduce club profiles, search functionality, event editing/deletion, and user reviews.

---

## 👥 Participants

| Team Members | Role | Present |
| :--- | :--- | :---: |
| Ethan Constantin | Aggregator & Backend | ✅ |
| Jason Hu | Frontend (Club Profiles/Calendar) | ✅ |
| Nathan Benayguev | Security & Search | ✅ |
| Trung Duc Pham | Database & Reviews | ✅ |
| Kyle Fernandez | Frontend (Search/Event Mgmt) | ✅ |

---

## 🔍 Review of Sprint 2 Action Items
*Did we follow through on our specific improvements from the last sprint?*

- **[x] Finalize Scraper Architecture:** Completed via **YE-4** (Aggregator Ingestion); the backend endpoint is now ready to receive external events.
- **[ ] Add E2E Tests:** ❌ **Missed.** We focused heavily on feature delivery (Club CRUD & Reviews) and did not create specific tickets for Playwright/Cypress tests this sprint.
- **[x] Secure Event Deletion:** Completed via **YE-10** and **YE-51**; logic is now implemented to ensure only authorized users can delete.

---

## 📋 Completed Work

### **Club Management (Major Release)**
- **YE-20** Club Profiles (UI & Backend)
- **YE-54** Club Creation
- **YE-55** Club Editing
- **YE-56** Club Deletion

### **Event Management & Discovery**
- **YE-2** Search Events (Direct text matching)
- **YE-9** Event Editing
- **YE-10** Event Deletion
- **YE-53** Connect calendar endpoint to calendar page
- **YE-57** Make Calendar endpoint

### **Social & Engagement**
- **YE-17** Reviews/Comments Frontend
- **YE-59** Reviews/Comments Backend

### **Infrastructure & Security**
- **YE-4** Post Event (Aggregator Ingestion Endpoint)
- **YE-51** Security fixes (Protected routes/Token verification)

---

## ✅ Practices to Continue

- **High Velocity on Feature Work:** We cleared the entire board, including "To Do" and "In Progress" items, effectively delivering 4 major feature sets (Clubs, Search, Reviews, Security) in one cycle.
- **Splitting Frontend/Backend Tickets:** Breaking "Reviews" into YE-17 (Frontend) and YE-59 (Backend) allowed Ethan and Pham to work in parallel effectively.
- **Immediate Security Patching:** Prioritizing YE-51 early in the sprint ensured our new edit/delete features were secure by default.

---

## 🆕 New Practices to Try in Sprint 4

- **Enforce Testing Tickets:** Since we missed E2E testing this sprint, we must create dedicated tickets for it in Sprint 4 (e.g., "Write test for Club Creation").
- **UI Freeze:** We have added a lot of pages (Club Profiles, Search, Reviews). We should spend the first 3 days of Sprint 4 unifying the styling (CSS/Tailwind) so it looks consistent.

---

## ⚠️ Practices to Stop or Adjust

- **Overloading the "Done" Column:** We finished everything (great!), but some items like "Search Events" (YE-2) were marked "To Do" on the board until the very end. We need to move cards to "In Progress" sooner to reflect real status.
- **Neglecting Tech Debt:** We pushed a lot of code this sprint. We need to verify if the "Direct Match" search (YE-2) is sufficient or if we need to refactor for Fuzzy Search immediately.

---

## 🌟 Best and Worst Experiences

| Type | Description |
| :--- | :--- |
| **Best Experience** | **Full Club CRUD:** Managing to implement Creation, Editing, Deletion, *and* Viewing for Clubs (YE-54/55/56/20) fully in one sprint was a huge win. |
| **Worst Experience** | **Testing Gap:** Realizing at the end of the sprint that while we have many new features (Reviews, Clubs), we have zero automated tests ensuring they don't break next week. |

---

## 📁 Next Steps for Sprint 4

1.  **Testing catch-up:** Write E2E tests for the new Club Creation and Login flows.
2.  **Discord Integration:** Connect the Scraper (built in Sprint 2) to the Aggregator Endpoint (YE-4) built this sprint.
3.  **Search Improvement:** Upgrade the search from direct text matching to include category filtering or fuzzy matching.

---

**Recorded by:** Ethan Constantin