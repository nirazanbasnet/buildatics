"use client";

import type { Control } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import type { AddQuoteInput } from "../../lib/quote-form-schema";

// Shared title/description/valid-until fields for the Add and Edit quote forms. `AddQuoteInput` is a
// superset of `EditQuoteInput`, so the edit form (which omits leadId) reuses these by control typing.
export function QuoteFormFields({ control }: { control: Control<AddQuoteInput> }) {
  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Initial Proposal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea rows={3} placeholder="Optional scope summary" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="validUntil"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valid until</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
