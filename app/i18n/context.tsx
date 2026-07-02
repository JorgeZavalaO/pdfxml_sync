"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translations, type Language, type TranslationKeys } from "./translations";

const STORAGE_KEY = "pdfxml-lang";

function getSnapshot(): Language {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "es";
}

function subscribe(callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => "es" as Language);

  const handleSetLang = useCallback((newLang: Language) => {
    localStorage.setItem(STORAGE_KEY, newLang);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
