# FedEMR COO Operating System

A local-first commercialization operating system for FedEMR Technologies Inc.

This is Version 0.1. It is intentionally focused on the first useful operating layer:

- Executive dashboard
- Tasks
- Commercial readiness
- Government readiness
- Customers and opportunities
- Risks
- Meetings
- Advisor recommendations
- Funding needs
- Roadmap
- IndexedDB local persistence
- JSON export/import
- Global search
- Universal Quick Add

No React. No Vue. No Angular. No framework circus.

## Tech stack

- HTML5
- CSS
- Vanilla JavaScript modules
- IndexedDB
- GitHub Pages compatible

## Folder structure

```text
coo-operating-system/
├── index.html
├── README.md
├── assets/
│   └── icons/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── sample-data.js
│   ├── scoring.js
│   ├── ui.js
│   └── utils.js
└── data/
    └── schema-notes.md
```

## Run locally

Because this app uses JavaScript modules, do not just double-click `index.html`. Use a local server.

### Option 1: Python

```bash
cd coo-operating-system
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

### Option 2: VS Code Live Server

1. Open the folder in VS Code.
2. Install the Live Server extension.
3. Right-click `index.html`.
4. Choose `Open with Live Server`.

## Deploy with GitHub Pages

1. Create or open the GitHub repository named `coo-operating-system`.
2. Upload all files and folders from this project.
3. Commit to the `main` branch.
4. Go to repository `Settings`.
5. Open `Pages`.
6. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
7. Save.
8. GitHub will provide the Pages URL after deployment.

## Data storage

The app stores data locally in the browser using IndexedDB under the database name:

```text
fedemr-coo-os
```

On first load, it seeds realistic sample data. After that, changes persist locally.

## JSON export/import

Use the sidebar buttons:

- `Export JSON`: downloads all local app data.
- `Import JSON`: replaces local app data with the uploaded JSON file.

Use exports as backups before making major edits.

## Scoring in Version 0.1

The app calculates:

- Commercial Readiness Score
- Government Readiness Score
- Company Health Score
- Risk Severity Score
- Funding Readiness Score
- Customer Pipeline Score

The logic is intentionally simple in V0.1, but isolated in `js/scoring.js` so it can become more advanced later.

## Important product principle

This is not a generic CRM or task manager. It is a commercialization operating system. Every record includes link fields so future versions can connect meetings, tasks, risks, customers, readiness items, funding needs, and roadmap milestones.

## Suggested next version

Version 0.2 should add real object linking, dashboard filters, saved views, and a weekly COO review workflow.
