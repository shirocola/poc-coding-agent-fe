# Frontend Project Documentation

## Code Standards

### Required Before Each Commit
- Run `npm run format` before committing any changes to ensure proper code formatting.
- This will run Prettier and ESLint on all TypeScript files to maintain consistent style.

### Development Flow
- Build: `npm run build`
- Test: `npm test`
- Full CI check: `npm run ci` (includes build, format, lint, test)

## Repository Structure

- `src/`: Main application source code
  - `components/`: React components
  - `pages/`: Page-level components and routing
  - `services/`: API calls and business logic
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions and helpers
  - `assets/`: Static files (images, icons, etc.)
- `public/`: Static files and PWA assets (manifest, icons, etc.)
- `tests/`: Unit and integration tests (mirrors `src/` structure)
- `docs/`: Documentation and API specs

## Key Guidelines

1. Follow React, TypeScript, and Vite best practices.
2. Maintain existing code structure and organization.
3. Use functional components and hooks.
4. Write unit tests for new functionality.
5. Document public APIs and complex logic.
6. Use environment variables for configuration and secrets.

## PWA Support

- Use [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) or similar for PWA features.
- Ensure manifest, icons, splash screens, and service worker are configured.
- The PWA must meet requirements for publishing to Google Play Store and Apple App Store (HTTPS, manifest, icons, etc.).

## Environment Variables

- All sensitive and environment-specific configuration is managed via `.env` files.
- Example variables:
  - `VITE_API_URL`
  - `VITE_APP_NAME`
  - `VITE_LOG_LEVEL`

## CI/CD

- Full CI/CD pipeline runs on every push and pull request.
- Typical steps: lint, format, build, test, and deploy.
- Example: GitHub Actions workflow in `.github/workflows/ci.yml`.

---

## Tasks

### 1. Mobile PWA for Employee Stock Dashboard

- **Goal:** Create a Progressive Web App (PWA) for employees to view and manage their stock information.
- **Frontend Stack:** React, Vite, TypeScript, full PWA support.
- **Requirements:**
  - Responsive UI optimized for mobile devices.
  - PWA features: offline support, add to home screen, push notifications.
  - Secure authentication for employees.
  - Display stock balances, vesting schedules, and transaction history.
  - Integrate with backend REST API.
  - The PWA must meet requirements for publishing to Google Play Store and Apple App Store (e.g., manifest, icons, splash screens, service worker, HTTPS).
  - Use [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) or similar for PWA features.

### 2. Laptop/Desktop Dashboard for Admin

- **Goal:** Build a web dashboard for admin users to manage employee stock data.
- **Frontend Stack:** React, Vite, TypeScript.
- **Requirements:**
  - Responsive UI optimized for laptop/desktop screens.
  - Admin authentication and role-based access control.
  - Features: employee management, stock grant management, reporting, and analytics.
  - Integrate with backend REST API.
  - Use advanced data tables and charts for analytics.
