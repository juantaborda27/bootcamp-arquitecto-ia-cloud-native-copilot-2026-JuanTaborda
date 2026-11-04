# Evidencia Lab 22.5 - Actividad Extra: Desarrollo e Integración de "VíaSegura" (App Móvil de Seguridad Vial en Tiempo Real)

**Fecha:** 2026-08-31  
**Rama:** Diego-Tique  
**Responsable:** Estudiante  
**Objetivo:** Construcción e integración de **VíaSegura**, una aplicación móvil multiplataforma (iOS/Android) orientada a la seguridad vial participativa para el reporte y alerta en tiempo real de peligros en la vía.

---

## 1. Herramientas de Desarrollo e IA Integradas

En el desarrollo de esta solución se utilizaron las siguientes herramientas avanzadas de IA, prototipado y workflows:

- **Google Antigravity (AGY IDE / CLI):** Entorno agentico avanzado de Google DeepMind para par-programming, refactorización limpia y generación asistida por IA.
- **Agente de Gemini:** Asistente especializado en Clean Architecture y React Native / Expo Router v57+.
- **Stitch with Google (https://stitch.withgoogle.com/):** Prototipado y exploración de sistemas de diseño móvil.
- **Skills.sh (https://skills.sh):** Carga e integración de habilidades (skills) y workflows reutilizables en asistentes de código AI.

---

## 2. Arquitectura Técnica y Estructura del Proyecto

La aplicación fue construida utilizando React Native con **Expo SDK 57**, **NativeWind** (TailwindCSS) y mapas de **OpenStreetMap** mediante **Leaflet.js** sobre eact-native-webview:

`	ext
src/
├── features/
│   ├── location/       # LocationContext, GPS, fórmula Haversine y geocodificación
│   ├── reports/        # Wizard de creación, reportEvents, persistencia de incidentes
│   ├── notifications/  # Motor de proximidad (<500m), ProximityAlertBanner, AsyncStorage
│   └── map/            # Mapa interactivo Leaflet.js / OpenStreetMap sobre WebView
├── components/         # UI compartida con NativeWind (TailwindCSS) e iconografía Lucide
└── app/                # Navegación basada en archivos con Expo Router v57+
`

### Componentes Clave:
- **Framework & UI:** React Native con Expo Router v57+ y **NativeWind** para estilos responsivos.
- **Visualización de Mapas:** OpenStreetMap renderizado mediante Leaflet.js sobre eact-native-webview (evitando bloqueos de llaves de Google Maps en Expo Go).
- **Motor de Proximidad:** Monitoreo GPS con fórmula Haversine notificando al usuario al estar a menos de 500m de un peligro.
- **Sincronización:** Emisor ligero de eventos eportEvents para refresco instantáneo de la interfaz sin recarga manual.

---

## 3. Entorno de Pruebas y Ejecución

La aplicación se ejecutó y validó en el **Emulador Android proporcionado por Android Studio**:

### Comandos Ejecutados:
`powershell
# 1. Iniciar servidor de desarrollo de Expo:
npx expo start --clear

# 2. Ejecutar en emulador Android nativo (Android Studio):
npx expo run:android

# 3. Generar compilación de producción APK:
cd android; .\gradlew assembleRelease
`

---

## 4. Resultados de la Validación

- **Emulador Android Studio:** Aplicación desplegada y ejecutándose sin errores en el emulador Android.
- **Renderizado de Mapa:** Mapas de OpenStreetMap cargados fluidamente mediante WebView.
- **Notificaciones & Alertas:** Banners flotantes (ProximityAlertBanner) y notificaciones locales activadas exitosamente al simular una proximidad menor a 500m.

---

## 5. Conclusión
La aplicación **VíaSegura** fue completada satisfactoriamente utilizando herramientas de IA de vanguardia (Google Antigravity, Agente de Gemini, Stitch with Google, Skills.sh) y tecnologías móviles de alto rendimiento (Expo SDK 57, NativeWind, OpenStreetMap sobre WebView).