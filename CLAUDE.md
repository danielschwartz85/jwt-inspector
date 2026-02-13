# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JWT Inspector — a static single-page React app for decoding, encoding, and verifying JWTs with local storage secret management.

## Commands

- **Dev server:** `npm run dev` (Vite)
- **Build:** `npm run build` (runs `tsc && vite build`)
- **Lint:** `npm run lint` (ESLint on `src/`)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

Single-page React 18 app using Vite, TypeScript, and MUI v5. No router — everything lives on one page.

### State Management

All JWT state flows through a `useReducer` in `src/components/app.tsx`. The reducer and types live in `src/src/state.ts`. Four action types: `encodedChange`, `headerChange`, `payloadChange`, `secretChange`. Each action carries pre-computed async results (the re-encoded JWT) since the reducer is synchronous — the async JWT operations happen in handler functions in `app.tsx` before dispatching.

### JWT Operations

`src/src/util.ts` wraps the `jose` library for all JWT work: `encode` (sign with HS256), `decode` (parse header + payload), `isVerified` (compact verify). Secrets are encoded via `TextEncoder` to `Uint8Array` before passing to jose.

### Secret Persistence

`SecretManager` in `src/src/util.ts` manages saved secrets in `localStorage` with expiration dates. The `useLocalSecrets` hook in `src/components/common/common.tsx` provides React state synced to localStorage. Save/delete dialogs live in `src/components/secret/`.

### Theme

Dark/light theme toggle persisted to `localStorage`. Theme definitions in `src/src/theme.ts`, hook `useLocalUserTheme` in `src/components/common/common.tsx`. Dark theme uses orange accent, light uses purple.

### Code Style

Prettier is enforced via ESLint: single quotes, no semicolons, 110 char print width. Unused imports are warned via `eslint-plugin-unused-imports`.

### File Layout Note

Non-component code lives under `src/src/` (state, util, theme) — this is intentional, not a typo.
