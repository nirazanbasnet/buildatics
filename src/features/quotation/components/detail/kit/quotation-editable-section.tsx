"use client";

import { useRef, useState } from "react";
import { Check, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function QuotationEditableSection({
  title,
  value,
  placeholder,
  onChange,
  className
}: Props) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function toggle() {
    setEditing((prev) => {
      const next = !prev;
      if (next) requestAnimationFrame(() => textareaRef.current?.focus());
      return next;
    });
  }

  return (
    <section
      className={cn("bg-card rounded-2xl border p-5", className)}
      data-slot="quotation-editable"
    >
      <header className="flex items-center justify-between gap-3">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          onClick={toggle}
          aria-label={editing ? `Save ${title}` : `Edit ${title}`}
          aria-pressed={editing}
        >
          {editing ? <Check className="size-4" /> : <Pencil className="size-4" />}
        </Button>
      </header>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!editing}
        placeholder={placeholder}
        aria-label={title}
        className={cn(
          "mt-4 min-h-28 resize-y",
          !editing && "bg-muted/40 cursor-default focus-visible:ring-0"
        )}
      />
    </section>
  );
}
