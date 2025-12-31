interface EnvConfig {
  NEXT_PUBLIC_RUN_MID: string;
  NEXT_PUBLIC_RUN_PUBLIC_KEY: string;
  RUN_API_KEY: string;
  RUN_REFRESH_TOKEN: string;
}

type EnvVarName = keyof EnvConfig;

const REQUIRED_ENV_VARS: EnvVarName[] = [
  'NEXT_PUBLIC_RUN_MID',
  'NEXT_PUBLIC_RUN_PUBLIC_KEY',
  'RUN_API_KEY',
  'RUN_REFRESH_TOKEN',
];

export class EnvValidationError extends Error {
  constructor(
    message: string,
    public readonly missingVars: string[]
  ) {
    super(message);
    this.name = 'EnvValidationError';
    Object.setPrototypeOf(this, EnvValidationError.prototype);
  }
}

/**
 * Validate that all required environment variables are present
 * @throws {EnvValidationError} if any required variables are missing
 */
export function validateEnv(): void {
  const missingVars: string[] = [];

  for (const varName of REQUIRED_ENV_VARS) {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    const message = `Missing required environment variables: ${missingVars.join(', ')}. Please check your .env file.`;
    throw new EnvValidationError(message, missingVars);
  }
}

export function getRequiredEnv(varName: string): string {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    throw new Error(`Required environment variable ${varName} is not set`);
  }
  return value;
}

/**
 * Validate environment variables and log the result
 */

let validationPerformed = false;
export function ensureEnvValidated(): void {
  if (validationPerformed) {
    return;
  }

  try {
    validateEnv();
    console.log('✓ Environment variables validated successfully');
    validationPerformed = true;
  } catch (error) {
    if (error instanceof EnvValidationError) {
      console.error('✗ Environment validation failed:', error.message);
      console.error('Missing variables:', error.missingVars);
      throw error;
    } else {
      throw error;
    }
  }
}
