import type { Page, Locator } from '@playwright/test';
import { NAVIGATION_SELECTORS, PORTFOLIO_SELECTORS } from '../selectors';
import { parseCurrency } from '../helpers/currency';

export class PortfolioPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: NAVIGATION_SELECTORS.portfolioLinkLabel }).click();
  }

  totalValueLocator(): Locator {
    return this.page.getByTestId(PORTFOLIO_SELECTORS.totalValue);
  }

  async getTotalValue(): Promise<number> {
    const displayedText = await this.totalValueLocator().innerText();
    const firstLine = displayedText.split('\n')[0];
    return parseCurrency(firstLine);
  }
}
