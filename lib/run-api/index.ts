'use server';

const RUN_REFRESH_API_KEY_URL = 'https://javelin.runpayments.io/api/v1/api_keys/refresh';

export async function refreshRunApiToken(staleApiKey: string = '', refreshToken: string = '') {
  if (!staleApiKey || !refreshToken) {
    return '';
  }

  try {
    const response = await fetch(RUN_REFRESH_API_KEY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: staleApiKey,
        refresh_token: refreshToken,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error refreshing Run API Key: ', error);
    throw error;
  }
}
