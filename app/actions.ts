'use server';

import { RunnerChargeBody } from '@/types/types';
import { processPaymentCharge } from '@lib/run-api';

export async function runnerProcessPaymentCharge(body: RunnerChargeBody) {
  try {
    return await processPaymentCharge(body);
  } catch (error: any) {
    console.error('Runner Error: Cannot process payment charge: ', error);
    return error;
  }
}
