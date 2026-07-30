import { test, expect } from '@playwright/test';
import { config } from '../src/config/env';
import { SignInPage } from '../src/pages/sign-in.page';
import { PortfolioPage } from '../src/pages/portfolio.page';
import { parseCurrency } from '../src/helpers/currency';

test('portfolio total matches the expected value after signing in', async ({ page }) => {
  const signInPage = new SignInPage(page);
  const portfolioPage = new PortfolioPage(page);

  await signInPage.goto(config.signInPath);
  await signInPage.signIn(config.username, config.password);
  await portfolioPage.open();

  const expectedValue = parseCurrency(config.expectedPortfolioValue);

  await expect.poll(() => portfolioPage.getTotalValue()).toBe(expectedValue);
});
