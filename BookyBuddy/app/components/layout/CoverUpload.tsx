import React, { useEffect, useId, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

type CoverUploadProps = {
  label?: string;
  onChange?: (file: File | null) => void;
  maxSizeMB?: number;
  value?: File | null;
};

export function CoverUpload({
  label = "Zdjęcie okładki",
  onChange,
  maxSizeMB = 5,
  value,
}: CoverUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const file = value || null;

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileSelect = (f: File) => {
    setError(null);

    if (!f.type.startsWith("image/")) {
      setError("Wybierz plik graficzny (PNG/JPG/WebP).");
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (f.size > maxBytes) {
      setError(`Plik jest za duży. Max ${maxSizeMB} MB.`);
      return;
    }

    onChange?.(f);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFileSelect(f);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  };

  return (
    <div className="space-y-2">
      <label
        className="block text-sm font-medium text-slate-200"
        htmlFor={inputId}
      >
        {label}
      </label>

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative h-28 w-28 shrink-0 rounded-xl border border-dashed
            flex items-center justify-center transition
            ${
              isDragging
                ? "border-sky-400/80 bg-sky-400/10"
                : "border-slate-500/50 hover:border-slate-400/70"
            } bg-slate-900/20 text-slate-200`}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Podgląd okładki"
                className="h-full w-full rounded-xl object-cover"
              />
              <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10" />
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100/10">
                <Upload size={18} className="text-slate-200/90" />
              </div>
              <span className="text-xs text-slate-200/80">Dodaj zdjęcie</span>
            </div>
          )}
        </button>

        <div className="min-w-0 flex-1">
          {file ? (
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-100">{file.name}</p>
                <p className="text-xs text-slate-300/70">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => onChange?.(null)}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium
                  text-slate-200 hover:bg-slate-100/10"
                aria-label="Usuń zdjęcie"
              >
                <X size={14} />
                Usuń
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-300/70">
              Kliknij ramkę lub przeciągnij plik. PNG/JPG/WebP. Max {maxSizeMB}{" "}
              MB.
            </p>
          )}
          {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
        </div>
      </div>
    </div>
  );
}
