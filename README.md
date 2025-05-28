# Employee Stock Dashboard PWA

A Progressive Web App (PWA) for employees to view and manage their stock information.

## Features

- **Responsive UI optimized for mobile devices**
- **Full PWA Support:** 
  - Offline support
  - Add to home screen
  - Push notifications
- **Secure Authentication:** Login system for employees
- **Stock Information:** 
  - Stock balance summary
  - Vesting schedules
  - Transaction history
- **Backend Integration:** Integration with REST API

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- PWA features via vite-plugin-pwa

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a .env file based on .env.example:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with ESLint
- `npm run ci` - Run the full CI pipeline (build + format + lint + test)

## PWA Features

This application is configured as a Progressive Web App with:

- Installable on mobile devices and desktops
- Works offline using service workers
- Responsive design with mobile-first approach
- Push notifications support
- Full screen, app-like experience

## Project Structure

- `src/` - Application source code
  - `components/` - Reusable React components
  - `pages/` - Page-level components and routing
  - `services/` - API calls and business logic
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions and helpers
  - `assets/` - Static files (images, icons, etc.)
- `public/` - Public static files and PWA assets
- `tests/` - Unit and integration tests

## Demo Credentials

For demo purposes, use:
- Email: demo@example.com
- Password: password
