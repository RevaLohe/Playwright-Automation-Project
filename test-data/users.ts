/**
 * Sauce Demo test users. Set credentials via .env (see .env.example).
 * Never commit real values; use GitHub Secrets / .env for CI and local.
 */
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing env: ${name}. Copy .env.example to .env and set values, or set in GitHub Secrets for CI.`
    );
  }
  return value;
}

export const users = {
  valid: {
    get username(): string {
      return getEnv('SAUCE_DEMO_USERNAME');
    },
    get password(): string {
      return getEnv('SAUCE_DEMO_PASSWORD');
    },
  },
  invalid: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
} as const;
