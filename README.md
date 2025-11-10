# UNO Web3 – Assignment 5 Conversion

This branch implements the assignment requirements of converting the previous Vue client into a Redux + RxJS powered architecture while retaining existing UNO gameplay features.

## ✅ Requirements Implemented

Must have:
- Functional model: existing server/game logic retained (top card, stacking, chaining, wild color choice).
- Retained features from assignments 1–3 (drawing, playing, stacking +2/+4, number chaining, wild color picker, win state).
- Redux for state management (`src/store/*`).
- RxJS for handling messages from the server (Firestore snapshots wrapped as Observables in `streams.ts`).

Should have:
- React recommended – currently still using Vue for rendering; Redux + RxJS integrated. (React layer can be added in `react/` folder later.)

## Architecture Overview

```
Firebase (rooms / players / hands docs)
        │ snapshots
        ▼
RxJS Observables (roomObservable / playersObservable / myHandObservable)
        │ next/error
        ▼
Redux store (gameSlice reducers update unified state)
        │ selector wrapper (Vue bridge)
        ▼
OnlineBoard.vue (UI reads store via useSelector)
        │ user actions
        ▼
GraphQL mutations (playCardOnline / drawOneOnline / endTurnOnline)
```

## Key Files
- `src/store/types.ts` – Shared state types.
- `src/store/gameSlice.ts` – Redux slice for UNO state.
- `src/store/store.ts` – Configured Redux store.
- `src/store/streams.ts` – RxJS Observables wrapping Firestore snapshots.
- `src/store/vue.ts` – Lightweight Vue hooks (`useSelector`, `useDispatch`) bridging to Redux.
- `src/services/OnlineBoard.vue` – Refactored to rely on Redux + RxJS instead of direct Firestore subscription.
- `src/services/OnlineGame.ts` – GraphQL mutation helpers.

## How to Run

```powershell
npm install
npm run dev
```
Visit local dev server (default: http://localhost:5173/UNO-WEB3/ if base applied) and create/join a room.

## Building & Deploying

```powershell
npm run build
npm run deploy   # publishes dist/ to gh-pages branch
```

## Adding React (Next Step)
1. Install React dependencies:
   ```powershell
   npm install react react-dom @types/react @types/react-dom
   ```
2. Create `src/react/App.tsx` that uses the same selectors (wrap store with `<Provider>` using `react-redux`).
3. Add a React entry point (`react-main.tsx`) alongside current Vue entry, or switch entirely.
4. Gradually port Vue components.

## Functional Model Notes
Current functional server/game model (top card logic, wild color handling, draw stacking, number chaining) remains intact through existing services and `matches` rule. Refactor opportunities: extract pure functions (e.g., `canPlay`, `resolveStack`) into a `model/` directory for reuse in React version.

## Verification
- Build succeeded (`npm run build`).
- New bundle hash appears each deploy due to injected `__BUILD_TIME__`.
- Gameplay interactions still work via Redux + RxJS pipeline (draw, play, stack).

## Future Enhancements
- Full React UI.
- Unit tests for pure card/stacking logic.
- Better chunk splitting (current JS bundle ~700kB).
- Error boundary component for network failures.

## License
Internal coursework project – no production use implied.

