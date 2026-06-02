"use client";

import { Eye, EyeOff, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { QuotationBuilderHandlers, QuotationLineItem as LineItem } from "../_data";
import { QuotationLineItemActionsMenu } from "./quotation-line-item-actions-menu";

type Props = {
  categoryId: string;
  item: LineItem;
  handlers: QuotationBuilderHandlers;
};

const ghostInput =
  "h-8 border-0 bg-transparent px-2 shadow-none focus-visible:bg-background focus-visible:ring-1";

export function QuotationLineItem({ categoryId, item, handlers }: Props) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group/item border-border/60 bg-card flex items-center gap-1 border-t px-2 py-1.5 first:border-t-0",
        !item.visible && "opacity-50",
        isDragging && "relative z-10 rounded-md opacity-80 shadow-md"
      )}
      data-slot="quotation-line-item"
    >
      <button
        type="button"
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="text-muted-foreground hover:text-foreground shrink-0 cursor-grab touch-none px-1 active:cursor-grabbing"
        aria-label="Drag to reorder line item"
      >
        <GripVertical className="size-4" />
      </button>

      <div className="flex flex-1 items-center gap-1 transition-transform motion-safe:group-hover/item:translate-x-1">
        <Input
          value={item.name}
          onChange={(e) => handlers.updateLineItem(categoryId, item.id, { name: e.target.value })}
          aria-label="Line item name"
          className={cn(ghostInput, "flex-1 text-sm font-medium", !item.visible && "line-through")}
        />

        <div className="relative w-36 shrink-0">
          <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-sm">
            $
          </span>
          <Input
            type="number"
            min={0}
            value={item.cost}
            onChange={(e) =>
              handlers.updateLineItem(categoryId, item.id, { cost: Number(e.target.value) || 0 })
            }
            aria-label="Line item cost"
            className={cn(ghostInput, "pl-5 text-sm")}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground size-8 shrink-0"
          onClick={() => handlers.toggleLineItemVisibility(categoryId, item.id)}
          aria-label={item.visible ? "Hide from quote" : "Show in quote"}
          aria-pressed={!item.visible}
        >
          {item.visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </Button>

        <QuotationLineItemActionsMenu
          visible={item.visible}
          onRename={() => {
            const next = window.prompt("Rename line item", item.name);
            if (next !== null) handlers.updateLineItem(categoryId, item.id, { name: next });
          }}
          onToggleVisibility={() => handlers.toggleLineItemVisibility(categoryId, item.id)}
          onDuplicate={() => handlers.duplicateLineItem(categoryId, item.id)}
          onMoveUp={() => handlers.moveLineItem(categoryId, item.id, -1)}
          onMoveDown={() => handlers.moveLineItem(categoryId, item.id, 1)}
          onDelete={() => handlers.deleteLineItem(categoryId, item.id)}
        />
      </div>
    </div>
  );
}
