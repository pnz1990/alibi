# Stage 0: Skeleton + Toolchain

## What this does

Establishes the complete project skeleton: a Vite + TypeScript SPA with a blank HTML5 Canvas, all tooling wired (`npm run build`, `npm test`, `npm run lint`, `npm run test:e2e`), a Playwright smoke test confirming the page loads with zero JS errors, GitHub Actions CI on every PR, and GitHub Pages auto-deploy on merge to main.

## Obligations (Zone 1)

- `npm run build` exits 0 and produces a `dist/` directory with `index.html` and bundled assets.
- `npm test` (Vitest) exits 0 with at least one passing test.
- `npm run lint` (ESLint) exits 0 with zero lint errors.
- `npm run test:e2e` (Playwright headless) exits 0 with `smoke.spec.ts` passing.
- `index.html` contains a `<canvas>` element with `data-testid="game-canvas"`.
- `src/main.ts` renders a blank canvas — no game logic.
- `smoke.spec.ts` asserts: page loads at `http://localhost:5173`, `[data-testid="game-canvas"]` is visible, zero browser JS errors.
- GitHub Actions workflow file at `.github/workflows/ci.yml` runs build + test + lint + e2e on every PR to main.
- GitHub Pages deploy workflow at `.github/workflows/deploy.yml` deploys `dist/` to `gh-pages` branch on push to main.
- `window.__alibi_puzzle` is `undefined` at this stage (no puzzle engine yet).
- No runtime npm packages imported in `src/` — only devDependencies.

## Implementer's judgment (Zone 2)

- Canvas background color and initial size (may use `800×600` or any reasonable size).
- ESLint ruleset — must include `@typescript-eslint/recommended`; additional rules are implementer's choice.
- Playwright browser to target (Chromium is fine; Firefox/Safari optional).
- Whether `npm test` uses `--run` flag for CI vs `--watch` for dev.
- Vitest coverage config (threshold not required at this stage).
- Exact GitHub Actions runner versions (ubuntu-latest acceptable).
- Node version (18 or 20).

## Scoped out (Zone 3)

- No game logic, no engine code, no theme modules at this stage.
- No `data-testid` attributes beyond `game-canvas`.
- No mobile layout, no accessibility features.
- GitHub Pages custom domain is out of scope.
- No Lighthouse or performance testing.

## Interfaces / Schema / Examples

### `package.json` (required scripts and devDependencies)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest run",
    "lint": "eslint src --ext .ts",
    "test:e2e": "playwright test"
  },
  "devDependencies": {
    "vite": "^5.x",
    "typescript": "^5.x",
    "vitest": "^1.x",
    "eslint": "^8.x",
    "@typescript-eslint/eslint-plugin": "^6.x",
    "@typescript-eslint/parser": "^6.x",
    "@playwright/test": "^1.x"
  }
}
```

### `index.html` (required shape)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>ALIBI</title>
  </head>
  <body>
    <canvas id="game-canvas" data-testid="game-canvas" width="800" height="600"></canvas>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### `playwright.config.ts` (required shape)

```typescript
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://localhost:5173' },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
```

### `tests/e2e/smoke.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test('page loads with canvas and no JS errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/');
  await expect(page.locator('[data-testid="game-canvas"]')).toBeVisible();
  expect(errors).toHaveLength(0);
});
```

### `.github/workflows/ci.yml` (required structure)

Triggers: `pull_request` targeting `main`. Steps: checkout → setup Node → `npm ci` → `npm run build` → `npm test` → `npm run lint` → `npx playwright install --with-deps chromium` → `npm run test:e2e`.

### `.github/workflows/deploy.yml` (required structure)

Triggers: `push` to `main`. Deploys `dist/` to `gh-pages` branch using `peaceiris/actions-gh-pages`.

## Rejected alternatives

- **Webpack / Rollup instead of Vite**: Vite is faster for dev and has first-class TypeScript + `?raw` import support needed for SVG bundling in later stages.
- **Jest instead of Vitest**: Vitest is native to Vite, requires no separate transform config, and has the same API.
- **Puppeteer instead of Playwright**: Playwright is cross-browser, has better `data-testid` support, and is the recommended tool in AGENTS.md.
