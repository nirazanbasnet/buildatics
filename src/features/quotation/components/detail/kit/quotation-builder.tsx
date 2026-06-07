"use client";

import { LayoutTemplate, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  formatCurrency,
  quotedCost,
  type QuotationBuilderHandlers,
  type QuotationDetail,
} from "../_data";
import { QuotationCategory } from "./quotation-category";

type Props = {
  detail: QuotationDetail;
  handlers: QuotationBuilderHandlers;
  className?: string;
};

export function QuotationBuilder({ detail, handlers, className }: Props) {
  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      data-slot="quotation-builder"
    >
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          className="h-10 flex-1 gap-2"
          onClick={() => toast.success("Generating AI draft…")}
        >
          <Sparkles className="size-4" />
          AI Draft
        </Button>
        <Button
          variant="secondary"
          className="text-[10px] md:text-base h-10 flex-1 gap-2"
          onClick={() => toast.success("Choose a template to load")}
        >
          <LayoutTemplate className="size-4" />
          Load Template
        </Button>
        <Button
          className="text-[10px] md:text-base h-10 flex-1 gap-2"
          onClick={handlers.addCategory}
        >
          <Plus className="size-4" />
          Add Category
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {detail.categories.map((category) => (
          <QuotationCategory
            key={category.id}
            category={category}
            handlers={handlers}
          />
        ))}
        {detail.categories.length === 0 ? (
          <p className="text-muted-foreground rounded-xl border border-dashed px-4 py-8 text-center text-sm">
            No categories yet. Add a category to start building the quote.
          </p>
        ) : null}
      </div>

      <div className="border-border bg-card flex items-center justify-between gap-3 rounded-xl border px-4 py-3">
        <span className="text-foreground text-base font-semibold">
          Total Cost
        </span>
        <span className="bg-muted text-foreground rounded-md px-3 py-1.5 text-base font-semibold">
          {formatCurrency(quotedCost(detail))}
        </span>
      </div>
    </div>
  );
}
