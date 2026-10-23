# TraffiQ — Frontend

Regional AI-based Traffic Management System frontend application.

## Overview

TraffiQ is an AI-powered regional traffic management platform. This repository contains the frontend application built with React and Vite.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** JavaScript (`.jsx`, `.js`)
- **Styling:** Standard CSS (`.css`)

## Project Structure

```text
src/
├── components/     # Reusable UI components
├── pages/          # View/screen components
├── data/           # Static datasets and configuration
├── styles/         # Global and modular CSS stylesheets
│   ├── global.css  # Typography, resets, CSS variables, viewport settings
│   └── App.css     # App-level styling
├── App.jsx         # Root application component
└── main.jsx        # React application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 18+ or 20+ recommended)
- npm (version 9+ or 10+)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

To run the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

To build the application for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```
