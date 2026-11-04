# Lab 22 - Mobile con React Native y Expo

## Objetivo
Construir una aplicación mobile cross-platform (Android e iOS) con React Native y Expo
que consuma las APIs del bootcamp e integre autenticación OIDC.

El laboratorio usa Expo SDK 57 con React Native 0.86, la combinación estable publicada por Expo. React Native Community CLI sin framework se reserva para casos con restricciones nativas justificadas. Flutter está fuera del alcance.

## Prerrequisitos
- Labs 05 o 06 completados (contexto de frontend React/TypeScript).
- Lab 11 (OIDC) completado o proveedor OIDC disponible.
- Node.js 24 LTS instalado.
- Expo CLI mediante `npx`; no instales globalmente el paquete heredado `expo-cli`.
- Emulador Android (Android Studio) o dispositivo con development build. iOS requiere macOS con Xcode o EAS Build.

## Paso a paso

### 1. Crear proyecto Expo con TypeScript
```bash
npx create-expo-app@latest mobile-app --template default@sdk-57
cd mobile-app
npx expo install expo-dev-client
```

La plantilla incluye Expo Router. Conserva las versiones resueltas y el lockfile; no cambies manualmente React Native por 0.87 dentro de Expo 57.

### 2. Instalar dependencias de navegación y HTTP
```bash
npx expo install react-native-safe-area-context react-native-screens
npm install @react-navigation/native @react-navigation/native-stack
npm install axios
```

### 3. Instalar dependencias de autenticación OIDC
```bash
npx expo install expo-auth-session expo-crypto expo-web-browser
npx expo install expo-secure-store
```

### 4. Definir el servicio de API
Crear `services/api.ts`:
```typescript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUsers = () => api.get('/users');
export const getUserById = (id: number) => api.get(`/users/${id}`);
```

### 5. Configurar autenticación OIDC con PKCE
Crear `services/auth.ts`:
```typescript
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

const discovery = {
  authorizationEndpoint: process.env.EXPO_PUBLIC_OIDC_AUTH_URL!,
  tokenEndpoint: process.env.EXPO_PUBLIC_OIDC_TOKEN_URL!,
};

export async function login() {
  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'mobileapp' });
  const request = new AuthSession.AuthRequest({
    clientId: process.env.EXPO_PUBLIC_OIDC_CLIENT_ID!,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
    usePKCE: true,
  });
  const result = await request.promptAsync(discovery);
  if (result.type === 'success') {
    const tokenResponse = await AuthSession.exchangeCodeAsync(
      { code: result.params.code, redirectUri, extraParams: { code_verifier: request.codeVerifier! } },
      discovery
    );
    await SecureStore.setItemAsync('access_token', tokenResponse.accessToken);
    return tokenResponse;
  }
  throw new Error('Login cancelled or failed');
}

export async function logout() {
  await SecureStore.deleteItemAsync('access_token');
}
```

### 6. Crear pantalla de login
Crear `app/(auth)/login.tsx`:
```typescript
import { View, Button, Text, StyleSheet } from 'react-native';
import { login } from '../../services/auth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const handleLogin = async () => {
    await login();
    router.replace('/(tabs)');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bootcamp App</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
```

### 7. Crear pantalla de lista de usuarios
Crear `app/(tabs)/index.tsx`:
```typescript
import { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getUsers } from '../../services/api';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then(r => setUsers(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  return (
    <FlatList
      data={users}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }: any) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}
```

### 8. Crear y ejecutar development build
```bash
# Primera compilación local Android
npx expo run:android

# Siguientes sesiones
npx expo start --dev-client

# iOS local (requiere macOS)
npx expo run:ios

# Build remoto opcional
npx eas-cli build --profile development --platform android
```

Expo Go puede servir para exploración, pero la versión publicada en tiendas puede no corresponder al SDK 57. La evidencia obligatoria usa development build.

### 9. Variables de entorno de Expo
Crear `.env.local`:
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
EXPO_PUBLIC_OIDC_AUTH_URL=http://localhost:8080/realms/bootcamp/protocol/openid-connect/auth
EXPO_PUBLIC_OIDC_TOKEN_URL=http://localhost:8080/realms/bootcamp/protocol/openid-connect/token
EXPO_PUBLIC_OIDC_CLIENT_ID=mobile-app
```
> `10.0.2.2` es el localhost del host desde el emulador Android.

## Validación
- Development build inicia sin errores.
- Pantalla de lista muestra datos reales desde la API.
- Login OIDC completa el flujo y almacena el token en SecureStore.
- Rutas protegidas redirigen al login si no hay token.
- La app funciona en emulador Android (mínimo requerido).

## Rúbrica
- 40% pantallas de lista y detalle funcionales con datos reales.
- 30% integración con API y autenticación OIDC.
- 30% evidencia en emulador o dispositivo físico.

## Entregables
- Registra los resultados obtenidos en la carpeta labs/evidencias.
- Crea la evidencia por laboratorio siguiendo la nomenclatura lab-XX-tema. Si tu evidencia requiere mas de un archivo, crea una carpeta con esa misma nomenclatura y guarda alli todos los archivos (por ejemplo: .md, .pdf, .docx, imagenes o capturas).

- Código en rama `lab-22`.
- EVIDENCIAS.md con:
  - Capturas de pantalla del emulador (login, lista, detalle).
  - Log de la petición HTTP a la API.
