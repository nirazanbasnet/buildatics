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

import { getTemplateForEdit } from "../actions/get-template";
import { updateTemplate } from "../actions/update-template";
import {
  TemplateFormFields,
  type TemplateFormValues,
} from "./template-form-fields";

type EditTemplateSheetProps = {
  templateId: string | null;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

const EMPTY: TemplateFormValues = {
  name: "",
  note: "",
  jsonConfig: "",
  isAvailable: true,
};

export function EditTemplateSheet({
  templateId,
  onOpenChange,
  onSaved,
}: EditTemplateSheetProps) {
  const open = templateId !== null;
  const [values, setValues] = useState<TemplateFormValues>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!templateId) return;
    let active = true;
    setLoading(true);
    getTemplateForEdit(templateId).then((res) => {
      if (!active) return;
      if (res.ok) {
        setValues({
          name: res.data.name,
          note: res.data.note,
          jsonConfig: res.data.jsonConfig,
          isAvailable: res.data.isAvailable,
        });
      } else {
        toast.error(res.error);
        onOpenChange(false);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [templateId]);

  function submit() {
    if (!templateId) return;
    if (!values.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    startTransition(async () => {
      const res = await updateTemplate(templateId, values);
      if (res.ok) {
        toast.success("Template updated");
        onOpenChange(false);
        onSaved?.();
      } else {
        toast.error(res.error ?? "Failed to update the template.");
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onOpenChange(false)}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Edit template</SheetTitle>
          <SheetDescription className="sr-only">
            Update brochure template metadata.
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
            Loading…
          </div>
        ) : (
          <>
            <TemplateFormFields values={values} onChange={setValues} />
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
                {isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
