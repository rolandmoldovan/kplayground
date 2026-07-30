import * as dotenv from 'dotenv';

dotenv.config();

export interface AppConfig {
  baseUrl: string;
  signInPath: string;
  username: string;
  password: string;
  expectedPortfolioValue: string;
}

const REQUIRED_ENV_VARS = [
  'BASE_URL',
  'SIGN_IN_PATH',
  'USERNAME',
  'PASSWORD',
  'EXPECTED_PORTFOLIO_VALUE',
] as const;

function readConfig(): AppConfig {
  const missing = REQUIRED_ENV_VARS.filter((name) => {
    const value = process.env[name];
    return value === undefined || value.trim() === '';
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}.\n` +
        'Copy .env.example to .env and fill in all values before running the tests.'
    );
  }

  return {
    baseUrl: process.env.BASE_URL as string,
    signInPath: process.env.SIGN_IN_PATH as string,
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
    expectedPortfolioValue: process.env.EXPECTED_PORTFOLIO_VALUE as string,
  };
}

export const config: AppConfig = readConfig();
