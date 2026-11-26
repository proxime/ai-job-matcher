import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, type ContractType } from "@jm/shared";
import clsx from "clsx";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field } from "../../ui/Field.tsx";
import { fieldAria } from "../../ui/field-aria.ts";
import { button, input } from "../../ui/styles.ts";
import { SkillsField } from "./SkillsField.tsx";

const contractTypes: { value: ContractType; label: string }[] = [
  { value: "B2B", label: "B2B contract" },
  { value: "UoP", label: "Employment contract (UoP)" },
];

const checkboxRow = "flex min-h-11 cursor-pointer items-center gap-3";
const checkbox = "size-5 accent-jc-pink";

interface ProfileFormProps {
  profile: Profile;
  saving: boolean;
  onSave: (profile: Profile) => void;
}

export function ProfileForm({ profile, saving, onSave }: ProfileFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Profile), defaultValues: profile });
  const baseId = useId();
  const headlineId = `${baseId}-headline`;
  const yearsId = `${baseId}-years`;
  const rateId = `${baseId}-rate`;
  const skillId = `${baseId}-skill`;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSave)}
      className="flex flex-col gap-5.5 rounded-jc-lg bg-jc-surface p-7"
    >
      <Field
        label="Headline"
        htmlFor={headlineId}
        error={errors.headline?.message}
      >
        <input
          id={headlineId}
          className={input.onSurface}
          {...fieldAria(headlineId, { error: !!errors.headline })}
          {...register("headline")}
        />
      </Field>

      <div className="grid items-start gap-4 sm:grid-cols-2">
        <Field
          label="Years of experience"
          htmlFor={yearsId}
          error={errors.yearsOfExperience?.message}
        >
          <input
            id={yearsId}
            type="number"
            className={input.onSurface}
            {...fieldAria(yearsId, { error: !!errors.yearsOfExperience })}
            {...register("yearsOfExperience", { valueAsNumber: true })}
          />
        </Field>
        <Field
          label="Minimum rate (PLN/h, B2B)"
          htmlFor={rateId}
          error={errors.minRatePlnPerHour?.message}
        >
          <input
            id={rateId}
            type="number"
            className={input.onSurface}
            {...fieldAria(rateId, { error: !!errors.minRatePlnPerHour })}
            {...register("minRatePlnPerHour", { valueAsNumber: true })}
          />
        </Field>
      </div>

      <Controller
        name="skills"
        control={control}
        render={({ field, fieldState }) => (
          <SkillsField
            id={skillId}
            value={field.value}
            error={fieldState.error?.message}
            onChange={field.onChange}
          />
        )}
      />

      <fieldset className="flex flex-col">
        <legend className="mb-2.5 font-medium">Preferences</legend>
        <label className={checkboxRow}>
          <input
            type="checkbox"
            className={checkbox}
            {...register("preferences.remoteOnly")}
          />
          Remote only
        </label>
        {contractTypes.map(({ value, label }) => (
          <label key={value} className={checkboxRow}>
            <input
              type="checkbox"
              value={value}
              className={checkbox}
              {...register("preferences.contract")}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        disabled={saving}
        className={clsx(button.primary, "self-start")}
      >
        Save and continue
      </button>
    </form>
  );
}
