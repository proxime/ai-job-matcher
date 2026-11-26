interface FieldAriaOptions {
  hint?: boolean;
  error?: boolean;
}

export function fieldAria(id: string, { hint, error }: FieldAriaOptions) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`]
    .filter(Boolean)
    .join(" ");

  return {
    "aria-invalid": error || undefined,
    "aria-describedby": describedBy || undefined,
  };
}
