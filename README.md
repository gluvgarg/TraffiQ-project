# TraffiQ — AI Adaptive Traffic Signal System (Frontend)

Operational regional traffic management interface built with React, Vite, and Mapbox GL JS.

## Overview

TraffiQ provides an interactive, contained operations dashboard for monitoring regional traffic corridors and candidate adaptive signal locations. This frontend application focuses on the pilot monitoring area in **Connaught Place, Central Delhi**.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Mapping:** Mapbox GL JS (`streets-v12` vector style)
- **Language:** JavaScript (`.jsx`, `.js`)
- **Styling:** Standard CSS (`.css`)

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx               # Horizontal operations navigation bar
│   ├── MapView.jsx              # Contained Mapbox GL JS map container with J1/J2 markers
│   └── JunctionDetailsPanel.jsx # Two-state junction panel (candidate list / inspected details)
├── pages/
│   ├── OverviewPage.jsx         # Contained two-column operational dashboard (65% map / 35% panel)
│   ├── JunctionsPage.jsx        # Pilot candidate junctions table and map links
│   ├── AnalyticsPage.jsx        # Traffic performance analytics empty state
│   └── EmergencyEventsPage.jsx  # Emergency corridor and preemption monitoring empty state
├── data/
│   └── junctions.js             # Verified coordinates and candidate junction dataset
├── styles/
│   ├── global.css               # Typography, resets, color tokens, viewport settings
│   └── App.css                  # Layout, navbar, map, table, and panel styles
├── App.jsx                      # Root application component with view routing
└── main.jsx                     # Application entry point
```

## Dashboard Layout & Operations

- **Overview:** Professional two-column operations layout:
  - **Left (~65%):** Contained Mapbox interactive map (`streets-v12` style) with navigation controls, street-level zoom, and compact `J1` and `J2` markers with hover tooltips.
  - **Right (~35%):** Dynamic junction panel that shows a compact list of monitored candidate junctions by default, and expands into full telemetry readiness details when a junction or marker is selected.
- **Junctions:** Searchable catalog of registered candidate junctions with verified coordinates and a direct "View on map" navigation action.
- **Analytics & Emergency Events:** Honest, professional empty states explaining telemetry and emergency service integration readiness.

## Pilot Candidate Junctions

| Code | Junction Location | Area | Coordinates | Verification Source |
| :---: | :--- | :--- | :--- | :--- |
| **J1** | Barakhamba Road – Tolstoy Marg | Connaught Place Outer / Barakhamba | `28.6299° N, 77.2248° E` | OpenStreetMap (Intersection crossing) |
| **J2** | Janpath – Tolstoy Marg | Janpath Commercial Corridor | `28.6264° N, 77.2193° E` | OpenStreetMap Node 5056205486 / Parivahan Survey |

## Getting Started

### Prerequisites

- Node.js (v18+ or v20+ recommended)
- npm (v9+ or v10+)
- Mapbox Public Access Token

### Environment Configuration

Create a local `.env.local` file in the root directory (based on `.env.example`):

```bash
cp .env.example .env.local
```

Define your Mapbox public token:

```env
VITE_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token_here
```

*(If no token is configured, the interface displays an informative configuration notice.)*

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Production Build & Linting

```bash
# Run linter
npm run lint

# Build production bundle
npm run build

# Preview production build
npm run preview
```
