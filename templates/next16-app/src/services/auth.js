// Servicio de Autenticación OIDC / NextAuth Helper
const AUTH_STORAGE_KEY = 'enrollmenthub_oidc_session';

export function getOIDCSession() {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export async function loginOIDC(username = 'diego_tique', role = 'Admin') {
  try {
    // Petición al endpoint backend OIDC /api/auth/token
    const res = await fetch('http://localhost:8000/api/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, role }),
    });

    let token = 'mock_jwt_oidc_token_12345';
    if (res.ok) {
      const data = await res.json();
      token = data.token || token;
    }

    const session = {
      user: {
        name: username,
        email: `${username}@globaledb.com`,
        role: role,
      },
      accessToken: token,
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return session;
  } catch (error) {
    console.error('Error en autenticación OIDC:', error);
    const fallbackSession = {
      user: { name: username, email: `${username}@globaledb.com`, role },
      accessToken: `mock_jwt_${role.toLowerCase()}_token`,
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackSession));
    return fallbackSession;
  }
}

export function logoutOIDC() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
