"use client";

import { useLanguage } from "@/app/i18n/context";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
      title="Español / English"
    >
      {lang === "es" ? (
        <>
          <span className="text-base">🇪🇸</span>
          <span>ES</span>
        </>
      ) : (
        <>
          <span className="text-base">🇬🇧</span>
          <span>EN</span>
        </>
      )}
    </button>
  );
}
