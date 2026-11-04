import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getUserById } from "../../../services/api";

type User = { id: number; username?: string; name?: string; email: string; status?: string };

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserById(Number(id))
      .then((response) => setUser(response.data))
      .catch((err) => setError(err instanceof Error ? err.message : "API error"));
  }, [id]);

  if (error) return <Text style={styles.error}>Error: {error}</Text>;
  if (!user) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.username || user.name}</Text>
      <Text>{user.email}</Text>
      {user.status ? <Text>Estado: {user.status}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 8 },
  name: { fontSize: 22, fontWeight: "600" },
  error: { padding: 16, color: "#b00020" },
});
