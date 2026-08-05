# AI Trading App Frontend

This repository contains a React + TypeScript frontend scaffold for a stock trading application. It includes a login flow, dashboard, portfolio, trade, market, and account pages, plus a mocked login experience for local development.

## Project overview

- **Frameworks:** React, TypeScript, Vite
- **Routing:** React Router v6
- **Authentication:** Local mock login with a persistent `Remember me` option
- **API integration:** Fetch stubs for backend endpoints
- **UI:** Dashboard and trading panel layout with responsive styling

## Pages and routes

- `/login` - Login screen for authenticated access
- `/dashboard` - Main portfolio dashboard
- `/portfolio` - Holdings and portfolio insights
- `/trade` - Place trades and build orders
- `/market` - Market movers and watchlist ideas
- `/account` - Account summary and settings

## Login credentials

Use the following credentials for local development:

- **Email:** `jdrage@gmail.com`
- **Password:** `Password1`

## Key files

- `src/App.tsx` - Application routing and protected route wrapper
- `src/main.tsx` - App bootstrap with router and auth provider
- `src/context/AuthContext.tsx` - Mock authentication provider and persistence logic
- `src/pages/Login.tsx` - Login form with remember-me support
- `src/pages/Dashboard.tsx` - Dashboard layout and market data panels
- `src/services/tradingApi.ts` - API fetch stubs for backend data
- `src/index.css` - Global styling and layout

## Backend endpoint placeholders

The frontend currently expects these API endpoints to exist, but falls back to static content and errors when unavailable:

- `GET /api/portfolio`
- `GET /api/watchlist`
- `GET /api/market/movers`
- `POST /api/order`

## Build and run

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Repository cleanup

This repository is ready to share on GitHub. Generated build output and local dependency folders are ignored by `.gitignore`.

## Notes

- The login flow is mocked for now; the real backend authentication can be added later.
- The top-right profile area in the navbar reflects the current logged-in user.
- The application uses Vite and expects `index.html` in the project root.
