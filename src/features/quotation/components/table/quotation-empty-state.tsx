import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";

type QuotationEmptyStateProps = {
  // True when the list is empty only because filters are active.
  filtered: boolean;
  onClearFilters?: () => void;
};

export function QuotationEmptyState({ filtered, onClearFilters }: QuotationEmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileText />
        </EmptyMedia>
        <EmptyTitle>{filtered ? "No matching quotations" : "No quotations yet"}</EmptyTitle>
        <EmptyDescription>
          {filtered
            ? "Try adjusting or clearing your filters."
            : "Quotations are created against a lead. Add one to get started."}
        </EmptyDescription>
      </EmptyHeader>
      {filtered && onClearFilters ? (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      ) : null}
    </Empty>
  );
}
