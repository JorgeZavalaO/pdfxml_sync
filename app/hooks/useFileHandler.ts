"use client";

import { useState, useCallback, type DragEvent } from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function useFileHandler(allowedExtension: string) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = useCallback(
    (f: File): string | null => {
      const ext = f.name.toLowerCase().slice(f.name.lastIndexOf("."));
      if (ext !== allowedExtension) {
        return "invalidType";
      }
      if (f.size > MAX_FILE_SIZE) {
        return "fileTooLarge";
      }
      return null;
    },
    [allowedExtension]
  );

  const handleFile = useCallback(
    (f: File) => {
      const validationError = validateFile(f);
      if (validationError) {
        setError(validationError);
        setFile(null);
        return;
      }
      setError(null);
      setFile(f);
    },
    [validateFile]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) handleFile(selectedFile);
    },
    [handleFile]
  );

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  return {
    file,
    error,
    isDragging,
    onDrop,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onFileSelect,
    clearFile,
  };
}
