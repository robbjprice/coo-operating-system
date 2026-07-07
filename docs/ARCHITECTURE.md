# Architecture

## Overview

The FedEMR COO Operating System is a local-first executive operating system designed to help FedEMR Technologies commercialize health AI technologies.

The application runs entirely in the browser using vanilla HTML, CSS, and JavaScript. All user data is stored locally using IndexedDB. Future versions may optionally synchronize with cloud services, but cloud functionality is never required for core operation.

---

## Core Principles

- Local-first
- Fast and lightweight
- No framework dependencies
- Modular architecture
- Offline capable
- AI-ready
- JSON import/export
- Secure by design

---

## Folder Structure

```
/
├── index.html
├── css/
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── ui.js
│   ├── scoring.js
│   ├── utils.js
│   └── sample-data.js
├── assets/
├── data/
└── docs/
```

---

## Primary Layers

Presentation Layer
- HTML
- CSS
- User interface

Application Layer
- Navigation
- Business logic
- Scoring engine

Data Layer
- IndexedDB
- Import/export
- Future cloud synchronization

---

## Design Goals

The architecture must support:

- Executive dashboard
- Commercial readiness
- Government readiness
- Customers
- Funding
- Risks
- Meetings
- Documents
- Advisors
- Roadmap
- AI recommendations

without requiring architectural redesign.
