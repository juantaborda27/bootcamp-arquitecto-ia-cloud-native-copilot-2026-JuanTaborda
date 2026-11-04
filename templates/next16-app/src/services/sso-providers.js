// Servicio de configuración SSO Multi-Proveedor (Entra ID, Google, Keycloak)
export const SSO_PROVIDERS = {
  ENTRA_ID: {
    name: 'Microsoft Entra ID',
    icon: '🔷',
    issuer: 'https://login.microsoftonline.com/common/v2.0',
    scopes: ['openid', 'profile', 'email'],
  },
  GOOGLE: {
    name: 'Google Identity',
    icon: '🔴',
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile', 'email'],
  },
  KEYCLOAK: {
    name: 'Keycloak Self-Hosted',
    icon: '🔑',
    issuer: 'http://localhost:8080/realms/bootcamp',
    scopes: ['openid', 'profile', 'email', 'roles'],
  },
};

export async function loginSSOProvider(providerKey, role = 'User') {
  const provider = SSO_PROVIDERS[providerKey];
  if (!provider) throw new Error(`Proveedor SSO no soportado: ${providerKey}`);

  // Simulación de intercambio de token OIDC con el emisor seleccionado
  const mockToken = `sso_${providerKey.toLowerCase()}_token_jwt_${Date.now()}`;
  const session = {
    provider: provider.name,
    user: {
      name: `user_${providerKey.toLowerCase()}`,
      email: `user@${providerKey.toLowerCase()}.com`,
      role: role,
    },
    accessToken: mockToken,
    expires: new Date(Date.now() + 3600 * 1000).toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem('enrollmenthub_sso_session', JSON.stringify(session));
  }
  return session;
}
