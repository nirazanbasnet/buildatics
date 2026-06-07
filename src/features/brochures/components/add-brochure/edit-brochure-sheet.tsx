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

import { loadBrochureDetail } from "../../actions/load-brochure-detail";
import { updateBrochure } from "../../actions/update-brochure";
import type { TemplateOption } from "../../lib/types";
import {
  BrochureFormFields,
  TEMPLATE_NONE,
  type BrochureFormValues,
} from "./brochure-form-fields";

type EditBrochureSheetProps = {
  brochureId: string | null;
  templates: TemplateOption[];
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export function EditBrochureSheet({
  brochureId,
  templates,
  onOpenChange,
  onSaved,
}: EditBrochureSheetProps) {
  const open = brochureId !== null;
  const [values, setValues] = useState<BrochureFormValues>({
    name: "",
    note: "",
    templateId: TEMPLATE_NONE,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!brochureId) return;
    let active = true;
    setLoading(true);
    setFile(null);
    loadBrochureDetail(brochureId).then((res) => {
      if (!active) return;
      if (res.ok) {
        setValues({
          name: res.data.name,
          note: res.data.note,
          templateId: res.data.templateId || TEMPLATE_NONE,
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
  }, [brochureId]);

  function submit() {
    if (!brochureId) return;
    if (!values.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    startTransition(async () => {
      const res = await updateBrochure(brochureId, {
        name: values.name,
        note: values.note,
        brochureTemplateId:
          values.templateId === TEMPLATE_NONE ? undefined : values.templateId,
        file: file ?? undefined,
      });
      if (res.ok) {
        toast.success("Brochure updated");
        onOpenChange(false);
        onSaved?.();
      } else {
        toast.error(res.error ?? "Failed to update the brochure.");
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
          <SheetTitle>Edit brochure</SheetTitle>
          <SheetDescription className="sr-only">
            Update brochure metadata and optionally replace its HTML file.
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
            Loading…
          </div>
        ) : (
          <>
            <BrochureFormFields
              values={values}
              onChange={setValues}
              templates={templates}
              file={file}
              onFileChange={setFile}
              fileOptional
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
                {isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
