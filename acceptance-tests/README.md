# Acceptance Test Suite

30 Jul 2026

AI Prompt(s) used: Create a readme.md file for the given project, scan each forder, figure out the way it works and create the file.

**Result: 1 passed · 0 failed**

An automated browser test that signs into the application, opens the
portfolio view, and checks that the displayed total matches an expected
value. Built with [Playwright](https://playwright.dev/) and TypeScript.

This guide assumes no prior experience with Node.js or Playwright.

## Directory layout

```
acceptance-tests/
├── src/
│   ├── config/env.ts        # Loads and validates environment variables
│   ├── helpers/currency.ts   # Parses a displayed currency string into a number
│   ├── pages/                # Page Object Model classes (one per page)
│   │   ├── sign-in.page.ts
│   │   └── portfolio.page.ts
│   └── selectors/index.ts    # All test-ID selectors, in one place
├── tests/
│   └── portfolio-value.spec.ts  # The acceptance test itself
├── playwright.config.ts
├── tsconfig.json
├── .env.example
└── .env                       # You create this locally; it is gitignored
```

Tests read as plain steps (`signIn.goto(...)`, `signIn.signIn(...)`,
`portfolio.open()`, `portfolio.getTotalValue()`) because all selector and
locator details live in `src/pages/*` and `src/selectors/index.ts` instead of
the test file.

## 1. Install Node.js

You need Node.js version 18 or later.

- Check if you already have it: open a terminal and run `node --version`.
- If that fails or shows a version below 18, install Node.js from
  [nodejs.org](https://nodejs.org/) (choose the "LTS" installer for your
  operating system) and follow its installer prompts.

## 2. Install project dependencies

From inside this `acceptance-tests` directory, run:

```
npm install
```

This downloads Playwright, TypeScript, and the other packages listed in
`package.json` into a local `node_modules` folder.

## 3. Install Playwright's browsers

Playwright drives real browser engines that are not part of Node.js, so they
need a separate install step:

```
npx playwright install --with-deps chromium
```

- `--with-deps` also installs the operating system libraries the browser
  needs to run. On Linux (Ubuntu or Alpine) this step may ask for `sudo`
  access to install those system packages.
- You only need to do this once per machine (rerun it if Playwright ever
  reports a missing-browser error).

## 4. Create your local configuration

Copy the example file to a real `.env` file:

```
cp .env.example .env
```

Then open `.env` in a text editor and fill in every value:

| Variable                    | Meaning                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| `BASE_URL`                   | The root URL of the application under test                     |
| `SIGN_IN_PATH`                | The path to the sign-in page, e.g. `/login`                    |
| `USERNAME`                    | The username or email to sign in with                          |
| `PASSWORD`                    | The matching password                                          |
| `EXPECTED_PORTFOLIO_VALUE`    | The total portfolio value the test should see, e.g. `12,345.67` |

`.env` is listed in `.gitignore` and will never be committed — it is the only
place the real site address and credentials should be written down.

If any of these are missing when you run the test, it will stop immediately
with a message telling you which variable is missing, rather than failing
later with a confusing timeout.

## 5. Run the test

```
npm test
```

This runs headless (no visible browser window) by default, which is what you
want on a Linux server or CI-like environment.

## 6. Run headed, for debugging

To watch the browser while the test runs (useful when a step isn't doing what
you expect):

```
npm run test:headed
```

This requires a graphical display, so it works on a desktop machine but not on
a headless Linux server.

## 7. View the HTML report

After a run, Playwright writes an HTML report to `playwright-report/` in this
directory. Open it with:

```
npm run report
```

This starts a local web server and opens the report in your default browser,
showing pass/fail status, timings, and (for failures) traces and screenshots.

## Wiring this into CI/CD

Run it as a job on every pull request and on merge to the main branch,
plus on a schedule (e.g. hourly) so it also catches failures unrelated to a
deploy. Provide `BASE_URL`, `SIGN_IN_PATH`, `USERNAME`, `PASSWORD`, and
`EXPECTED_PORTFOLIO_VALUE` as pipeline secrets/environment variables rather
than a committed `.env`. On failure, fail the pipeline step so it blocks the
merge or pages on-call, and publish the `playwright-report/` folder (and
`test-results/` traces) as a build artifact so a human can open the HTML
report and see exactly which step failed.

## Selectors

A few selectors could not be determined without access to the live
application (sign-in inputs, submit button, portfolio navigation link). They
are defined as named constants in `src/selectors/index.ts`.
