import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Usuarios" }} />
      <Stack.Screen name="users/[id]" options={{ title: "Detalle" }} />
    </Stack>
  );
}
