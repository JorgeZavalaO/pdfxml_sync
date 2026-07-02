export const translations = {
  es: {
    // Header
    title: "PDF XML Sync",
    subtitle: "Adjunte archivos XML a documentos PDF",

    // Hero
    heroTitle: "Adjunta tu XML a un PDF en segundos",
    heroSubtitle:
      "Combina tu comprobante electrónico (factura, boleta, nota) con su representación PDF en un solo archivo, de forma rápida, segura y 100% local.",
    heroCta: "Comenzar ahora",

    // How it works
    howTitle: "Cómo funciona",
    steps: [
      {
        title: "Selecciona tu PDF",
        desc: "Arrastra o elige el archivo PDF de tu comprobante electrónico.",
      },
      {
        title: "Agrega el XML",
        desc: "Arrastra o elige el archivo XML asociado a ese comprobante.",
      },
      {
        title: "Descarga el resultado",
        desc: "Haz clic en adjuntar y obtén un PDF único con el XML incrustado.",
      },
    ],

    // Features
    featuresTitle: "Por qué usar PDF XML Sync",
    features: [
      {
        title: "100% local y privado",
        desc: "Todo el procesamiento ocurre en tu navegador. Ningún archivo sale de tu computadora ni se almacena en ningún servidor.",
      },
      {
        title: "Rápido y sin registro",
        desc: "No necesitas crear una cuenta ni instalar nada. Funciona al instante desde cualquier navegador moderno.",
      },
      {
        title: "Estándar PDF",
        desc: "Utiliza el formato de archivos adjuntos embebidos del estándar PDF. Compatible con cualquier lector de PDF.",
      },
    ],

    // Privacy
    privacyTitle: "Privacidad primero",
    privacyDesc:
      "Todos los archivos se procesan exclusivamente en tu navegador. No se realiza ninguna carga a servidores, no se almacenan copias temporales en la nube y no se rastrea tu actividad. Una vez que descargas el resultado, los archivos originales se eliminan de la memoria de tu dispositivo.",

    // Tool section
    toolTitle: "Fusionar PDFs y adjuntar XML",
    toolDesc:
      "Selecciona tus archivos a continuación. El proceso es completamente automático.",

    // Drop zones
    dropPdf: "Arrastra el archivo PDF aquí",
    dropPdfs: "Arrastra los archivos PDF aquí",
    dropXml: "Arrastra el archivo XML aquí",
    dropPdfActive: "Suelta el PDF aquí",
    dropPdfsActive: "Suelta los PDFs aquí",
    dropXmlActive: "Suelta el XML aquí",
    browse: "Seleccionar archivo",
    browseMultiple: "Seleccionar archivos",
    processing: "Procesando...",
    processingMultiple: "Fusionando {{count}} PDFs...",
    attach: "Adjuntar XML al PDF",
    mergeAttach: "Fusionar PDFs y adjuntar XML",
    success: "PDF con XML adjunto descargado correctamente",

    // Error messages
    error: {
      invalidType: "Tipo de archivo no válido. Solo se aceptan archivos {{type}}.",
      fileTooLarge: "El archivo es demasiado grande (máximo {{size}} MB).",
      processingError: "Error al procesar los archivos. Intenta nuevamente.",
    },

    // File types
    fileTypes: {
      pdf: "Documento PDF",
      pdfs: "Documentos PDF",
      xml: "Archivo XML",
    },

    // Misc
    size: "Tamaño",
    remove: "Eliminar",
    nFilesSelected: "{{count}} PDFs seleccionados",
    ready: "Listo para adjuntar",
    language: "Idioma",

    // Footer
    footer: "Todo el procesamiento se realiza localmente en tu navegador. Ningún archivo se envía a servidores externos.",
    footerMade: "Hecho con",
  },
  en: {
    // Header
    title: "PDF XML Sync",
    subtitle: "Attach XML files to PDF documents",

    // Hero
    heroTitle: "Attach your XML to a PDF in seconds",
    heroSubtitle:
      "Combine your electronic receipt (invoice, ticket, note) with its PDF representation into a single file — fast, secure, and 100% local.",
    heroCta: "Get started",

    // How it works
    howTitle: "How it works",
    steps: [
      {
        title: "Select your PDF",
        desc: "Drag or pick the PDF file of your electronic receipt.",
      },
      {
        title: "Add the XML",
        desc: "Drag or pick the XML file associated with that receipt.",
      },
      {
        title: "Download the result",
        desc: "Click attach and get a single PDF with the XML embedded.",
      },
    ],

    // Features
    featuresTitle: "Why use PDF XML Sync",
    features: [
      {
        title: "100% local & private",
        desc: "All processing happens in your browser. No files ever leave your computer or get stored on any server.",
      },
      {
        title: "Fast & no sign-up",
        desc: "No account needed, nothing to install. It works instantly from any modern browser.",
      },
      {
        title: "PDF standard",
        desc: "Uses the embedded file attachment format from the PDF standard. Compatible with any PDF reader.",
      },
    ],

    // Privacy
    privacyTitle: "Privacy first",
    privacyDesc:
      "All files are processed exclusively in your browser. No uploads to servers, no temporary cloud copies, no activity tracking. Once you download the result, the original files are removed from your device's memory.",

    // Tool section
    toolTitle: "Merge PDFs and attach XML",
    toolDesc:
      "Select your files below. The process is fully automatic.",

    // Drop zones
    dropPdf: "Drop the PDF file here",
    dropPdfs: "Drop the PDF files here",
    dropXml: "Drop the XML file here",
    dropPdfActive: "Release to drop the PDF",
    dropPdfsActive: "Release to drop the PDFs",
    dropXmlActive: "Release to drop the XML",
    browse: "Browse files",
    browseMultiple: "Browse files",
    processing: "Processing...",
    processingMultiple: "Merging {{count}} PDFs...",
    attach: "Attach XML to PDF",
    mergeAttach: "Merge PDFs and attach XML",
    success: "PDF with attached XML downloaded successfully",

    // Error messages
    error: {
      invalidType: "Invalid file type. Only {{type}} files are accepted.",
      fileTooLarge: "File is too large (max {{size}} MB).",
      processingError: "Error processing files. Please try again.",
    },

    // File types
    fileTypes: {
      pdf: "PDF Document",
      pdfs: "PDF Documents",
      xml: "XML File",
    },

    // Misc
    size: "Size",
    remove: "Remove",
    nFilesSelected: "{{count}} PDFs selected",
    ready: "Ready to attach",
    language: "Language",

    // Footer
    footer: "All processing is done locally in your browser. No files are sent to external servers.",
    footerMade: "Made with",
  },
};

export type Language = "es" | "en";
export type TranslationKeys = (typeof translations)["es"];
