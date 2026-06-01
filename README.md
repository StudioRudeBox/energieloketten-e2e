# wel-test

Playwright end-to-end test suite for the energieloketten.nl website. Tests are written in TypeScript using the Page Object Model pattern.

## Project structure

```
wel-test/
├── base/
│   └── BasePage.ts          # Shared page base class
├── pages/
│   └── HomePage.ts          # Page object for the homepage
├── components/
│   ├── CookieModal.ts        # Cookie consent modal
│   ├── GlobalSearch.ts       # Semantic search overlay
│   ├── NavMainMenu.ts        # Main navigation menu
│   └── NavFooterMenu.ts      # Footer navigation menu
├── tests/
│   └── semantic-search.spec.ts  # Semantic search test
├── .env.example              # Environment variable template
└── playwright.config.ts      # Playwright configuration
```

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- Playwright browsers installed (see setup below)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

3. Copy `.env.example` to `.env` and fill in the base URL:

   ```bash
   cp .env.example .env
   ```

   ```env
   WEBSITE_BASE_URL=https://your-website-url.nl
   ```

## Running tests

Run all tests across all configured browsers:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/semantic-search.spec.ts
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

Open the interactive UI mode:

```bash
npx playwright test --ui
```

## Viewing reports

After a test run, open the HTML report:

```bash
npx playwright show-report
```

## Configured browsers

| Project       | Device             |
|---------------|--------------------|
| Chromium      | Desktop Chrome     |
| Firefox       | Desktop Firefox    |
| WebKit        | Desktop Safari     |
| Mobile Chrome | Pixel 5            |
| Mobile Safari | iPhone 12          |
| Microsoft Edge| Desktop Edge       |
| Google Chrome | Desktop Chrome     |
