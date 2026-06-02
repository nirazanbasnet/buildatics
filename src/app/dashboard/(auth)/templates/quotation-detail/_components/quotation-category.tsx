"use client";

import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  categoryTotal,
  formatCurrency,
  type QuotationBuilderHandlers,
  type QuotationCategory as Category
} from "../_data";
import { QuotationCategoryActionsMenu } from "./quotation-category-actions-menu";
import { QuotationLineItem } from "./quotation-line-item";

type Props = {
  category: Category;
  handlers: QuotationBuilderHandlers;
};

export function QuotationCategory({ category, handlers }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      handlers.reorderLineItems(category.id, String(active.id), String(over.id));
    }
  }

  return (
    <section
      className="border-border overflow-hidden rounded-xl border"
      data-slot="quotation-category"
    >
      <header className="bg-muted/40 flex items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          onClick={() => handlers.toggleCategoryCollapsed(category.id)}
          aria-expanded={!category.collapsed}
          aria-label={category.collapsed ? "Expand category" : "Collapse category"}
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <ChevronDown
            className={cn("size-4 transition-transform", category.collapsed && "-rotate-90")}
          />
        </button>

        <div className="flex shrink-0 flex-col gap-1">
          <button
            type="button"
            onClick={() => handlers.moveCategory(category.id, -1)}
            aria-label="Move category up"
            className="text-muted-foreground hover:text-foreground -my-1 cursor-pointer"
          >
            <ChevronUp className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handlers.moveCategory(category.id, 1)}
            aria-label="Move category down"
            className="text-muted-foreground hover:text-foreground -my-1 cursor-pointer"
          >
            <ChevronDown className="size-3.5" />
          </button>
        </div>

        <Input
          value={category.name}
          onChange={(e) => handlers.renameCategory(category.id, e.target.value)}
          aria-label="Category name"
          className="focus-visible:bg-background h-8 flex-1 border-0 bg-transparent px-2 text-sm font-semibold shadow-none focus-visible:ring-1"
        />

        <span className="border-border bg-background text-foreground shrink-0 rounded-md border px-3 py-1 text-sm font-medium">
          {formatCurrency(categoryTotal(category))}
        </span>

        <QuotationCategoryActionsMenu
          onRename={() => {
            const next = window.prompt("Rename category", category.name);
            if (next !== null) handlers.renameCategory(category.id, next);
          }}
          onAddLineItem={() => handlers.addLineItem(category.id)}
          onDuplicate={() => handlers.duplicateCategory(category.id)}
          onMoveUp={() => handlers.moveCategory(category.id, -1)}
          onMoveDown={() => handlers.moveCategory(category.id, 1)}
          onDelete={() => handlers.deleteCategory(category.id)}
        />
      </header>

      {category.collapsed ? null : (
        <div className="bg-card">
          <DndContext
            id={`quotation-dnd-${category.id}`}
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={category.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {category.items.map((item) => (
                <QuotationLineItem
                  key={item.id}
                  categoryId={category.id}
                  item={item}
                  handlers={handlers}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="border-border/60 border-t px-2 py-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground h-8 gap-1.5"
              onClick={() => handlers.addLineItem(category.id)}
            >
              <Plus className="size-4" />
              Add Line Item
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
