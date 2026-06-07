"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { LeadOptions } from "@/features/leads/types";

import { createProject } from "../../actions/create-project";
import {
  ASSIGNEE_UNASSIGNED,
  DESIGN_NONE,
  STAGE_AUTO,
  createProjectSchema,
  normalizeProjectInput,
  type CreateProjectInput,
} from "../../lib/project-form-schema";
import { ProjectFormFields } from "./project-form-fields";

type AddProjectSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: LeadOptions;
  onSaved?: () => void;
};

export function AddProjectSheet({
  open,
  onOpenChange,
  options,
  onSaved,
}: AddProjectSheetProps) {
  const [isPending, startTransition] = useTransition();

  const defaults: CreateProjectInput = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    lotAddress: "",
    developer: "",
    leadStageId: STAGE_AUTO,
    assignedUserId:
      options.currentUserId || options.staff[0]?.id || ASSIGNEE_UNASSIGNED,
    companyDesignId: DESIGN_NONE,
  };

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    if (open) form.reset(defaults);
  }, [open]);

  function onSubmit(values: CreateProjectInput) {
    startTransition(async () => {
      const res = await createProject(normalizeProjectInput(values));
      if (res.ok) {
        toast.success("Project created");
        onOpenChange(false);
        onSaved?.();
        return;
      }
      if (res.fieldErrors?.firstName)
        form.setError("firstName", { message: res.fieldErrors.firstName });
      if (res.fieldErrors?.email)
        form.setError("email", { message: res.fieldErrors.email });
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Add project</SheetTitle>
          <SheetDescription className="sr-only">
            Create a preconstruction project with contact, developer, stage and
            an optional design.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <ProjectFormFields control={form.control} options={options} />
            <div className="flex items-center justify-end gap-2 border-t px-4 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating…" : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
