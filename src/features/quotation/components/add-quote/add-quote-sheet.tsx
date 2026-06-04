"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import { createQuote } from "../../actions/create-quote";
import type { QuoteLeadOption } from "../../lib/lead-options";
import { addQuoteSchema, type AddQuoteInput } from "../../lib/quote-form-schema";
import { QuoteFormFields } from "./quote-form-fields";

type AddQuoteSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leads: QuoteLeadOption[];
  // Receives the new quote's ids so the caller can refresh the list and open its detail sheet.
  onCreated: (created?: { leadId: string; id: string }) => void;
};

const DEFAULTS: AddQuoteInput = { leadId: "", title: "", description: "", validUntil: "" };

export function AddQuoteSheet({ open, onOpenChange, leads, onCreated }: AddQuoteSheetProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<AddQuoteInput>({
    resolver: zodResolver(addQuoteSchema),
    defaultValues: DEFAULTS
  });

  useEffect(() => {
    if (open) form.reset(DEFAULTS);
  }, [open]);

  function onSubmit(values: AddQuoteInput) {
    startTransition(async () => {
      const res = await createQuote(values);
      if (res.ok) {
        toast.success("Quotation created");
        onOpenChange(false);
        onCreated(res.leadId && res.id ? { leadId: res.leadId, id: res.id } : undefined);
        return;
      }
      if (res.fieldErrors?.leadId) form.setError("leadId", { message: res.fieldErrors.leadId });
      if (res.fieldErrors?.title) form.setError("title", { message: res.fieldErrors.title });
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Add quotation</SheetTitle>
          <SheetDescription className="sr-only">
            Create a quotation against a lead. Line items are added on the detail page.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
              <FormField
                control={form.control}
                name="leadId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a lead" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leads.map((lead) => (
                          <SelectItem key={lead.id} value={lead.id}>
                            {lead.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <QuoteFormFields control={form.control} />
            </div>
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
                {isPending ? "Creating…" : "Create quotation"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
