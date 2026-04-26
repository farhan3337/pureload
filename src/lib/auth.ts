export const AUTH_TOKEN_KEY = 'pl-token';
export const AUTH_EXPIRES_KEY = 'pl-token-expires';
export const AUTH_EVENT = 'pl-auth-change';

export function getToken(): string | null {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const expires = localStorage.getItem(AUTH_EXPIRES_KEY);
  if (!token) return null;
  // Check expiry
  if (expires && new Date(expires) < new Date()) {
    clearToken();
    return null;
  }
  return token;
}

export function setToken(accessToken: string, expiresAt: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  localStorage.setItem(AUTH_EXPIRES_KEY, expiresAt);
  // Dispatch event so same-tab components react instantly
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EXPIRES_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
