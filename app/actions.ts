'use server';

import { RunnerChargeBody } from '@/types/types';
import { refreshRunApiToken } from '@lib/run-api';

const RUN_CHARGE_URL = 'https://javelin.runpayments.io/api/v1/charge';

let apiKey = process.env.RUN_API_KEY;

export async function runnerPostCharge(body: RunnerChargeBody) {
  try {
    let response = await fetch(RUN_CHARGE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      await refreshRunApiToken(apiKey).then((newApiKey: string) => {
        apiKey = newApiKey;
      });

      response = await fetch(RUN_CHARGE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error Posting Charge: ', error);
    return error;
  }
}
