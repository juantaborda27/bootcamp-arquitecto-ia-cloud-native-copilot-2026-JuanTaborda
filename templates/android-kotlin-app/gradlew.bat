@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
set "GRADLE_VERSION=8.11.1"
set "DIST=%SCRIPT_DIR%.gradle-dist\gradle-%GRADLE_VERSION%"
set "GRADLE_BAT=%DIST%\bin\gradle.bat"

where gradle >nul 2>nul
if %ERRORLEVEL%==0 (
  gradle %*
  exit /b %ERRORLEVEL%
)

if exist "%TEMP%\gradle-%GRADLE_VERSION%\bin\gradle.bat" (
  "%TEMP%\gradle-%GRADLE_VERSION%\bin\gradle.bat" %*
  exit /b %ERRORLEVEL%
)

if not exist "%GRADLE_BAT%" (
  echo Gradle no esta en PATH. Descargando Gradle %GRADLE_VERSION% ...
  powershell -NoProfile -Command ^
    "$ver='8.11.1'; $root=Join-Path '%SCRIPT_DIR%' '.gradle-dist'; $zip=Join-Path $env:TEMP ('gradle-'+$ver+'-bin.zip'); New-Item -ItemType Directory -Force -Path $root | Out-Null; if (-not (Test-Path $zip)) { Invoke-WebRequest -Uri ('https://services.gradle.org/distributions/gradle-'+$ver+'-bin.zip') -OutFile $zip }; Expand-Archive -Path $zip -DestinationPath $root -Force"
  if not exist "%GRADLE_BAT%" (
    echo No se pudo instalar Gradle. Ejecuta desde templates\android-kotlin-app:
    echo   .\gradlew.bat test --no-daemon
    exit /b 1
  )
)

"%GRADLE_BAT%" %*
exit /b %ERRORLEVEL%
