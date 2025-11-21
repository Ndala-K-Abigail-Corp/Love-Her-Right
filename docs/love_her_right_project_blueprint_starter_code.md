# LoveHerRight — Web App Development Document

A complete planning and architecture document for building the **LoveHerRight** web application.

---

## 1. Overview

LoveHerRight is a relationship assistant web application designed to help men better understand, support, and care for their girlfriends by providing reminders, insights, cycle tracking, special date management, and personalized suggestions.

This document outlines the full structure, features, tech stack, and development workflow for the **web version** of the app.

---

## 2. Goals of the Web Version

* Build an MVP fast
* Test core features before building mobile apps
* Provide clean UI accessible on any browser
* Allow user accounts with synced data
* Support reminders (email or browser notifications)
* Provide partner insights and tracking tools

---

## 3. Final Tech Stack

### **Frontend**

* Next.js (React Framework)
* TypeScript
* TailwindCSS
* ShadCN UI components (Buttons, Cards, Inputs)

### **Backend / Data**

* Firebase Authentication
* Firebase Firestore (database)
* Firebase Cloud Functions (scheduled reminders)
* Firebase Hosting or Vercel

### **Calendar & UI Tools**

* FullCalendar or custom calendar
* Date-fns for date utilities

---

## 4. Features Breakdown

### **Dashboard**

* Today’s reminder
* Current cycle phase
* Days until next special event
* Quick actions

### **Reminders System**

* Create reminders (daily, weekly, custom)
* Email reminders
* On-screen pop-up reminders
* Firebase Cloud Functions trigger emails

### **Calendar System**

* Menstrual cycle tracking
* Special dates marking
* Cycle prediction (period, PMS, ovulation)

### **Favorites Section**

* Save favorite foods, flowers, colours, activities, hobbies, etc.
* Category grouping
* Add notes

### **Tasks / To-Do List**

* Gift ideas
* Acts of service
* Date planning tasks
* Priority levels

### **Partner Profile**

* Name
* Birthday
* Preferences
* Important notes

---

## 5. Database Schema (Firestore)

### **users** collection

Stores each user’s main account and partner details.

```
users/{userId}
  - name
  - email
  - createdAt
  - settings: { timezone }
  - partner: {
      name,
      birthday,
      notes,
      favouritesCount
    }
```

### **favorites** subcollection

```
users/{userId}/favorites/{favId}
  - category
  - title
  - notes
  - createdAt
```

### **specialDays** subcollection

```
users/{userId}/specialDays/{dayId}
  - title
  - date
  - repeat
  - reminderOffsets: []
```

### **tasks** subcollection

```
users/{userId}/tasks/{taskId}
  - title
  - description
  - dueDate
  - priority
  - done
```

### **cycles** subcollection

```
users/{userId}/cycles/{cycleId}
  - startDate
  - cycleLength
  - periodLength
  - notes
```

### **reminders** subcollection

```
users/{userId}/reminders/{reminderId}
  - title
  - message
  - type
  - schedule
  - enabled
```

---

## 6. Page Structure (Next.js App Router)

```
/app
  /dashboard
  /reminders
  /calendar
  /favorites
  /tasks
  /settings
  /auth (login, signup)
/components
/lib
  firebase.ts
  reminders.ts
  cycle.ts
/styles
```

---

## 7. UI Components Needed

* Navbar
* Sidebar menu
* Cards (summary cards)
* Buttons (primary, ghost)
* Input fields
* Modal windows
* Calendar widget
* Reminder creation form
* Favorites list grid
* Task list with checkboxes

---

## 8. Reminder System Logic

### **For the MVP**

Use email reminders triggered by Firebase Cloud Functions.

Flow:

1. User creates reminder
2. Reminder stored in Firestore
3. Cloud Function checks schedule daily/hourly
4. Sends email via SendGrid or Firebase Extensions

---

## 9. Development Timeline

### **Week 1 — Setup**

* Initialize Next.js project
* Connect Firebase
* Set up Auth (login, register)
* Build layout, navbar, and basic dashboard

### **Week 2 — Core Features**

* Favorites CRUD
* Tasks CRUD
* Partner profile page

### **Week 3 — Advanced Features**

* Cycle tracking + calendar
* Special days + countdown
* Reminder creation + scheduling logic

### **Week 4 — Testing & Deployment**

* Testing components
* Deploy to Vercel or Firebase Hosting
* Bug fixes & polishing UI

---

## 10. Checklist Before Going Live

* [ ] User authentication
* [ ] Firestore database rules secured
* [ ] Basic UI complete
* [ ] Cycle calculations working
* [ ] Email reminders tested
* [ ] Mobile responsive layout
* [ ] Landing page done
* [ ] Deployed and tested

---

## 11. Next Steps

If needed, we can add:

* Mobile version (React Native)
* AI message suggestions
* Mood predictions
* Partner analytics page
* Chrome extension for quick reminders

---

End of Document.
