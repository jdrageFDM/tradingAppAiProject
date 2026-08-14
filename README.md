# AI Trading App Frontend

This is a web application that lets users buy and sell stocks through a clean, easy-to-use interface. Think of it as the visual experience for an AI-powered trading platform.

## What This App Does

This application provides a complete stock trading experience with several pages:

- **Login Page** - Securely access your account with a username and password
- **Dashboard** - See an overview of your investments and market highlights at a glance
- **Portfolio** - View all your current stock holdings and how they're performing
- **Trade** - Buy and sell stocks with an intuitive order form
- **Market** - Explore trending stocks and manage your watchlist
- **Account** - Manage your profile settings and account information

## Getting Started

### Before You Begin

Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org).

### Installation

1. Open your terminal or command prompt
2. Navigate to this project folder
3. Run this command to install all necessary files:

```bash
npm install
```

This might take a minute or two the first time.

### Running the App

To start working with the app during development:

```bash
npm run dev
```

This will start a local server. Open your browser to the URL shown in your terminal (usually `http://localhost:5173`).

### Creating a Version for Production

When you're ready to share the app with real users:

```bash
npm run build
```

This creates an optimized version. You can preview it with:

```bash
npm run preview
```

## Test Login Credentials

For development and testing, use these credentials:

- **Email:** `jdrage@gmail.com`
- **Password:** `Password1`

You'll see a "Remember me" checkbox—check it to stay logged in after closing your browser.

## How It Works Behind the Scenes

### The Building Blocks

The app is built using modern web technologies:
- **React** - Makes the interface interactive and fast
- **TypeScript** - Helps catch coding mistakes before they happen
- **Vite** - A fast tool that bundles everything together

### What's Inside the Project

```
src/
├── pages/           - The different screens users see
├── components/      - Reusable parts of the interface (navigation, sidebars, etc.)
├── context/         - Manages login information and user sessions
├── services/        - Handles communication with the server
└── App.tsx          - Main application file that controls everything
```

## What Needs to Be Built Next

This app currently uses mock data and is ready for a real backend (the server that stores all the actual data). When connecting to the real backend, you'll need these features:

- **Portfolio Data** - Fetch user's actual stock holdings
- **Market Information** - Get real stock prices and market trends
- **Watchlist** - Save and retrieve user's watched stocks
- **Orders** - Submit real buy/sell requests to the server

## Questions or Issues?

If something isn't working or you need help, check the files in the `src/` folder—they're well-organized and documented. Start with `src/App.tsx` to understand how the application flows.
