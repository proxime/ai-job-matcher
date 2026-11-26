import { useState, type KeyboardEvent } from "react";
import { Field } from "../../ui/Field.tsx";
import { fieldAria } from "../../ui/field-aria.ts";
import { input } from "../../ui/styles.ts";

interface SkillsFieldProps {
  id: string;
  value: string[];
  error?: string;
  onChange: (skills: string[]) => void;
}

export function SkillsField({ id, value, error, onChange }: SkillsFieldProps) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    const skill = newSkill.trim();
    const known = value.some(
      (existing) => existing.toLowerCase() === skill.toLowerCase(),
    );
    if (skill && !known) {
      onChange([...value, skill]);
    }
    setNewSkill("");
  };

  return (
    <Field label="Skills" htmlFor={id} error={error}>
      <ul className="flex flex-wrap gap-2 empty:hidden">
        {value.map((skill) => (
          <li
            key={skill}
            className="inline-flex items-center gap-0.5 rounded-full bg-jc-line py-0.5 pr-1 pl-3"
          >
            {skill}
            <button
              type="button"
              aria-label={`Remove ${skill}`}
              onClick={() =>
                onChange(value.filter((existing) => existing !== skill))
              }
              className="size-9 cursor-pointer rounded-full text-jc-text-muted hover:text-jc-text"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <input
        id={id}
        value={newSkill}
        onChange={(event) => setNewSkill(event.target.value)}
        onKeyDown={addSkill}
        placeholder="Add a skill and press Enter"
        className={input.onSurface}
        {...fieldAria(id, { error: !!error })}
      />
    </Field>
  );
}
