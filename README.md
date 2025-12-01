# Spottify

A Spotify clone built with React, featuring server-side rendering and real-time music browsing.

## Tech Stack

- **TanStack Start** - React SSR framework
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS v4** - Styling
- **Spotify Web API** - Music data
- **Biome** - Linting and formatting

## Prerequisites

- Node.js 18+ and pnpm
- Spotify Developer Account

## Setup

1. **Clone and install dependencies:**

```bash
pnpm install
```

2. **Configure Spotify API:**

- Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- Add `http://localhost:3000/callback` to Redirect URIs
- Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

- Fill in your Spotify credentials in `.env`:

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
SESSION_SECRET=generate_a_random_string
```

3. **Start development server:**

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm serve        # Preview production build
pnpm test         # Run tests
pnpm check        # Lint and format check
pnpm format       # Format code
pnpm lint         # Lint code
```

## Features

- Spotify OAuth authentication
- Server-side rendering
- Type-safe API routes
- Automatic token refresh
- Protected routes

## Project Structure

```
src/
├── routes/          # File-based routes
├── components/      # React components
├── utils/           # API utilities and helpers
├── types/           # TypeScript definitions
└── assets/          # Static assets
```

## License

MIT
