import { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getUsers } from "../../services/api";

type User = { id: number; username?: string; name?: string; email: string };

export default function UsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then((response) => setUsers(response.data))
      .catch((err) => setError(err instanceof Error ? err.message : "API error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/(tabs)/users/${item.id}`)}>
          <View style={styles.card}>
            <Text style={styles.name}>{item.username || item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderBottomWidth: 1, borderColor: "#ddd" },
  name: { fontWeight: "600", fontSize: 16 },
  error: { padding: 16, color: "#b00020" },
});
