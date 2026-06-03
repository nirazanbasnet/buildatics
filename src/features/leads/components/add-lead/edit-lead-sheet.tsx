"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { getLeadForEdit } from "../../actions/get-lead";
import { updateLead } from "../../actions/update-lead";
import {
  createLeadSchema,
  normalizeLeadInput,
  type CreateLeadInput
} from "../../lib/lead-form-schema";
import type { LeadOptions } from "../../types";
import { LeadFormFields } from "./lead-form-fields";

type EditLeadSheetProps = {
  leadId: string | null;
  onOpenChange: (open: boolean) => void;
  options: LeadOptions;
  onSaved?: () => void;
};

export function EditLeadSheet({ leadId, onOpenChange, options, onSaved }: EditLeadSheetProps) {
  const open = leadId !== null;
  const [loading, setLoading] = useState(false);
  const [contactId, setContactId] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateLeadInput>({ resolver: zodResolver(createLeadSchema) });

  // Load the lead's current values whenever the sheet opens for a lead.
  useEffect(() => {
    if (!leadId) return;
    let active = true;
    setLoading(true);
    getLeadForEdit(leadId).then((res) => {
      if (!active) return;
      if (res.ok) {
        setContactId(res.data.contactId);
        form.reset(res.data.values);
      } else {
        toast.error(res.error);
        onOpenChange(false);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [leadId]);

  function onSubmit(values: CreateLeadInput) {
    if (!leadId) return;
    startTransition(async () => {
      const res = await updateLead(leadId, contactId, normalizeLeadInput(values));
      if (res.ok) {
        toast.success("Lead updated");
        onOpenChange(false);
        onSaved?.();
        return;
      }
      if (res.fieldErrors?.firstName) form.setError("firstName", { message: res.fieldErrors.firstName });
      if (res.fieldErrors?.email) form.setError("email", { message: res.fieldErrors.email });
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onOpenChange(false)}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Edit lead</SheetTitle>
          <SheetDescription className="sr-only">
            Update the lead&apos;s contact, pipeline stage and assignee.
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
            Loading…
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
              <LeadFormFields control={form.control} options={options} />
              <div className="flex items-center justify-end gap-2 border-t px-4 py-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
}
