# Polls Frontend (Next.js + Tailwind v4)

A simple polls application frontend built with Next.js App Router, Tailwind CSS v4, and TypeScript.

## Features
- Dynamic routes with App Router (`app/polls/[id]`)
- Server-rendered and client components
- API client with Axios and environment-based base URL
- Tailwind v4 zero-config with PostCSS
- Optimistic voting UI with rollback

## Requirements
- Node.js 18+ (recommended LTS)

## Getting Started
Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.local .env.local.example # optional: share template
```

Edit `.env.local` and set your API base URL:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts
- `npm run dev`: Start Next.js (Turbopack)
- `npm run build`: Production build
- `npm start`: Start production server

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Axios

## Project Structure
```
app/
  page.tsx                 # Polls list (responsive grid)
  polls/[id]/page.tsx      # Poll detail page
src/
  components/
    polls/
      card-polls.tsx       # Poll summary card (client, optimistic vote)
      poll-detail-client.tsx # Client detail table (optimistic vote)
    ui/                    # UI primitives
  services/
    http.tsx               # Axios instance (uses env base URL)
    polls.tsx              # Polls API (getAll, getById, vote)
  types/
    polls.tsx              # Type definitions
```

## Tailwind
- Config-less v4 via `postcss.config.mjs` and `app/globals.css` (`@import "tailwindcss"`).
- IntelliSense: workspace `.vscode/settings.json` enables suggestions inside `className` and `cn/clsx/cva`.

## Environment
- `NEXT_PUBLIC_API_BASE_URL` is required by the Axios client (`src/services/http.tsx`).
- Update and restart the dev server after changing env values.

## Notes
- The detail page can fetch on the server or client. Current setup uses a server wrapper page and a client table for dynamic fetching and optimistic updates.
