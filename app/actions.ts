'use server';

import { RunnerChargeBody } from '@/types/types';

const RUNNER_API_BASE_URL = 'https://javelin.runpayments.io/api/v1';
const refreshToken = process.env.RUN_REFRESH_TOKEN;
const initialToken = process.env.RUN_API_KEY;

let cachedToken: string | null = null;
let apiTokenExpiration: number | null = null; // Unix timestamp in seconds

/**
 * Refreshes the Token using the refresh token
 * Requires a valid current Token in the Authorization header
 */
async function refreshTokenFn(currentToken: string): Promise<{ token: string; expiresAt: number }> {
  const url = `${RUNNER_API_BASE_URL}/api_keys/refresh`;
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${currentToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    return {
      token: data.api_key,
      expiresAt: data.api_key_expires_at, // Unix timestamp in seconds
    };
  } catch (error: any) {
    console.error('Failed to refresh Token: ', error);
    throw error;
  }
}

/**
 * Gets a valid Token, refreshing if necessary
 * Tokens expire after 1 hour per Run Payments docs
 */
async function getValidToken(): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const bufferSeconds = 5 * 60; // 5 minutes buffer before expiration
  
  // Check if we have a cached Token and it's still valid
  if (cachedToken && apiTokenExpiration) {
    if (apiTokenExpiration - nowSeconds > bufferSeconds) {
      return cachedToken;
    }
  }
  
  // Use cached key or initial key for refresh request
  const currentToken = cachedToken || initialToken;
  
  if (!currentToken) {
    throw new Error('No Token available for refresh. Set RUN_API_KEY environment variable.');
  }
  
  // Refresh the Token
  const { token, expiresAt } = await refreshTokenFn(currentToken);
  cachedToken = token;
  apiTokenExpiration = expiresAt;
  
  return token;
}

export async function runnerPostCharge(body: RunnerChargeBody) {
  const url = `${RUNNER_API_BASE_URL}/charge`;
  
  try {
    // Get a valid Token (will refresh if needed)
    const token = await getValidToken();
    
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    
    const response = await fetch(url, options);
    
    // If we get a 401, the token might be invalid, try refreshing once
    if (response.status === 401) {
      console.log('Token expired, refreshing...');
      cachedToken = null; // Invalidate cache
      apiTokenExpiration = null;
      const newToken = await getValidToken();
      
      const retryOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      
      const retryResponse = await fetch(url, retryOptions);
      return await retryResponse.json();
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Charge request failed:', error);
    throw error;
  }
}

