"use client";

import { useState, useCallback, type DragEvent } from "react";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function useMultiFileHandler(allowedExtension: string) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
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

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const validFiles: File[] = [];

      for (const f of fileArray) {
        const validationError = validateFile(f);
        if (validationError) {
          setErrors([validationError]);
          return;
        }
        validFiles.push(f);
      }

      setErrors([]);
      setFiles(prev => [...prev, ...validFiles]);
    },
    [validateFile]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
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
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
    },
    [addFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setErrors([]);
  }, []);

  return {
    files,
    errors,
    isDragging,
    onDrop,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onFileSelect,
    removeFile,
    clearAll,
  };
}
