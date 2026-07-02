"use client";

import { useState, useCallback } from "react";
import { attachXmlToPdf, mergePdfsAndAttachXml } from "@/lib/pdf/attach-xml-to-pdf";

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

  const downloadPdf = useCallback((bytes: Uint8Array, filename: string) => {
    const blob = new Blob([bytes.slice()], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

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

      const baseName = pdfFile.name.replace(/\.pdf$/i, "");
      downloadPdf(result, `${baseName}_con_xml.pdf`);
    } catch {
      setError("processingError");
    } finally {
      setLoading(false);
    }
  }, [downloadPdf]);

  const processMultiple = useCallback(async (pdfFiles: File[], xmlFile: File) => {
    setLoading(true);
    setError(null);
    try {
      const xmlBytes = await readFileAsArrayBuffer(xmlFile);
      const result = await mergePdfsAndAttachXml(pdfFiles, xmlBytes, xmlFile.name);
      downloadPdf(result, "pdfs_fusionados_con_xml.pdf");
    } catch {
      setError("processingError");
    } finally {
      setLoading(false);
    }
  }, [downloadPdf]);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, process, processMultiple, reset };
}
