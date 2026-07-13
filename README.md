# Algorail Frontend

Algorail Frontend is a Vite + React + TypeScript application for a railway traffic control experience. It includes a marketing landing page, an operations dashboard, AI-driven recommendation cards, scheduling views, and a control sidebar for live station management.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Sonner for toast notifications

## Project Structure

- `src/pages/Index.tsx` - landing page content
- `src/pages/Dashboard.tsx` - live operations dashboard
- `src/components/sections/` - landing page sections
- `src/components/dashboard/` - dashboard widgets and panels
- `src/components/ui/` - shared UI primitives
- `src/data/` - mock data used by the dashboard
- `src/hooks/` - reusable hooks

## Getting Started

Run all commands from the `frontend` folder:

```powershell
cd frontend
npm install
npm run dev
```

Open the local Vite URL printed in the terminal, usually `http://localhost:8080`.

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - type-check and build the production bundle
- `npm run preview` - preview the production build locally

## Features

- Railway operations dashboard with live metrics
- AI algorithm recommendations panel
- Quick actions for operational control
- Schedule and network schematic views
- Landing page sections for product overview

## Notes

- The app is intended to be opened from the `frontend` directory.
- If you see a module error for `src/App.tsx`, make sure that file exists and is exported correctly, since `src/main.tsx` currently imports it as the root component.
- If you add new UI libraries, install them with npm and commit the updated `package.json` and `package-lock.json`.

## Development Tips

- Keep dashboard data in `src/data/mockData.ts` if you want to extend the mock experience.
- Place reusable UI changes in `src/components/ui/`.
- Keep page-level layout in `src/pages/` and reusable view logic in `src/components/dashboard/`.
