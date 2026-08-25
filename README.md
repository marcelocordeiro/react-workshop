# React Workshop

A hands-on workshop that takes experienced **backend engineers** (Java / Kotlin) from zero React to being able to read and contribute to a real React + TypeScript dashboard.

Every concept has a runnable page in the app and a matching chapter in [`WORKSHOP_SCRIPT.md`](./WORKSHOP_SCRIPT.md), with analogies to backend concepts you already know (dependency injection, `@Cacheable`, the Command pattern, `@PathVariable`, WireMock, Mockito…).

## Tech stack

| Concern                 | Choice                                       |
| ----------------------- | -------------------------------------------- |
| Language                | TypeScript                                   |
| Build tool / dev server | Vite                                         |
| Package manager         | Yarn                                         |
| UI components           | Material-UI (MUI) v5                         |
| Data fetching           | `@tanstack/react-query` v5 + Axios           |
| Forms                   | React Hook Form                              |
| Routing                 | React Router v6                              |
| Styling                 | `sx` prop, MUI `styled()`, styled-components |
| Global state            | React context + Zustand                      |
| i18n                    | react-i18next                                |
| Tests                   | Jest + React Testing Library + MSW           |

The script teaches the **current** API for each of these and gives a mapping table where a widely-used older version differs — React Router v6 ↔ v5 (chapter 15) and React Query v5 ↔ v3 (chapter 9) — so it works whether you are joining a recent codebase or one that has been shipping for years.

## Getting started

```bash
yarn install
yarn start          # opens http://localhost:5173
```

Then open [`WORKSHOP_SCRIPT.md`](./WORKSHOP_SCRIPT.md) and follow along — the sidebar entries and the script chapters are numbered the same.

## Commands

```bash
yarn start          # dev server with hot reload
yarn build          # type check (tsc -b) + production build
yarn test           # run the test suite once
yarn test:watch     # re-run tests on change
yarn test Counter   # run only test files matching "Counter"
yarn coverage       # coverage report -> open coverage/index.html
yarn lint           # ESLint (includes Prettier as a rule)
yarn format         # rewrite files with Prettier
```

## What the workshop covers

**Part I — Orientation:** what React is, the Java/Kotlin ↔ React "Rosetta Stone", what TypeScript buys you.

**Part II — How React works:** the DOM, the Virtual DOM and reconciliation, why render must be pure, why state is a snapshot, the component lifecycle, the Rules of Hooks.

**Part III — Modern JavaScript:** exports, destructuring, spread, immutability, the array methods you will use constantly, conditional rendering traps.

**Part IV — The chapters** (each one is a page in the app):

| #   | Topic                                | #   | Topic                            |
| --- | ------------------------------------ | --- | -------------------------------- |
| 1   | JSX                                  | 10  | React Hook Form                  |
| 2   | Props                                | 11  | `useRef`                         |
| 3   | `useState`                           | 12  | Custom hooks                     |
| 4   | `useEffect`                          | 13  | Mutations & cache invalidation   |
| 5   | `useContext`                         | 14  | Styling                          |
| 6   | `useReducer`                         | 15  | Routing (incl. v6 ↔ v5 mapping) |
| 7   | `useMemo`                            | 16  | Global state with Zustand        |
| 8   | `useCallback`                        | 17  | Internationalisation (i18n)      |
| 9   | React Query (incl. v5 ↔ v3 mapping) |     |                                  |

**Part V — Practice:** testing (Jest + RTL, three ways to fake the network, Cypress E2E), browser DevTools, AI-assisted development (Figma MCP and Kaboom browser DevTools MCP), and a guide to the things a real production codebase does differently.

## Project structure

```
src/
├── main.tsx                     Entry point — providers wrap the app here
├── App.tsx                      Route table
├── components/
│   ├── Layout/                  App bar + sidebar + <Outlet />
│   ├── 01-JSX/ … 17-i18n/       One folder per chapter
│   └── */*.test.tsx             Tests live next to what they test
├── pages/                       One page per sidebar entry
└── test/
    ├── setup.ts                 jest-dom matchers + MSW server lifecycle
    └── mocks/                   MSW handlers and server
```

Several chapters ship two versions of the same component — for example `UseCallbackDemo.tsx` (the problem) and `UseCallbackDemoFixed.tsx` (the fix), or `UserListWithReactQuery.test.tsx` (mocked HTTP client) and `UserListWithReactQuery.msw.test.tsx` (fake server). Diff them; that contrast is the lesson.
