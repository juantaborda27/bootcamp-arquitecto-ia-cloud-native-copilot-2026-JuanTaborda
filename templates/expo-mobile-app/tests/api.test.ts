import { createApiClient } from "../services/api";
import type { InternalAxiosRequestConfig } from "axios";

describe("api interceptor", () => {
  it("adjunta Bearer cuando hay token", async () => {
    const client = createApiClient(async () => "oidc-access-token");
    let seen: string | undefined;
    client.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      seen = String(config.headers.Authorization ?? "");
      return { data: [], status: 200, statusText: "OK", headers: {}, config };
    };
    await client.get("/api/users");
    expect(seen).toBe("Bearer oidc-access-token");
  });

  it("no inventa Authorization sin token", async () => {
    const client = createApiClient(async () => null);
    let seen: string | undefined;
    client.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
      seen = config.headers.Authorization as string | undefined;
      return { data: [], status: 200, statusText: "OK", headers: {}, config };
    };
    await client.get("/api/users");
    expect(seen).toBeUndefined();
  });
});
