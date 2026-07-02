"use client";

import { useRef, type DragEvent, type ChangeEvent } from "react";
import { useLanguage } from "@/app/i18n/context";
import FilePreview from "./FilePreview";

type FileDropZoneProps = {
  file?: File | null;
  files?: File[];
  error: string | null;
  isDragging: boolean;
  fileType: "pdf" | "xml";
  multiple?: boolean;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onRemoveFile?: (index: number) => void;
};

export default function FileDropZone({
  file,
  files,
  error,
  isDragging,
  fileType,
  multiple,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onFileSelect,
  onClear,
  onRemoveFile,
}: FileDropZoneProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const isPdf = fileType === "pdf";
  const dropText = isPdf ? (multiple ? t.dropPdfs : t.dropPdf) : t.dropXml;
  const dropActiveText = isPdf ? (multiple ? t.dropPdfsActive : t.dropPdfActive) : t.dropXmlActive;
  const fileTypeLabel = isPdf ? (multiple ? t.fileTypes.pdfs : t.fileTypes.pdf) : t.fileTypes.xml;
  const accept = isPdf ? ".pdf" : ".xml";

  const hasFiles = multiple ? (files && files.length > 0) : file !== null;

  const borderColor = error
    ? "border-red-400 bg-red-50"
    : isDragging
    ? "border-blue-400 bg-blue-50"
    : hasFiles
    ? ""
    : "border-gray-300 bg-gray-50";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{fileTypeLabel}</label>

      {hasFiles ? (
        multiple && files ? (
          <div className="flex flex-col gap-2">
            {files.map((f, i) => (
              <FilePreview
                key={`${f.name}-${f.size}`}
                file={f}
                fileType={fileType}
                index={i}
                onClear={() => onRemoveFile?.(i)}
              />
            ))}
          </div>
        ) : file ? (
          <FilePreview file={file} fileType={fileType} onClear={onClear} />
        ) : null
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onClick={handleBrowse}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${borderColor}`}
        >
          {isDragging ? (
            <p className="font-medium text-blue-600">{dropActiveText}</p>
          ) : (
            <>
              <svg
                className={`mb-2 h-10 w-10 ${error ? "text-red-400" : "text-gray-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-500">{dropText}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowse();
                }}
                className="mt-3 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-colors hover:bg-gray-50"
              >
                {multiple ? t.browseMultiple : t.browse}
              </button>
            </>
          )}
        </div>
      )}

      {error === "invalidType" && (
        <p className="text-sm text-red-500">
          {t.error.invalidType.replace("{{type}}", fileTypeLabel)}
        </p>
      )}
      {error === "fileTooLarge" && (
        <p className="text-sm text-red-500">
          {t.error.fileTooLarge.replace("{{size}}", "50")}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onFileSelect}
        className="hidden"
      />
    </div>
  );
}
