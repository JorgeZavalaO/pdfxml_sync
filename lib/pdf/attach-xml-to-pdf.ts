import { PDFDocument } from "pdf-lib";

type AttachXmlToPdfParams = {
  pdfBytes: ArrayBuffer | Uint8Array;
  xmlBytes: ArrayBuffer | Uint8Array;
  xmlFileName: string;
  description?: string;
};

async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsArrayBuffer(file);
  });
}

export async function attachXmlToPdf({
  pdfBytes,
  xmlBytes,
  xmlFileName,
  description = "Archivo XML adjunto al PDF",
}: AttachXmlToPdfParams): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);

  await pdfDoc.attach(xmlBytes, xmlFileName, {
    mimeType: "application/xml",
    description,
    creationDate: new Date(),
    modificationDate: new Date(),
  });

  const finalPdfBytes = await pdfDoc.save();

  return finalPdfBytes;
}

export async function mergePdfsAndAttachXml(
  pdfFiles: File[],
  xmlBytes: ArrayBuffer | Uint8Array,
  xmlFileName: string
): Promise<Uint8Array> {
  if (pdfFiles.length === 0) throw new Error("No PDF files provided");

  const firstPdfBytes = await readFileAsArrayBuffer(pdfFiles[0]);
  const mergedPdf = await PDFDocument.load(firstPdfBytes);

  for (let i = 1; i < pdfFiles.length; i++) {
    const currentPdfBytes = await readFileAsArrayBuffer(pdfFiles[i]);
    const currentPdf = await PDFDocument.load(currentPdfBytes);
    const pageIndices = currentPdf.getPageIndices();
    const copiedPages = await mergedPdf.copyPages(currentPdf, pageIndices);
    for (const page of copiedPages) {
      mergedPdf.addPage(page);
    }
  }

  await mergedPdf.attach(xmlBytes, xmlFileName, {
    mimeType: "application/xml",
    description: "XML del comprobante electrónico",
    creationDate: new Date(),
    modificationDate: new Date(),
  });

  const finalPdfBytes = await mergedPdf.save();
  return finalPdfBytes;
}