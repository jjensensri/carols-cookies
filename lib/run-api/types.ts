export type RunRefreshAPIKeyResponse = {
  api_key: string;
  public_key: string;
  refresh_token: string;
  api_key_expires_at: number;
  refresh_token_expires_at: number;
};
