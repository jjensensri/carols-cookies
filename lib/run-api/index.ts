'use server';

import { RefreshAPIKeyResponse } from '@lib/run-api/types';

const RUN_REFRESH_API_KEY_URL = 'https://javelin.runpayments.io/api/v1/api_keys/refresh';

export async function refreshRunApiToken(staleApiKey?: string) {
  if (!staleApiKey) {
    return '';
  }

  try {
    const response = await fetch(RUN_REFRESH_API_KEY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${staleApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: staleApiKey,
      }),
    });
    const data: RefreshAPIKeyResponse = await response.json();
    return data.api_key;
  } catch (error) {
    console.error('Error refreshing Run API Key: ', error);
    throw error;
  }
}
