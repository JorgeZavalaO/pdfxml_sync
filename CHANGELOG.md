# Changelog

 Todas las cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto adheres a [Semantic Versioning](https://semver.org/lang/es/spec/v2.0.0.html).

## [1.0.0] - 2026-07-02

### Added

- Interfaz de usuario completa con landing page (hero, cómo funciona, características).
- Zonas de drag-and-drop para selección de archivos PDF y XML.
- Botón de file picker como alternativa al drag-and-drop.
- Preview de archivos seleccionados con nombre, tamaño y botón de eliminación.
- Procesamiento client-side con `pdf-lib` (sin envío al servidor).
- Descarga automática del PDF resultante con XML adjunto.
- Soporte bilingüe Español/Inglés con toggle de idioma.
- Persistencia de preferencia de idioma en `localStorage`.
- Validación de tipo de archivo (.pdf/.xml) y tamaño máximo (50 MB).
- Mensajes de error traducidos.
- Header sticky con efecto backdrop-blur.
- Sección de privacidad integrada en hero y footer.
- Responsive design con Tailwind CSS.

### Changed

- Migrado de procesamiento server-side (API route) a procesamiento 100% client-side.
- Eliminado endpoint `/api/pdf/attach-xml` (ya no necesario).

### Fixed

- Corregido error de hidratación causado por lectura de `localStorage` durante SSR.
- Implementado `useSyncExternalStore` para sincronización segura del idioma.
