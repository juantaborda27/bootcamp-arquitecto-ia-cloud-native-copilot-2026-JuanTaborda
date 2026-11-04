import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_KEY } from "./session";

export const API_BASE = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";

export function createApiClient(
  getToken: () => Promise<string | null> = () => SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
): AxiosInstance {
  const api = axios.create({ baseURL: API_BASE });
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return api;
}

const api = createApiClient();

export const getUsers = () => api.get("/api/users");
export const getUserById = (id: number) => api.get(`/api/users/${id}`);
