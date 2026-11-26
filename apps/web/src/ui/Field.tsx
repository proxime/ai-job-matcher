import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-[15px] text-jc-pink-soft">
          {error}
        </p>
      )}
      {hint && (
        <p id={`${htmlFor}-hint`} className="text-[15px] text-jc-text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
