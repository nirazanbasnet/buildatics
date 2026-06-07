"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { TemplateOption } from "../../lib/types";

export const TEMPLATE_NONE = "none";

export type BrochureFormValues = {
  name: string;
  note: string;
  templateId: string; // TEMPLATE_NONE or a template id
};

type BrochureFormFieldsProps = {
  values: BrochureFormValues;
  onChange: (values: BrochureFormValues) => void;
  templates: TemplateOption[];
  file: File | null;
  onFileChange: (file: File | null) => void;
  // When editing, the HTML file is optional (kept unless replaced).
  fileOptional?: boolean;
};

export function BrochureFormFields({
  values,
  onChange,
  templates,
  file,
  onFileChange,
  fileOptional,
}: BrochureFormFieldsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
      <div className="space-y-1.5">
        <Label htmlFor="br-name">Name</Label>
        <Input
          id="br-name"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          placeholder="Brochure name"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="br-note">Note</Label>
        <Textarea
          id="br-note"
          rows={3}
          value={values.note}
          onChange={(e) => onChange({ ...values, note: e.target.value })}
          placeholder="Optional note"
        />
      </div>

      <div className="space-y-1.5">
        <Label>Template</Label>
        <Select
          value={values.templateId}
          onValueChange={(templateId) => onChange({ ...values, templateId })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TEMPLATE_NONE}>— None —</SelectItem>
            {templates.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>HTML file {fileOptional ? "(optional)" : ""}</Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="size-4" />
            Choose file
          </Button>
          <span className="text-muted-foreground truncate text-sm">
            {file
              ? file.name
              : fileOptional
                ? "Keep current file"
                : "No file chosen"}
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".html,text/html"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        {fileOptional ? (
          <p className="text-muted-foreground text-xs">
            Updating replaces the stored HTML. Leave empty to attempt a
            metadata-only update.
          </p>
        ) : null}
      </div>
    </div>
  );
}
