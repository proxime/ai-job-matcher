import { zodResolver } from "@hookform/resolvers/zod";
import { MAX_OFFER_TEXT_LENGTH } from "@jm/shared";
import clsx from "clsx";
import { useId, useRef, type KeyboardEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Field } from "../../ui/Field.tsx";
import { fieldAria } from "../../ui/field-aria.ts";
import { button, input } from "../../ui/styles.ts";
import {
  analyzeFormSchema,
  type AnalyzeFormValues,
  type AnalyzeMode,
} from "./schema.ts";

const tabs: { id: AnalyzeMode; label: string }[] = [
  { id: "link", label: "Paste link" },
  { id: "text", label: "Paste text" },
];

const linkHint =
  "Works for many job boards. If a site blocks automated access, use the extension or paste the text.";
const textHint = `Paste the whole ad, up to ${MAX_OFFER_TEXT_LENGTH.toLocaleString("en-US")} characters.`;

interface AnalyzeFormProps {
  defaultValues: AnalyzeFormValues;
  onSubmit: (values: AnalyzeFormValues) => void;
}

export function AnalyzeForm({ defaultValues, onSubmit }: AnalyzeFormProps) {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AnalyzeFormValues>({
    resolver: zodResolver(analyzeFormSchema),
    defaultValues,
  });
  const mode = useWatch({ control, name: "mode" });
  const baseId = useId();
  const tabRefs = useRef<Record<AnalyzeMode, HTMLButtonElement | null>>({
    link: null,
    text: null,
  });
  const inputId = `${baseId}-input`;
  const panelId = `${baseId}-panel`;

  const switchWithArrows = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    const next = mode === "link" ? "text" : "link";
    setValue("mode", next);
    tabRefs.current[next]?.focus();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div
        role="tablist"
        aria-label="How to add the offer"
        className="flex gap-1 self-start rounded-jc bg-jc-surface p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[tab.id] = element;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={mode === tab.id}
            aria-controls={panelId}
            tabIndex={mode === tab.id ? 0 : -1}
            onClick={() => setValue("mode", tab.id)}
            onKeyDown={switchWithArrows}
            className={clsx("min-h-11 cursor-pointer rounded-[9px] px-5", {
              "bg-jc-text font-bold text-jc-bg": mode === tab.id,
              "font-medium text-jc-text hover:bg-jc-surface-active":
                mode !== tab.id,
            })}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${baseId}-tab-${mode}`}
      >
        {mode === "link" ? (
          <Field
            label="Offer link"
            htmlFor={inputId}
            hint={linkHint}
            error={errors.url?.message}
          >
            <input
              id={inputId}
              type="url"
              placeholder="https://"
              className={input.onPage}
              {...fieldAria(inputId, { hint: true, error: !!errors.url })}
              {...register("url")}
            />
          </Field>
        ) : (
          <Field
            label="Offer text"
            htmlFor={inputId}
            hint={textHint}
            error={errors.text?.message}
          >
            <textarea
              id={inputId}
              rows={10}
              className={clsx(input.onPage, "resize-y py-3.5 leading-normal")}
              {...fieldAria(inputId, { hint: true, error: !!errors.text })}
              {...register("text")}
            />
          </Field>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className={button.primary}>
          Analyze
        </button>
        <span className="text-[15px] text-jc-text-muted">
          Takes a few seconds
        </span>
      </div>
    </form>
  );
}
