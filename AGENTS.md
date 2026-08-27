# AGENTS.md — cadmaxconweb

## Commands

| Action | Command |
|---|---|
| Start dev server | `npm start` |
| Build for production | `npm run build` |
| Run tests | `npm test` |
| Eject CRA | `npm run eject` |

## Environment

- `.env` at repo root is required. It must contain at minimum:
  - `REACT_APP_WITH_CREDENTIALS=false` (line 24)
  - `WEBSITE_URL=http://localhost:3000` (line 22)
- Other vars (MONGODB_URI, JWT_SECRET, AWS keys, MAIL_USER/PASS) are for backend/admin only.
- `.env` is gitignored — never commit it.

## Architecture

- **SPA** with `react-router-dom` v7. Routes are defined in `src/Router/AppRouter.js`.
- `src/Router/ScrollToTop.js` forcibly scrolls to `0,0` on every route change (disables browser scroll restoration).
- Admin area lives under `/admin/*` at `src/admin/`. Access is protected by checking `localStorage.getItem("adminToken")` (`src/admin/routes/AdminPrivate.jsx`).
- Public + admin routes are combined in `AppRouter.js`.
- Root render in `src/index.js` mounts to `#root` with `React.StrictMode`. Bootstrap + Bootstrap Icons + slick-carousel CSS are imported globally.

## GSAP / ScrollTrigger

- **Heavily used** throughout the codebase (`src/hooks/useScrollReveal.js`, `src/hooks/useAmenitiesAnimation.js`, `src/notes`).
- Always `gsap.registerPlugin(ScrollTrigger)` before using ScrollTrigger features.
- `gsap.ticker.lagSmoothing(0)` is set in `useLenis.js` to disable lag smoothing for better ScrollTrigger sync.
- Patterns:
  - One pinned timeline with `scrollTrigger: { trigger: sectionRef, start: "top top", end: "+=3500", scrub: 1, pin: true }`
  - Use `gsap.context()` for cleanup on unmount.
  - Use `requestAnimationFrame` loop for per-frame mask updates (e.g., stripe reveals).
  - Prefer animating `transform` and `opacity` only for GPU acceleration.

## Tailwind CSS

- Config: `tailwind.config.js` — content watches `./src/**/*.{js,jsx,ts,tsx}`.
- Custom font families: `garamond`, `lato`, `clash`, `general`, `inter`, `fragment-serif`, `fragment-glare`, `inter-28pt`, `display`.
- Color palette: `primary`, `brand`, `accent` — see `tailwind.config.js` for full specs.
- Build uses `postcss.config.js` with `tailwindcss` and `autoprefixer`.

## Testing

- `npm test` runs Jest via CRA. One test exists: `src/App.test.js`.
- Tests run in the browser environment (jsdom).
- No additional test infrastructure (no Vitest, no Cypress, etc.) is configured.

## Key project conventions

- `motion` (framer-motion) used for view-port-enter animations with `viewport={{ once: true }}`.
- `ConfirmProvider`/`useConfirm` in `src/components/ConfirmModal/` for modals.
- `ToastProvider`/`useToast` in `src/components/Toast/` for toast notifications.
- Image upload in `src/admin/components/ImageUpload.jsx` uses `URL.createObjectURL` with cleanup via ref ref.
- Admin sidebar auto-closes on mobile (`window.innerWidth < 1024`).
- `.env` vars loaded by CRA as `REACT_APP_*` prefixed vars only.