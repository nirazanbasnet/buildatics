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

import { createBrochure } from "../../actions/create-brochure";
import type { TemplateOption } from "../../lib/types";
import {
  BrochureFormFields,
  TEMPLATE_NONE,
  type BrochureFormValues,
} from "./brochure-form-fields";

type AddBrochureSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: TemplateOption[];
  onSaved?: () => void;
};

const EMPTY: BrochureFormValues = {
  name: "",
  note: "",
  templateId: TEMPLATE_NONE,
};

export function AddBrochureSheet({
  open,
  onOpenChange,
  templates,
  onSaved,
}: AddBrochureSheetProps) {
  const [values, setValues] = useState<BrochureFormValues>(EMPTY);
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
      toast.error("Choose an HTML file.");
      return;
    }
    startTransition(async () => {
      const res = await createBrochure({
        name: values.name,
        note: values.note,
        brochureTemplateId:
          values.templateId === TEMPLATE_NONE ? undefined : values.templateId,
        file,
      });
      if (res.ok) {
        toast.success("Brochure created");
        onOpenChange(false);
        onSaved?.();
      } else {
        toast.error(res.error ?? "Failed to create the brochure.");
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
          <SheetTitle>Add brochure</SheetTitle>
          <SheetDescription className="sr-only">
            Create a brochure by uploading its HTML file and choosing a
            template.
          </SheetDescription>
        </SheetHeader>

        <BrochureFormFields
          values={values}
          onChange={setValues}
          templates={templates}
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
            {isPending ? "Creating…" : "Create Brochure"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
