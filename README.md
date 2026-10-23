# Voltwise EMS — Frontend Prototype

A responsive Industrial Energy Management System (EMS) frontend built with React, JavaScript, Vite, Recharts and Lucide icons.

## Requirements

- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Included pages

- Overview dashboard
- Meters
- Alerts
- Reports with CSV export
- Users
- Settings

## Important prototype limitations

- All energy readings, meter statuses, alerts and users are simulated in `src/data/mockData.js`.
- The refresh button only updates the simulated sample values.
- Alert acknowledgement and settings changes are held in React state and are not persisted after a refresh.
- The users page is display-only; no authentication or user-management API exists yet.
- There is no backend, database, JWT, WebSocket connection, or hardware integration in this prototype.
- Do not use the simulated readings for operational or billing decisions.

## Project structure

```text
src/
├── components/
│   ├── AppShell.jsx
│   ├── Header.jsx
│   ├── MetricCard.jsx
│   ├── PageHeader.jsx
│   ├── Sidebar.jsx
│   ├── StatusBadge.jsx
│   └── charts/
│       ├── ConsumptionChart.jsx
│       └── DemandChart.jsx
├── data/
│   └── mockData.js
├── pages/
│   ├── AlertsPage.jsx
│   ├── DashboardPage.jsx
│   ├── MetersPage.jsx
│   ├── ReportsPage.jsx
│   ├── SettingsPage.jsx
│   └── UsersPage.jsx
├── App.jsx
├── main.jsx
└── styles.css
```
