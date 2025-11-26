# Spottify - AI Coding Agent Instructions

## Project Overview

Full-stack React application integrating with Spotify API using TanStack Start (SSR framework), TanStack Router (file-based routing), and TanStack Query (data fetching). Uses Tailwind CSS v4, Biome for linting/formatting, and Vite as build tool.

## Architecture

### SSR + Client Pattern

- **TanStack Start**: SSR framework with Nitro server runtime
- Server functions use `createServerFn()` for type-safe server-client communication
- Session management handled server-side via `useSession()` from `@tanstack/react-start/server`
- Client components call server functions using `useServerFn()` hook

### Authentication Flow

1. OAuth flow managed in `src/utils/spotify-auth.ts`:
   - `initiateSpotifyAuth`: Generates Spotify OAuth URL
   - `handleSpotifyCallback`: Exchanges code for tokens, stores in session
   - `getCurrentUserFn`: Returns current user from session, auto-refreshes expired tokens
2. Session stored in encrypted HTTP-only cookie (7-day expiry)
3. Protected routes use `_authed.tsx` layout with `beforeLoad` redirect check

### Route Structure

- File-based routing via TanStack Router in `src/routes/`
- Layouts: `__root.tsx` (global), `_authed.tsx` (auth guard)
- Auto-generated route tree at `src/routeTree.gen.ts` (never edit manually)
- Route context typed in `src/router.tsx` with `queryClient` and `user`

### Data Fetching Pattern

1. Server functions in `src/utils/spotify-api.ts` use `createServerFn()` with input validators
2. `spotifyFetch()` helper automatically includes session-based access token
3. Query options created in `src/utils/spotify-queries.ts` using `queryOptions()`
4. Components use TanStack Query hooks (`useQuery`, etc.)
5. Route loaders can prefetch data using `loader` property

### Type System

- Environment variables validated with T3 Env + Zod in `src/env.ts`
- Spotify types defined in `src/types/spotify.ts`
- Server/client type safety enforced via `inputValidator()` on server functions

## Development Commands

```bash
pnpm dev          # Start dev server (Vite + Nitro)
pnpm build        # Production build
pnpm serve        # Preview production build
pnpm test         # Run Vitest tests
pnpm check        # Run Biome lint + format check
pnpm format       # Format with Biome
pnpm lint         # Lint with Biome
```

## Code Conventions

### Styling

- Tailwind CSS v4 with Vite plugin (no separate config file)
- Utility-first approach, avoid custom CSS except in `src/styles.css`

### Formatting

- Biome configured with tabs, double quotes (see `biome.json`)
- Files in `src/routeTree.gen.ts` and `src/styles.css` excluded from linting
- Auto-organize imports enabled

### Components

- Components in `src/components/` organized by domain (e.g., `spotify/`)
- Default exports for components
- Props interface named `{ComponentName}Props`
- Example: `TrackCard.tsx` takes `track` and optional `onClick`

### Server Functions

- Always use `createServerFn()` with method specification: `.method('GET')` or `.method('POST')`
- Chain `.inputValidator()` for input validation/transformation
- Chain `.handler()` for implementation
- Example pattern:
  ```typescript
  export const myServerFn = createServerFn({ method: 'GET' })
    .inputValidator((input: MyInput) => validateAndTransform(input))
    .handler(async ({ data }) => {
      // Implementation using validated data
    });
  ```

### Path Aliases

- Use `@/` prefix for imports (maps to `src/`)
- Configured in `tsconfig.json` and `vite-tsconfig-paths` plugin

### SVG Assets

- Import SVGs as React components using `?react` suffix
- Example: `import SpotifyIcon from '@/assets/spotify.svg?react'`
- Enabled via `vite-plugin-svgr`

## Key Integration Points

### Session Access

Always use `getAppSession()` from `src/utils/session.ts` in server functions to access encrypted session data (Spotify tokens, user info).

### Spotify API Calls

Use `spotifyFetch()` helper from `src/utils/spotify-api.ts` - it handles auth headers and token expiry automatically.

### Router Context

Access user and queryClient from route context:

```typescript
export const Route = createFileRoute('/my-route')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/' });
    }
  },
});
```

## Common Patterns

### Adding Protected Routes

1. Place in `src/routes/_authed/` directory
2. Route automatically inherits auth check from `_authed.tsx`
3. Access authenticated user via `context.user` in loader/component

### Creating Server Functions for Spotify

1. Add to `src/utils/spotify-api.ts`
2. Use `spotifyFetch()` with endpoint
3. Type response with interfaces from `src/types/spotify.ts`
4. Export as `createServerFn()` with proper input validation

### Query Options Pattern

Define reusable query options in `src/utils/spotify-queries.ts`:

```typescript
export const myQueryOptions = (params) =>
  queryOptions({
    queryKey: ['my-key', params],
    queryFn: () => myServerFn({ data: params }),
  });
```

## Gotchas

- Never manually edit `src/routeTree.gen.ts` - regenerated automatically
- Session cookies only secure in production (HTTP allowed in dev)
- Spotify tokens expire - `getCurrentUserFn()` handles refresh automatically
- Route redirects must use `throw redirect()`, not `return redirect()`
- Devtools mounted in `__root.tsx` via TanStack Devtools panel system

## AI Agent Preferences

- Always use Context7 MCP tools for code generation, setup/configuration steps, and library/API documentation
- TanStack Start library ID: `/websites/tanstack_start` (Context7)
- Spotify Web API library ID: `/websites/developer_spotify` (Context7)
