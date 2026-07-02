# PDF XML Sync

Adjunte archivos XML a documentos PDF de forma rápida, segura y 100% local.

Combina su comprobante electrónico (factura, boleta, nota) con su representación PDF en un solo archivo, sin enviar ningún dato a servidores externos.

## Características

- **100% local** — Todo el procesamiento ocurre en el navegador. Ningún archivo se envía a la nube.
- **Fusión de PDFs** — Selecciona múltiples PDFs y se fusionan en un solo documento antes de adjuntar el XML.
- **Drag & drop** — Arrastre y suelte sus archivos PDF (uno o varios) y XML directamente en la interfaz.
- **Bilingüe** — Interfaz en Español e Inglés con toggle de idioma persistente.
- **Sin registro** — No se requiere crear cuenta ni instalar nada.
- **Procesamiento instantáneo** — El resultado se descarga automáticamente al hacer clic.
- **Estándar PDF** — Utiliza archivos adjuntos embebidos del estándar PDF, compatible con cualquier lector.

## Stack tecnológico

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [pdf-lib](https://pdf-lib.js.org/) — Manipulación de PDFs en el navegador
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript 5](https://www.typescriptlang.org/)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pdfxml_sync.git
cd pdfxml_sync

# Instalar dependencias
pnpm install

# Iniciar en modo desarrollo
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Uso

1. Abra la aplicación en su navegador.
2. Arrastre o seleccione uno o varios archivos **PDF** (se fusionarán en orden).
3. Arrastre o seleccione el archivo **XML** asociado.
4. Haga clic en **Fusionar PDFs y adjuntar XML**.
5. El PDF fusionado con el XML incrustado se descargará automáticamente.

## Estructura del proyecto

```
pdfxml_sync/
├── app/
│   ├── components/
│   │   ├── AttachButton.tsx      # Botón de procesamiento con spinner
│   │   ├── FileDropZone.tsx      # Zona drag-and-drop + file picker
│   │   ├── FilePreview.tsx       # Preview del archivo seleccionado
│   │   ├── Header.tsx            # Barra de navegación sticky
│   │   └── LanguageToggle.tsx    # Toggle de idioma ES/EN
│   ├── hooks/
│   │   ├── useFileHandler.ts     # Manejo de un archivo y validación
│   │   ├── useMultiFileHandler.ts # Manejo de múltiples archivos
│   │   └── usePdfProcessor.ts    # Procesamiento PDF + XML
│   ├── i18n/
│   │   ├── context.tsx           # Provider de idioma (useSyncExternalStore)
│   │   └── translations.ts       # Textos ES/EN
│   ├── globals.css               # Estilos Tailwind
│   ├── layout.tsx                # Layout raíz
│   └── page.tsx                  # Landing page + herramienta
├── lib/
│   └── pdf/
│       └── attach-xml-to-pdf.ts  # Adjuntar XML + fusión de PDFs
└── package.json
```

## Privacidad

Todos los archivos se procesan exclusivamente en el navegador del usuario. No se realizan uploads a servidores, no se almacenan copias temporales en la nube y no se rastrea actividad. Una vez descargado el resultado, los archivos originales se eliminan de la memoria del dispositivo.

## Licencia

MIT
