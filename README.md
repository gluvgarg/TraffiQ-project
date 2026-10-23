# TraffiQ — AI Adaptive Traffic Signal System (Frontend)

Operational regional traffic management interface built with React, Vite, and Leaflet.

## Overview

TraffiQ provides an interactive, map-first operations console for monitoring regional traffic corridors and candidate adaptive signal locations. This frontend application focuses on the pilot monitoring area in **Connaught Place, Central Delhi**.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Mapping:** Leaflet & React-Leaflet (OpenStreetMap raster tiles)
- **Language:** JavaScript (`.jsx`, `.js`)
- **Styling:** Standard CSS (`.css`)

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx               # Horizontal operations navigation bar
│   ├── MapView.jsx              # Leaflet geographic map container & J1/J2 markers
│   └── JunctionDetailsPanel.jsx # Compact junction telemetry details panel
├── pages/
│   ├── OverviewPage.jsx         # Main operational workspace with map and local search
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

## Navigation & Operational Views

- **Overview:** Main operations workspace featuring an interactive OpenStreetMap canvas focused on Central Delhi, local junction search, compact circular markers (`J1`, `J2`), and a collapsible details panel.
- **Junctions:** Searchable catalog of registered candidate junctions with verified coordinates and a direct "View on map" navigation action.
- **Analytics:** Clean empty state communicating that traffic performance metrics will display when simulation or backend telemetry is integrated.
- **Emergency Events:** Clean emergency monitoring empty state explaining that green corridor status will appear once emergency dispatch feeds are connected.

## Pilot Candidate Junctions

| Code | Junction Name | Corridor | Verified Coordinates | Verification Source |
| :--- | :--- | :--- | :--- | :--- |
| **J1** | Barakhamba Road – Tolstoy Marg | Barakhamba Rd | `28.6299° N, 77.2248° E` | OpenStreetMap Node & Road Intersection |
| **J2** | Janpath – Tolstoy Marg | Janpath | `28.6264° N, 77.2193° E` | OpenStreetMap Node 5056205486 / Parivahan Survey |

## Getting Started

### Prerequisites

- Node.js (v18+ or v20+ recommended)
- npm (v9+ or v10+)

### Installation

```bash
npm install
```

### Development

Run the local development server:

```bash
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
