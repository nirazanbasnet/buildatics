"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { createTemplate } from "../actions/create-template";
import {
  TemplateFormFields,
  type TemplateFormValues,
} from "./template-form-fields";

type AddTemplateSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

const EMPTY: TemplateFormValues = {
  name: "",
  note: "",
  jsonConfig: "",
  isAvailable: true,
};

export function AddTemplateSheet({
  open,
  onOpenChange,
  onSaved,
}: AddTemplateSheetProps) {
  const [values, setValues] = useState<TemplateFormValues>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      setValues(EMPTY);
      setFile(null);
    }
  }, [open]);

  function submit() {
    if (!values.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    if (!file) {
      toast.error("Choose an attachment.");
      return;
    }
    startTransition(async () => {
      const res = await createTemplate({ ...values, file });
      if (res.ok) {
        toast.success("Template created");
        onOpenChange(false);
        onSaved?.();
      } else {
        toast.error(res.error ?? "Failed to create the template.");
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Add template</SheetTitle>
          <SheetDescription className="sr-only">
            Create a brochure template by uploading its attachment.
          </SheetDescription>
        </SheetHeader>

        <TemplateFormFields
          values={values}
          onChange={setValues}
          file={file}
          onFileChange={setFile}
        />

        <div className="flex items-center justify-end gap-2 border-t px-4 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending ? "Creating…" : "Create Template"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
