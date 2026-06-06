# Recipe Recommender

A React application that helps users discover recipes from [TheMealDB](https://www.themealdb.com/). Users can follow a guided preference flow to get a random recommendation, search recipes by name, view full recipe details, and record like/dislike feedback that persists across sessions.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (ships with Node.js)

### Installation

```bash
npm install
```

### Environment variables

The app reads configuration from a `.env` file at the project root. Vite only exposes variables prefixed with `VITE_` to the client.

1. Copy the sample file:

```bash
cp .env.sample .env
```

2. Set the API base URL:

```env
VITE_API_URL=https://www.themealdb.com/api/json/v1/1
```

| Variable       | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `VITE_API_URL` | Yes      | Base URL for TheMealDB API (no trailing slash). |

The value is consumed by `src/dictionaries/Environment.ts` and used by the shared HTTP fetcher to build request URLs.

> **Note:** Restart the dev server after changing `.env` values.

### Development

```bash
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

### Other scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run build`   | Type-check and build for production. |
| `npm run preview` | Serve the production build locally.  |
| `npm run lint`    | Run ESLint with zero warnings allowed. |

## Features

### Home

The home page combines three entry points:

1. **Guided flow** — A card that starts the step-by-step preference wizard (`/recipes/search/basic-preferences`).
2. **Search by term** — A debounced text search (500 ms) against TheMealDB's search endpoint. Results link to the recipe detail page.
3. **History** — A list of past like/dislike feedback, shown only when entries exist. Each item links back to the recipe it refers to.

### Guided preference flow

A three-step wizard scoped under `/recipes/search`:

1. **Basic preferences** — Select an area of interest (e.g. Italian) via autocomplete.
2. **Advanced preferences** — Select a category (e.g. Pasta) via autocomplete. Users cannot reach this step without first choosing an area; attempting to skip ahead redirects back.
3. **Results** — Fetches recipes matching the selected area and category, then shows one at a time picked at random. Users can shuffle to another result ("Try another") when more than one match exists.

From the results card, users can:

- Open the full recipe in a new tab.
- Give **like** or **dislike** feedback, which saves the choice and returns to home.

### Recipe details

Route: `/recipes/$id`

Displays the full recipe: image, metadata (category, area, country, tags), ingredients, instructions, external links (YouTube, source, image source), and last-updated date. Loading and error/empty states are handled with skeletons and fallback messages.

### Feedback history

When a user likes or dislikes a recipe from the guided flow, a history entry is stored in `localStorage` under the key `feedback-items`. Each entry records:

- Recipe id, title, and thumbnail
- Feedback type (`like` | `dislike`)
- The area and category inputs used during that session
- A creation timestamp

New entries are prepended so the most recent feedback appears first.

## Design and architecture

### Tech stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| UI           | React 19 + TypeScript           |
| Build        | Vite 8                          |
| Routing      | TanStack Router (file-based)    |
| Server state | TanStack Query                  |
| Icons        | Lucide React                    |
| Positioning  | Floating UI (autocomplete)      |
| Styling      | CSS Modules + design tokens       |

### Project structure

```
src/
├── components/     # Atomic design: atoms → molecules → organisms
├── features/       # Feature-specific UI and context
├── hooks/          # Shared hooks and API query hooks
├── plugins/        # API client, logger, utilities
├── routes/         # TanStack Router file routes
├── dictionaries/   # Environment and constants
└── styles/         # Global styles and CSS variables
```

Path aliases (`@components`, `@features`, `@hooks`, `@plugins`, `@dictionaries`) are configured in `vite.config.ts`.

### Routing

- File-based routes under `src/routes/` with auto-generated `routeTree.gen.ts`.
- Code splitting is enabled via the TanStack Router Vite plugin.
- Route-level providers:
  - `HistoryProvider` wraps the entire app at the root route.
  - `RecipesSearchProvider` wraps only the `/recipes/search/*` subtree, keeping search state scoped to the wizard.

### State management

| Concern              | Approach                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| API data             | TanStack Query with declarative cache keys and `staleTime: Infinity`     |
| Search wizard inputs | React Context (`RecipesSearchProvider`) — area, category, validation flags |
| Feedback history     | React Context + `localStorage` via `useLocalStorage`                       |
| Ephemeral UI state   | Local `useState` (search input, autocomplete open state, etc.)           |

### API layer

Endpoints are declared in `src/plugins/api/features/recipes.ts` as a typed schema (path, method, cache key, stale time). A thin `fetcher` prepends `Environment.apiUrl`, handles JSON parsing, and throws a typed `HttpError` on non-OK responses. Query hooks in `src/hooks/api/query/` map each endpoint to a `useQuery` call.

**API limitation workaround:** TheMealDB's filter endpoint accepts only one criterion at a time. The app requests by category, then client-side filters results by `strArea` to honour both user selections.

### Design system

The styling layer is intentionally minimal: a token file plus a small set of atomic components that consume those tokens. Feature code should compose primitives rather than introduce one-off values, so the system can grow without fragmenting.

#### Token source

All shared values live in `src/styles/variables.css` as `:root` CSS custom properties. They are loaded globally via `src/styles/index.css`, which makes every token available to any CSS Module without extra imports.

**Convention:** add or change a design value in `variables.css` first, then reference it as `var(--token-name)` in component styles. Avoid hard-coded colours, spacing, or font sizes outside the token file.

#### Token categories

**Spacing** — A single scale from `--spacing-hairline` (1px) through `--spacing-11xl` (96px). Used for padding, gaps, heights, border widths, outline offsets, and (in several components) border radius.

| Token | Value | Typical use |
| ----- | ----- | ----------- |
| `--spacing-hairline` | 1px | Borders, dividers |
| `--spacing-2xs` – `--spacing-s` | 2–8px | Tight gaps, focus outlines, chip padding |
| `--spacing-m` – `--spacing-2xl` | 12–24px | Input padding, card padding, section gaps |
| `--spacing-3xl` – `--spacing-5xl` | 32–48px | Button heights, larger section spacing |
| `--spacing-6xl` – `--spacing-11xl` | 56–96px | Page-level layout (reserved for growth) |

**Colour — Neutral** — The default UI palette. `--neutral-100`/`200` for surfaces and inputs, `--neutral-300`/`400` for borders, `--neutral-500`/`600` for secondary text, `--neutral-900` for primary text. `--white` is the card/surface highlight.

**Colour — Purple (brand)** — Primary interactive colour. `--purple-500` is the default action fill; `600`/`700` for hover/active; `100`/`200` for soft backgrounds (e.g. `PillButton`, disabled purple buttons); `50` for the lightest tint. Links in feature views use `600`/`700`.

**Colour — Red (semantic)** — Reserved for error and destructive feedback. Autocomplete errors use `--red-700`; recipe detail errors use the same token. Lighter shades (`50`–`400`) are defined for future alert/toast patterns.

**Typography** — `--font-family` is a system-ui stack. Font sizes run from `--font-size-2xs` (12px) to `--font-size-5xl` (56px). Global body defaults: `neutral-900` text, `0.18px` letter-spacing, antialiased rendering.

**Elevation** — Two box-shadow tokens built with `color-mix` for theme-aware opacity:

- `--elevation-neutral-raised` — Default card shadow.
- `--elevation-purple-raised` — Hover emphasis on interactive cards.

**Motion** — Shared easing (`--animation-easing-smooth`, `--animation-easing-out-quad`, `--animation-easing-ease-out`) and durations (`--animation-duration-fast` 150ms, `--animation-duration-normal` 250ms). Buttons, cards, inputs, and autocomplete options all reference these rather than ad-hoc transitions.

#### Component layer

Primitives follow [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) and map tokens to a typed React API:

| Layer | Components | Role |
| ----- | ---------- | ---- |
| Atoms | `Typography`, `Button`, `Card`, `PillButton`, `Skeleton`, `LoadingSpinner` | Token-driven building blocks |
| Molecules | `TextInput`, `ImageLoader` | Composed inputs and media |
| Organisms | `Autocomplete` | Accessible combobox built on `TextInput` + Floating UI |

**Typography** — Props: `size` (`2xs`–`5xl`), `weight` (`regular` \| `medium` \| `bold`), `align`, and polymorphic `as`. Each maps to a CSS Module class bound to a `--font-size-*` token.

**Button** — Props: `variant` (`neutral` \| `purple`), `size` (`small` \| `medium` \| `large`). Heights are spacing tokens (`3xl` / `4xl` / `5xl`). States: hover, active, disabled, `focus-visible` outline. Supports `loading` (inline spinner) and `startIcon`.

**Card** — White surface, `neutral-300` border, `elevation-neutral-raised`. Hover shifts to `elevation-purple-raised`. Optional `onClick` adds `role="button"` and pointer cursor.

**PillButton** — Compact chip for tags and selections. `purple-100` background, `Typography` at `xs` size. Renders as `<button>` when clickable, `<span>` otherwise.

**TextInput** — Label + field wrapper on `neutral-100` with `neutral-300` border; `focus-within` promotes border to `neutral-400`.

**Skeleton** — Shimmer placeholder using `neutral-200`/`300`; used while recipe data loads.

**LoadingSpinner** — SVG spinner with local aliases (`--loader-primary`, `--loader-gray`, `--loader-white`) pointing back to palette tokens. Sizes from `xxxsmall` to `large`.

Feature-level CSS Modules (`Home.module.css`, `RecipeDetails.module.css`, etc.) should only handle layout (flex/grid, gaps, responsive structure) and may reference spacing/colour tokens — not introduce new raw values.

#### Semantic patterns

| Intent | Tokens / components |
| ------ | ------------------- |
| Primary action | `Button` `variant="purple"` |
| Secondary / navigation | `Button` `variant="neutral"` |
| Surface / grouping | `Card` on `white` with neutral elevation |
| Metadata / tags | `PillButton` on `purple-100` |
| Body copy | `Typography` `size="s"` or `"m"` |
| Page titles | `Typography` `size="xl"`–`"3xl"` + `weight="bold"` |
| Form fields | `TextInput` + organism `Autocomplete` |
| Error text | `Typography` + `--red-700` |
| Loading | `Skeleton` for layout placeholders; `LoadingSpinner` for inline/async |

#### Extending the system

1. **New token** — Add the variable to `variables.css` under the right category (spacing, colour, typography, elevation, motion).
2. **New primitive** — Create an atom under `src/components/atoms/`, consume tokens in a co-located `.module.css`, expose a small prop API (variant, size) instead of style overrides.
3. **New composite** — Build molecules/organisms from existing atoms; keep business logic in `features/`.
4. **Theming** — Because tokens are CSS custom properties on `:root`, a future theme (e.g. dark mode) can override the same variable names without touching component files.

#### UI behaviour

- **Loading UX** — Skeleton placeholders for recipe cards and detail pages; spinner for inline search and button loading states.
- **Accessible autocomplete** — Floating UI: keyboard navigation, ARIA roles, portal-rendered dropdown, clear button, client-side option filtering.

### Recommendation logic

- On the results page, `useRandomItem` picks a random recipe from the fetched list on first load.
- "Try another" uses `pickRandomIndex` to select a different index, avoiding repeats when multiple results exist.

### Route guards

- Advanced preferences redirects to basic preferences if no area is selected (`useEffectOnceWhen`).
- Results redirects to advanced preferences if area or category is missing (`<Navigate>`).

## External API

This app uses the free [TheMealDB API](https://www.themealdb.com/api.php). Endpoints consumed:

| Endpoint              | Purpose                    |
| --------------------- | -------------------------- |
| `list.php?a=list`     | List areas                 |
| `list.php?c=list`     | List categories            |
| `filter.php?a=&c=`    | Filter recipes             |
| `search.php?s=`       | Search recipes by name     |
| `lookup.php?i=`       | Fetch recipe details by id |
