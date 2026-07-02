"use client";

import { useState, useCallback } from "react";
import { attachXmlToPdf } from "@/lib/pdf/attach-xml-to-pdf";

export function usePdfProcessor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const process = useCallback(async (pdfFile: File, xmlFile: File) => {
    setLoading(true);
    setError(null);
    try {
      const [pdfBytes, xmlBytes] = await Promise.all([
        readFileAsArrayBuffer(pdfFile),
        readFileAsArrayBuffer(xmlFile),
      ]);

      const result = await attachXmlToPdf({
        pdfBytes,
        xmlBytes,
        xmlFileName: xmlFile.name,
        description: "XML del comprobante electrónico",
      });

      const blob = new Blob([new Uint8Array(result)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const baseName = pdfFile.name.replace(/\.pdf$/i, "");
      a.download = `${baseName}_con_xml.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("processingError");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, process, reset };
}
