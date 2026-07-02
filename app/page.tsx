"use client";

import { useFileHandler } from "@/app/hooks/useFileHandler";
import { useMultiFileHandler } from "@/app/hooks/useMultiFileHandler";
import { usePdfProcessor } from "@/app/hooks/usePdfProcessor";
import Header from "@/app/components/Header";
import FileDropZone from "@/app/components/FileDropZone";
import AttachButton from "@/app/components/AttachButton";
import { useLanguage } from "@/app/i18n/context";

function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-8 pt-10 sm:pb-12 sm:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          100% local — tus archivos nunca salen de tu dispositivo
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          {t.heroSubtitle}
        </p>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Sin registro
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instantáneo
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Privacidad total
          </span>
        </div>
      </div>
    </section>
  );
}

function ToolSection() {
  const { t } = useLanguage();
  const multiPdfHandler = useMultiFileHandler(".pdf");
  const xmlHandler = useFileHandler(".xml");
  const { loading, error, processMultiple } = usePdfProcessor();

  const ready = multiPdfHandler.files.length > 0 && xmlHandler.file !== null && !loading;

  const handleAttach = () => {
    if (multiPdfHandler.files.length > 0 && xmlHandler.file) {
      processMultiple(multiPdfHandler.files, xmlHandler.file);
    }
  };

  const buttonLabel = loading
    ? t.processingMultiple.replace("{{count}}", String(multiPdfHandler.files.length))
    : t.mergeAttach;

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t.toolTitle}</h2>
          <p className="mt-2 text-sm text-gray-500">{t.toolDesc}</p>
        </div>

        <div className="mt-8 space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-7">
          <FileDropZone
            files={multiPdfHandler.files}
            error={multiPdfHandler.errors.length > 0 ? multiPdfHandler.errors[0] : null}
            isDragging={multiPdfHandler.isDragging}
            fileType="pdf"
            multiple
            onDrop={multiPdfHandler.onDrop}
            onDragOver={multiPdfHandler.onDragOver}
            onDragEnter={multiPdfHandler.onDragEnter}
            onDragLeave={multiPdfHandler.onDragLeave}
            onFileSelect={multiPdfHandler.onFileSelect}
            onClear={multiPdfHandler.clearAll}
            onRemoveFile={multiPdfHandler.removeFile}
          />
          <FileDropZone
            file={xmlHandler.file}
            error={xmlHandler.error}
            isDragging={xmlHandler.isDragging}
            fileType="xml"
            onDrop={xmlHandler.onDrop}
            onDragOver={xmlHandler.onDragOver}
            onDragEnter={xmlHandler.onDragEnter}
            onDragLeave={xmlHandler.onDragLeave}
            onFileSelect={xmlHandler.onFileSelect}
            onClear={xmlHandler.clearFile}
          />
          <AttachButton onClick={handleAttach} disabled={!ready} loading={loading} label={buttonLabel} />

          {error && (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.error.processingError}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { t } = useLanguage();
  const steps = t.steps as Array<{ title: string; desc: string }>;

  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t.howTitle}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-col sm:items-center sm:text-center sm:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base">
                {i + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useLanguage();
  const features = t.features as Array<{ title: string; desc: string }>;

  const featureIcons = [
    <svg key="lock" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>,
    <svg key="zap" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg key="document" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>,
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {t.featuresTitle}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition-colors hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                {featureIcons[i]}
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-gray-400 sm:flex-row sm:text-left">
        <p>{t.footer}</p>
        <p>
          {t.footerMade}{" "}
          <svg
            className="mx-0.5 inline-block h-3.5 w-3.5 text-red-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <ToolSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}
