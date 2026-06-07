"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export type TemplateFormValues = {
  name: string;
  note: string;
  jsonConfig: string;
  isAvailable: boolean;
};

type TemplateFormFieldsProps = {
  values: TemplateFormValues;
  onChange: (values: TemplateFormValues) => void;
  // File is only collected on create (Update can't replace the attachment).
  file?: File | null;
  onFileChange?: (file: File | null) => void;
};

export function TemplateFormFields({
  values,
  onChange,
  file,
  onFileChange,
}: TemplateFormFieldsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const showFile = typeof onFileChange === "function";

  return (
    <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
      <div className="space-y-1.5">
        <Label htmlFor="tpl-name">Name</Label>
        <Input
          id="tpl-name"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          placeholder="Template name"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tpl-note">Note</Label>
        <Textarea
          id="tpl-note"
          rows={2}
          value={values.note}
          onChange={(e) => onChange({ ...values, note: e.target.value })}
          placeholder="Optional note"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tpl-json">JSON config</Label>
        <Textarea
          id="tpl-json"
          rows={3}
          value={values.jsonConfig}
          onChange={(e) => onChange({ ...values, jsonConfig: e.target.value })}
          placeholder="Optional UI configuration JSON"
          className="font-mono text-xs"
        />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label>Available</Label>
          <p className="text-muted-foreground text-sm">
            Visible to users when creating brochures.
          </p>
        </div>
        <Switch
          checked={values.isAvailable}
          onCheckedChange={(isAvailable) =>
            onChange({ ...values, isAvailable })
          }
        />
      </div>

      {showFile ? (
        <div className="space-y-1.5">
          <Label>Attachment</Label>
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
              {file ? file.name : "No file chosen"}
            </span>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => onFileChange?.(e.target.files?.[0] ?? null)}
          />
        </div>
      ) : (
        <p className="text-muted-foreground text-xs">
          To replace the attachment file, delete and re-create the template (API
          limitation).
        </p>
      )}
    </div>
  );
}
