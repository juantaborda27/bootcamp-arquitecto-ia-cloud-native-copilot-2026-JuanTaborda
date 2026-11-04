import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_KEY, resolveProtectedRoute } from "../services/session";

export default function Index() {
  const [route, setRoute] = useState<ReturnType<typeof resolveProtectedRoute> | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY).then((token) => {
      setRoute(resolveProtectedRoute(token));
    });
  }, []);

  if (!route) {
    return <ActivityIndicator size="large" />;
  }
  return <Redirect href={route} />;
}
