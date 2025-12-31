'use server';

import { RunnerChargeBody } from '@/types/types';

// todo: add token fetch and refresh logic
const apiKey = process.env.RUN_API_KEY;

export async function runnerPostCharge(body: RunnerChargeBody) {
  const url = 'https://javelin.runpayments.io/api/v1/charge';
  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return error;
  }
}
