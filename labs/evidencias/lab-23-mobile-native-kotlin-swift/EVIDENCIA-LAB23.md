# Evidencia Lab 23 - Mobile nativo Kotlin (Android) y Swift (iOS opcional)

**Fecha:** 2026-08-28  
**Rama:** `Diego-Tique`  
**Objetivo:** Lista/detalle de usuarios con estados loading/error y `./gradlew test`.

---

## Track A — Android (`templates/android-kotlin-app/`)

- Dominio: `User`, `ApiService`, `UsersViewModel` (StateFlow: Loading / Success / Error).
- UI Compose de referencia (no compilada en el módulo JVM): `android/UsersScreen.kt`, `android/AppNavigation.kt`.
- Permiso de red: `android/AndroidManifest.xml`.
- BASE_URL emulador: `http://10.0.2.2:5000/`.

### `gradle test` (Gradle 8.11.1, JDK del sistema)

```text
> Task :test
BUILD SUCCESSFUL in 11s
3 tests, 0 failures
```

Casos: éxito con `diego_tique`, error descriptivo si la API falla, detalle nombre/email.

No se lanzó el emulador Android Studio en esta máquina; las capturas de lista en dispositivo quedan pendientes.

---

## Track B — iOS (`templates/ios-swift-app/`) — opcional

Fuentes SwiftUI (`UsersView`, `UserDetailView`, `ApiService`) listas para Xcode. No hay macOS/Xcode aquí: no hay simulador iPhone.

---

## Cómo repetir tests

```powershell
cd templates/android-kotlin-app
.\gradlew.bat test --no-daemon
```

`gradle` a secas no existe en Windows si no instalaste Gradle ni Android Studio. `gradlew.bat` descarga Gradle 8.11.1 la primera vez.
