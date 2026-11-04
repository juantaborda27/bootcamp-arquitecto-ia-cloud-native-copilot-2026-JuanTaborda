import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_KEY } from "./session";

export const oidcDiscovery = {
  authorizationEndpoint: process.env.EXPO_PUBLIC_OIDC_AUTH_URL || "",
  tokenEndpoint: process.env.EXPO_PUBLIC_OIDC_TOKEN_URL || "",
};

export function buildAuthRequest() {
  const redirectUri = AuthSession.makeRedirectUri({ scheme: "mobileapp" });
  return new AuthSession.AuthRequest({
    clientId: process.env.EXPO_PUBLIC_OIDC_CLIENT_ID || "mobile-app",
    redirectUri,
    scopes: ["openid", "profile", "email"],
    usePKCE: true,
  });
}

export async function persistAccessToken(accessToken: string): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
}

export async function login() {
  const request = buildAuthRequest();
  const redirectUri = request.redirectUri;
  const result = await request.promptAsync(oidcDiscovery);
  if (result.type !== "success") {
    throw new Error("Login cancelled or failed");
  }
  const tokenResponse = await AuthSession.exchangeCodeAsync(
    {
      clientId: process.env.EXPO_PUBLIC_OIDC_CLIENT_ID || "mobile-app",
      code: result.params.code,
      redirectUri,
      extraParams: { code_verifier: request.codeVerifier! },
    },
    oidcDiscovery
  );
  await persistAccessToken(tokenResponse.accessToken);
  return tokenResponse;
}

export async function logout() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}
