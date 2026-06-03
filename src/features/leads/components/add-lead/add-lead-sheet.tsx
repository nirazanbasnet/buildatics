"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { createLead } from "../../actions/create-lead";
import {
  ASSIGNEE_UNASSIGNED,
  DESIGN_NONE,
  STAGE_AUTO,
  createLeadSchema,
  normalizeLeadInput,
  type CreateLeadInput
} from "../../lib/lead-form-schema";
import type { LeadOptions } from "../../types";
import { LeadFormFields } from "./lead-form-fields";

type AddLeadSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: LeadOptions;
  // Called after a lead is created so the list can re-query (state doesn't sync from server props alone).
  onCreated?: () => void;
};

export function AddLeadSheet({ open, onOpenChange, options, onCreated }: AddLeadSheetProps) {
  const [isPending, startTransition] = useTransition();

  const defaults: CreateLeadInput = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    lotAddress: "",
    leadStageId: STAGE_AUTO,
    assignedUserId: options.currentUserId || options.staff[0]?.id || ASSIGNEE_UNASSIGNED,
    companyDesignId: DESIGN_NONE
  };

  const form = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: defaults
  });

  useEffect(() => {
    if (open) form.reset(defaults);
  }, [open]);

  function onSubmit(values: CreateLeadInput) {
    startTransition(async () => {
      const res = await createLead(normalizeLeadInput(values));
      if (res.ok) {
        toast.success("Lead created");
        onOpenChange(false);
        onCreated?.();
        return;
      }
      if (res.fieldErrors?.firstName) form.setError("firstName", { message: res.fieldErrors.firstName });
      if (res.fieldErrors?.email) form.setError("email", { message: res.fieldErrors.email });
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Add lead</SheetTitle>
          <SheetDescription className="sr-only">
            Create a new lead with contact, pipeline stage, assignee and an optional design.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
            <LeadFormFields control={form.control} options={options} />
            <div className="flex items-center justify-end gap-2 border-t px-4 py-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating…" : "Create Lead"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
