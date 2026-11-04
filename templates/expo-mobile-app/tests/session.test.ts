import { resolveProtectedRoute } from "../services/session";

describe("resolveProtectedRoute", () => {
  it("redirige a login si no hay token", () => {
    expect(resolveProtectedRoute(null)).toBe("/(auth)/login");
  });

  it("permite tabs si hay token", () => {
    expect(resolveProtectedRoute("jwt-token")).toBe("/(tabs)");
  });
});
