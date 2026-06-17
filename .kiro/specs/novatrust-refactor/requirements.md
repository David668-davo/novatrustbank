# Requirements Document

## Introduction

The NovaTrust codebase currently has all application logic — constants, mock data, CSS, reusable UI
components, page components, and the App shell — packed into a single 1,956-line file
(`src/pages/novatrust-bank.tsx`). Stub files already exist in `src/components/banking/`,
`src/components/charts/`, and `src/data/` but do not contain the real implementations.

This refactoring breaks the monolith into a clean, maintainable file structure without changing any
visible behaviour: the rendered output, navigation flow, styling, and application state management
must remain identical before and after the change.

The target structure is:

| Output file | Content |
|---|---|
| `src/constants/colors.ts` | `COLORS` constant |
| `src/data/mockData.ts` | All sample data arrays |
| `src/styles/global.css` | CSS extracted from the inline string |
| `src/components/ui/BankCard.tsx` | `BankCard` component |
| `src/components/ui/SpendingBars.tsx` | `SpendingBars` component |
| `src/components/ui/DonutChart.tsx` | `DonutChart` component |
| `src/components/layout/Navbar.tsx` | `Navbar` extracted from `App` |
| `src/components/layout/Sidebar.tsx` | `Sidebar` extracted from `App` |
| `src/pages/HomePage.tsx` | `HomePage` page |
| `src/pages/LoginPage.tsx` | `LoginPage` page |
| `src/pages/RegisterPage.tsx` | `RegisterPage` page |
| `src/pages/Dashboard.tsx` | `Dashboard` page |
| `src/pages/TransferPage.tsx` | `TransferPage` page |
| `src/pages/BillsPage.tsx` | `BillsPage` page |
| `src/pages/CardsPage.tsx` | `CardsPage` page |
| `src/pages/LoansPage.tsx` | `LoansPage` page |
| `src/pages/InvestmentsPage.tsx` | `InvestmentsPage` page |
| `src/pages/SupportPage.tsx` | `SupportPage` page |
| `src/pages/NotificationsPage.tsx` | `NotificationsPage` page |
| `src/pages/AdminPage.tsx` | `AdminPage` page |
| `src/App.tsx` | Slim App shell with routing only |

Existing stub files in `src/components/banking/` and `src/components/charts/` are superseded by the
new `src/components/ui/` files. The stub `src/data/transaction.ts` is superseded by `src/data/mockData.ts`.

## Glossary

- **Monolith**: `src/pages/novatrust-bank.tsx` — the single source file that contains all logic today.
- **Refactoring_Tool**: The automated process (developer tooling / Kiro tasks) that performs the file split.
- **App_Shell**: The default-exported `App` component responsible for top-level state (current page,
  login status, notification count), Navbar, Sidebar, and page routing.
- **Navbar**: The fixed top navigation bar rendered by the App Shell.
- **Sidebar**: The fixed left sidebar rendered by the App Shell when a user is authenticated.
- **Page_Component**: A React component that represents a full screen (e.g., `Dashboard`, `LoginPage`).
- **UI_Component**: A small, reusable React component that does not own routing state (e.g., `BankCard`,
  `SpendingBars`, `DonutChart`).
- **COLORS**: A plain TypeScript `const` object mapping semantic colour names to hex values.
- **Mock_Data**: Static TypeScript arrays used as stand-in data (`sampleTransactions`, `contacts`,
  `bills`, `loanOffers`, `investments`, `faqs`, `notifications`, `adminUsers`).
- **Global_CSS**: The ~400-line CSS string currently injected via `<style>{css}</style>` in the monolith.
- **Stub_File**: An existing file (e.g., `src/components/banking/BankCard.tsx`) that contains a
  placeholder or incomplete implementation that is replaced by this refactoring.
- **TypeScript_Interface**: A named TypeScript `interface` or `type` that describes the props or data
  shape of a component or data array.
- **Named_Export**: An ES-module `export` using the `export const` or `export function` syntax.
- **Default_Export**: An ES-module `export default` that exposes the primary value of a module.
- **Dead_Code**: Any file, import, or declaration that is no longer referenced after the refactoring
  is complete.

---

## Requirements

### Requirement 1: Extract the COLORS Constant

**User Story:** As a developer, I want a single authoritative source for the NovaTrust colour palette,
so that I can reference `COLORS` from any file without importing from the monolith.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL create the file `src/constants/colors.ts`.
2. THE `src/constants/colors.ts` file SHALL export `COLORS` as a Named_Export using `export const COLORS`.
3. THE `COLORS` object in `src/constants/colors.ts` SHALL contain every key-value pair that was
   present in the original `COLORS` declaration inside the Monolith.
4. WHEN any Page_Component or UI_Component requires a colour value, THE component SHALL import
   `COLORS` from `src/constants/colors.ts` rather than redeclaring it inline.
5. THE Refactoring_Tool SHALL automatically update all components that contain hardcoded colour
   hex values matching entries in the `COLORS` object to import and reference `COLORS` instead
   of redeclaring the value inline.

---

### Requirement 2: Extract Mock Data

**User Story:** As a developer, I want all static sample data in one file, so that I can update or
replace test fixtures without searching through component code.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL create the file `src/data/mockData.ts`.
2. THE `src/data/mockData.ts` file SHALL export each of the following arrays as Named_Exports:
   `sampleTransactions`, `contacts`, `bills`, `loanOffers`, `investments`, `faqs`, `notifications`,
   `adminUsers`.
3. THE data shape of each exported array in `src/data/mockData.ts` SHALL be identical to the
   corresponding array in the Monolith, including all field names and values.
4. THE Refactoring_Tool SHALL declare a TypeScript_Interface for each distinct data shape
   (e.g., `Transaction`, `Contact`, `Bill`) and annotate each exported array with the appropriate
   interface.
5. WHEN a Page_Component requires mock data, THE component SHALL import it from `src/data/mockData.ts`.
6. WHEN a Page_Component does not require any mock data, THE component SHALL NOT be required to
   import from `src/data/mockData.ts`.
6. THE existing `src/data/transaction.ts` Stub_File SHALL be retired; any remaining references to it
   SHALL be updated to import `sampleTransactions` from `src/data/mockData.ts`.

---

### Requirement 3: Extract Global CSS

**User Story:** As a developer, I want the application's styles in a standalone CSS file, so that
editors provide proper syntax highlighting, linting, and autocompletion for CSS.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL create the file `src/styles/global.css`.
2. THE `src/styles/global.css` file SHALL contain every CSS rule that was present in the `css`
   template literal inside the Monolith, without modification to any selector, property, or value.
3. THE App_Shell SHALL import `src/styles/global.css` using a bare CSS import statement
   (`import '../styles/global.css'` or equivalent relative path) instead of injecting a
   `<style>{css}</style>` element.
4. WHEN the application is rendered in a browser, THE Global_CSS rules SHALL apply identically to
   the rules that were applied by the inline `<style>` tag in the Monolith.

---

### Requirement 4: Extract UI Components

**User Story:** As a developer, I want each reusable UI component in its own file, so that I can
find, test, and update components independently.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL create `src/components/ui/BankCard.tsx`,
   `src/components/ui/SpendingBars.tsx`, and `src/components/ui/DonutChart.tsx`.
2. EACH of the three files SHALL contain a Default_Export for its respective UI_Component.
3. EACH UI_Component file SHALL declare a TypeScript_Interface for its props and annotate the
   component's parameter list with that interface.
4. THE implementation of each extracted UI_Component SHALL be functionally identical to the
   corresponding function defined in the Monolith, including all JSX structure, CSS class names,
   inline styles, and logic.
5. WHEN an existing Stub_File in `src/components/banking/` or `src/components/charts/` covers the
   same component, THE Stub_File SHALL be replaced with the extracted implementation, or all
   consumers SHALL be updated to import from the new `src/components/ui/` path.

---

### Requirement 5: Extract Layout Components

**User Story:** As a developer, I want the Navbar and Sidebar in dedicated files, so that navigation
layout changes can be made in one place without editing the App shell.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL create `src/components/layout/Navbar.tsx` and
   `src/components/layout/Sidebar.tsx`.
2. EACH layout file SHALL contain a Default_Export for its respective component.
3. THE `Navbar` component SHALL accept the props required to replicate its current behaviour: the
   current `loggedIn` state, a `setPage` callback, and a `setLoggedIn` callback.
4. THE `Sidebar` component SHALL accept the props required to replicate its current behaviour: the
   current `page` value, a `setPage` callback, and the `notifCount` value.
5. THE JSX, CSS class names, inline styles, and conditional rendering logic within each layout
   component SHALL be identical to the corresponding sections in the Monolith's `App` component.

---

### Requirement 6: Extract Page Components

**User Story:** As a developer, I want each page in its own file, so that I can navigate the
codebase by feature rather than scrolling through a single enormous file.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL create one `.tsx` file per page in the `src/pages/` directory:
   `HomePage.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `Dashboard.tsx`, `TransferPage.tsx`,
   `BillsPage.tsx`, `CardsPage.tsx`, `LoansPage.tsx`, `InvestmentsPage.tsx`, `SupportPage.tsx`,
   `NotificationsPage.tsx`, and `AdminPage.tsx`.
2. EACH page file SHALL contain a Default_Export for its respective Page_Component.
3. THE JSX structure, local state (`useState`, `useRef`, `useEffect`), event handlers, and
   conditional rendering of each extracted Page_Component SHALL be identical to the corresponding
   function in the Monolith.
4. WHEN a Page_Component uses a UI_Component (e.g., `Dashboard` uses `SpendingBars` and `DonutChart`),
   THE Page_Component SHALL import it from the appropriate `src/components/ui/` file.
5. WHEN a Page_Component uses Mock_Data (e.g., `Dashboard` uses `sampleTransactions`), THE
   Page_Component SHALL import it from `src/data/mockData.ts`.
6. WHEN a Page_Component accepts navigation callbacks (e.g., `setPage`, `setLoggedIn`), THOSE
   callbacks SHALL be typed with explicit TypeScript parameter types in the component's props
   interface.
7. THE existing `src/pages/novatrust-bank.tsx` Monolith SHALL be deleted after all Page_Components
   have been extracted and verified.

---

### Requirement 7: Slim Down the App Shell

**User Story:** As a developer, I want `src/App.tsx` to contain only routing and top-level state,
so that it is easy to understand the application's navigation structure at a glance.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL update `src/App.tsx` to be the sole App_Shell entry point, replacing
   the current placeholder implementation.
2. THE App_Shell SHALL maintain the three top-level state variables present in the Monolith:
   `page`, `loggedIn`, and `notifCount`. The Monolith MUST contain exactly these three state
   variables before the refactoring proceeds; if any are missing or renamed, the task SHALL be
   treated as a blocker and resolved before continuing.
3. THE App_Shell SHALL import and render the `Navbar` component from
   `src/components/layout/Navbar.tsx`.
4. THE App_Shell SHALL import and render the `Sidebar` component from
   `src/components/layout/Sidebar.tsx`.
5. THE App_Shell SHALL import each Page_Component from its respective file in `src/pages/` and
   render it via the `renderPage` routing logic.
6. THE App_Shell SHALL import Global_CSS from `src/styles/global.css`.
7. WHEN all imports are in place, THE `src/App.tsx` file SHALL contain no inline component
   definitions, no raw data arrays, no CSS strings, and no colour constants.

---

### Requirement 8: TypeScript Type Safety

**User Story:** As a developer, I want all extracted files to be fully typed, so that the TypeScript
compiler catches mismatches between components and their consumers.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL declare a TypeScript_Interface for the props of every UI_Component
   and Page_Component that accepts props.
2. WHEN a Page_Component's props include callback functions, THOSE callbacks SHALL be typed with
   explicit parameter and return types (e.g., `setPage: (page: string) => void`).
3. THE TypeScript compiler (`tsc --noEmit`) SHALL report zero errors after the refactoring is
   complete, regardless of whether other acceptance criteria (such as missing interface declarations)
   have been met. TypeScript errors SHALL be resolved before the refactoring is considered done.
4. THE `src/data/mockData.ts` file SHALL export a TypeScript_Interface for each data shape alongside
   its corresponding data array.
5. IF a type is shared between more than one file (e.g., `Transaction` used by both `Dashboard` and
   `AdminPage`), THEN the type SHALL be defined once in `src/data/mockData.ts` and imported where
   needed.

---

### Requirement 9: No Behaviour Change

**User Story:** As a developer, I want the refactored application to render and behave exactly as
the monolith did, so that users are unaffected by the structural change.

#### Acceptance Criteria

1. WHEN the application is started with `npm run dev`, THE App_Shell SHALL mount and render without
   runtime errors.
2. WHEN the `npm run build` command is executed, THE build SHALL complete with zero TypeScript
   errors and zero Vite build errors. IF TypeScript errors are present, THE build SHALL be blocked
   until a developer resolves them manually; no automated suppression or workaround is permitted.
3. THE rendered HTML output for each page (HomePage, LoginPage, RegisterPage, Dashboard, TransferPage,
   BillsPage, CardsPage, LoansPage, InvestmentsPage, SupportPage, NotificationsPage, AdminPage)
   SHALL be structurally identical to the output produced by the Monolith for the same page.
4. THE navigation flow (e.g., clicking "Open Account" navigates to RegisterPage, successful login
   navigates to Dashboard) SHALL behave identically to the Monolith.
5. THE Sidebar SHALL display the correct active state highlight for the currently displayed page,
   as it did in the Monolith.
6. THE notification badge count displayed in the Sidebar SHALL reflect the `notifCount` state from
   the App_Shell, as it did in the Monolith.

---

### Requirement 10: Dead Code Removal

**User Story:** As a developer, I want all obsolete stub files and unused imports removed, so that
the project contains no confusing or misleading code.

#### Acceptance Criteria

1. THE Refactoring_Tool SHALL delete `src/pages/novatrust-bank.tsx` after extraction is complete.
2. THE Refactoring_Tool SHALL delete or overwrite all Stub_Files whose content is fully superseded
   by the extracted implementations: `src/components/banking/BankCard.tsx`,
   `src/components/banking/TransactionItem.tsx`, `src/components/charts/DonutChart.tsx`,
   `src/components/charts/SpendingBars.tsx`, and `src/data/transaction.ts`.
3. THE Refactoring_Tool SHALL remove `src/components/Header.tsx` if it is no longer imported by
   any file after the refactoring.
4. WHEN the refactoring is complete, THE project SHALL contain no unused imports as reported by the
   ESLint configuration (`npm run lint`). IF cleanup steps such as unused-import removal fail, THE
   refactoring MAY be marked complete for code-extraction purposes, but the incomplete cleanup SHALL
   be recorded as a separate outstanding task.
5. WHEN the refactoring is complete, THE project SHALL contain no files that are never imported by
   any other file (excluding `main.tsx`, `vite.config.ts`, and configuration files).
