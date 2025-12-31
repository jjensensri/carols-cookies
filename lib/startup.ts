import { ensureEnvValidated } from './env-validation';

if (typeof window === 'undefined') {
  ensureEnvValidated(); 
}
