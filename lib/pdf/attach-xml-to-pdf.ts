import { PDFDocument } from "pdf-lib";

type AttachXmlToPdfParams = {
  pdfBytes: ArrayBuffer | Uint8Array;
  xmlBytes: ArrayBuffer | Uint8Array;
  xmlFileName: string;
  description?: string;
};

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