"use client";

import { useRef } from "react";
import { Pencil } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
};

export function BrochureField({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      <span className="text-foreground flex-1 text-sm font-medium">{label}</span>
      <div className="relative w-56 max-w-[55%]">
        <Input
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="h-9 pr-9"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          aria-label={`Edit ${label}`}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
