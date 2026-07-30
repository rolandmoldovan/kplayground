import type { Page } from '@playwright/test';
import { SIGN_IN_SELECTORS } from '../selectors';

export class SignInPage {
  constructor(private readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.page.locator(`[name="${SIGN_IN_SELECTORS.usernameInputName}"]`).fill(username);
    await this.page.locator(`[name="${SIGN_IN_SELECTORS.passwordInputName}"]`).fill(password);
    await this.page.locator(`button[type="${SIGN_IN_SELECTORS.submitButtonType}"]`).click();
  }
}
