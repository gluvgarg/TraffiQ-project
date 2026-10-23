# TraffiQ — AI Adaptive Traffic Signal System (Frontend)

Operational regional traffic management interface built with React, Vite, and Mapbox GL JS for regional traffic-control operators.

## Overview

TraffiQ provides an interactive, contained operations dashboard for regional traffic operators to inspect signal states across monitored corridors. The current interface operates in demonstration mode using synthetic pilot records for **Connaught Place, Central Delhi**.

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
│   ├── MapView.jsx              # Mapbox GL JS map with vertical 3-lamp signal markers
│   └── JunctionDetailsPanel.jsx # Operator panel: Monitored signal list & synthetic telemetry inspector
├── pages/
│   ├── OverviewPage.jsx         # Contained two-column operational dashboard (65% map / 35% panel)
│   ├── JunctionsPage.jsx        # Pilot candidate junctions table and map links
│   ├── AnalyticsPage.jsx        # Traffic performance analytics empty state
│   └── EmergencyEventsPage.jsx  # Emergency corridor and preemption monitoring empty state
├── data/
│   ├── junctions.js             # Verified geographic coordinates and regional boundary data
│   └── demoTrafficData.js       # Synthetic demo signal records (J1, J2) with active phases and timers
├── styles/
│   ├── global.css               # Typography, resets, color tokens, viewport settings
│   └── App.css                  # Layout, navbar, map, signal markers, and operator panel styles
├── App.jsx                      # Root application component with view routing
└── main.jsx                     # Application entry point
```

## Operator Dashboard & Traffic Signal Markers

- **Clear Traffic-Signal Markers:**
  - Compact vertical traffic-light housing with red, amber, and green lamps.
  - Identification badge (`J1`, `J2`) pinned directly to the signal head.
  - Active simulated phase illuminated with glowing green lamp (dimmed red and amber).
  - Selected signal marker highlights with a restrained blue accent ring and elevation.
- **Operator Signal Panel:**
  - **Default View:** Compact list of monitored signals with active phase previews (`North–South GREEN 18s`, `East–West GREEN 12s`) and `DEMO` badges.
  - **Selected View:** Detailed inspection displaying Junction ID and road names, `DEMO DATA` badge, Control Mode (`AI (DEMO)`), Simulated Signal Phase, Remaining Green Time, Vehicles Waiting, and Estimated Queue Length.
  - Includes a `← Back to junction list` action to return to overview.

## Synthetic Demonstration Records (`src/data/demoTrafficData.js`)

| Code | Junction Location | Control Mode | Active Simulated Phase | Green Time | Vehicles Waiting | Queue Length |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **J1** | Barakhamba Road – Tolstoy Marg | `AI (DEMO)` | North–South GREEN | `18 seconds` | `12` | `42 metres` |
| **J2** | Janpath – Tolstoy Marg | `AI (DEMO)` | East–West GREEN | `12 seconds` | `7` | `25 metres` |

*Note: These records are synthetic demonstration values for interface testing. Physical signal telemetry is not connected.*

## Getting Started

### Prerequisites

- Node.js (v18+ or v20+ recommended)
- npm (v9+ or v10+)
- Mapbox Public Access Token

### Environment Configuration

Configure `VITE_MAPBOX_ACCESS_TOKEN` in `.env.local` (copied from `.env.example`):

```bash
cp .env.example .env.local
```

```env
VITE_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token_here
```

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
