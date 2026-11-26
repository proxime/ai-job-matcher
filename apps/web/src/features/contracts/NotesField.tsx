import clsx from "clsx";
import { useId, useState } from "react";
import { input } from "../../ui/styles.ts";

interface NotesFieldProps {
  initialNotes: string;
  onSave: (notes: string) => void;
}

export function NotesField({ initialNotes, onSave }: NotesFieldProps) {
  const [notes, setNotes] = useState(initialNotes);
  const notesId = useId();

  return (
    <section className="flex flex-col gap-2">
      <label htmlFor={notesId} className="text-[21px] font-bold">
        Notes
      </label>
      <textarea
        id={notesId}
        rows={4}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        onBlur={() => {
          if (notes !== initialNotes) {
            onSave(notes);
          }
        }}
        className={clsx(input.onPage, "resize-y py-3.5 leading-normal")}
      />
    </section>
  );
}
