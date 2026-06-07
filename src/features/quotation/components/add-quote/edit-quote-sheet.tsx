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

import { updateQuote } from "../../actions/update-quote";
import {
  addQuoteSchema,
  type AddQuoteInput,
} from "../../lib/quote-form-schema";
import type { QuotationRow } from "../../types";
import { QuoteFormFields } from "./quote-form-fields";

type EditQuoteSheetProps = {
  quote: QuotationRow | null;
  // The current valid-until in yyyy-mm-dd, fetched lazily isn't needed — the list row has no raw date,
  // so we leave it blank unless edited. (Title/description aren't on the row either; user re-enters.)
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
};

// Edit reuses the Add schema (leadId is prefilled from the row and not shown; updateQuote ignores it).
export function EditQuoteSheet({
  quote,
  onOpenChange,
  onSaved,
}: EditQuoteSheetProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<AddQuoteInput>({
    resolver: zodResolver(addQuoteSchema),
    defaultValues: { leadId: "", title: "", description: "", validUntil: "" },
  });

  useEffect(() => {
    if (quote) {
      form.reset({
        leadId: quote.leadId,
        title: quote.ref === "Untitled quote" ? "" : quote.ref,
        description: "",
        validUntil: "",
      });
    }
  }, [quote]);

  function onSubmit(values: AddQuoteInput) {
    if (!quote) return;
    startTransition(async () => {
      const res = await updateQuote(quote.leadId, quote.id, values);
      if (res.ok) {
        toast.success("Quotation updated");
        onOpenChange(false);
        onSaved();
        return;
      }
      if (res.fieldErrors?.title)
        form.setError("title", { message: res.fieldErrors.title });
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Sheet open={quote !== null} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Edit quotation</SheetTitle>
          <SheetDescription className="sr-only">
            Update the quotation title, description and validity.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
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
                {isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
