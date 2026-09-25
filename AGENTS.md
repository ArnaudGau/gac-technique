# GAC Technique Agent Guide

This app uses React, TypeScript, and Vite. The former Remix starter files remain temporarily under
`app/`, but they are excluded from TypeScript and are not part of the running application.

## Commands

```sh
npm i
npm run dev
npm run build
npm run preview
npm run typecheck
```

Use `npm run dev` for the Vite development server and browser updates.

## Starter Layout

- `src/main.tsx` mounts React
- `src/App.tsx` owns the initial application UI
- `src/index.css` contains global styles
- `vite.config.ts` configures Vite
- Root `public/` contains static files served unchanged
