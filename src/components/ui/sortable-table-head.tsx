"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc";

export type SortState<T extends string = string> = {
  field: T;
  direction: SortDirection;
};

export function useSortState<T extends string>(initial: SortState<T>) {
  const [sort, setSort] = useState<SortState<T>>(initial);

  function setField(field: T, direction: SortDirection) {
    setSort({ field, direction });
  }

  return [sort, setField] as const;
}

export function sortBy<Row, T extends string>(
  rows: ReadonlyArray<Row>,
  sort: SortState<T>,
  accessors: Record<T, (row: Row) => string | number>
): Row[] {
  const accessor = accessors[sort.field];
  const sorted = [...rows].sort((a, b) => {
    const av = accessor(a);
    const bv = accessor(b);
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  });
  return sort.direction === "desc" ? sorted.reverse() : sorted;
}

type Props<T extends string> = {
  field: T;
  sort: SortState<T>;
  onSort: (field: T, direction: SortDirection) => void;
  children: React.ReactNode;
  className?: string;
};

export function SortableTableHead<T extends string>({
  field,
  sort,
  onSort,
  children,
  className
}: Props<T>) {
  const isActive = sort.field === field;
  const SortedIcon = !isActive ? ChevronsUpDown : sort.direction === "asc" ? ArrowUp : ArrowDown;

  return (
    <TableHead className={cn("font-semibold", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent text-foreground -ml-3 h-8 font-semibold"
            aria-sort={isActive ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}
          >
            <span>{children}</span>
            <SortedIcon
              className={cn("size-3.5", isActive ? "text-foreground" : "text-muted-foreground/60")}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onSort(field, "asc")}>
            <ArrowUp />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort(field, "desc")}>
            <ArrowDown />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
}
