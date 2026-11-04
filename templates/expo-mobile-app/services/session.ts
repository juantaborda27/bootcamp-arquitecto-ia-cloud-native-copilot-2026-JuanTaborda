export const ACCESS_TOKEN_KEY = "access_token";

export function resolveProtectedRoute(token: string | null): "/(tabs)" | "/(auth)/login" {
  return token ? "/(tabs)" : "/(auth)/login";
}
