const requiredEnvKeys = ['AUTH0_DOMAIN', 'AUTH0_CLIENT_ID', 'AUTH0_AUDIENCE'] as const

export const env = {
  AUTH0_DOMAIN: import.meta.env.AUTH0_DOMAIN ?? '',
  AUTH0_CLIENT_ID: import.meta.env.AUTH0_CLIENT_ID ?? '',
  AUTH0_AUDIENCE: import.meta.env.AUTH0_AUDIENCE ?? '',
}

export function assertRequiredEnv(): void {
  const missingKeys = requiredEnvKeys.filter((key) => !env[key])

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing Auth0 env vars: ${missingKeys.join(', ')} must be configured before starting the app.`,
    )
  }
}
