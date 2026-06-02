"use client";

import { useState } from "react";
import {
  type Column,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  ChevronsUpDown,
  Circle,
  type LucideIcon,
  Timer
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type {
  PreconstructionDetailProject,
  PreconstructionTaskRow,
  PreconstructionTaskStatus
} from "../_data";

import { PreconstructionTabLayout } from "./preconstruction-tab-layout";
import { TaskActionsMenu } from "./task-actions-menu";

type Props = {
  project: PreconstructionDetailProject;
  className?: string;
};

const statusConfig: Record<PreconstructionTaskStatus, { label: string; icon: LucideIcon }> = {
  completed: { label: "Completed", icon: CheckCircle },
  "in-progress": { label: "In Progress", icon: Timer },
  pending: { label: "Pending", icon: Circle }
};

function TaskColumnHeader({
  column,
  title,
  className
}: {
  column: Column<PreconstructionTaskRow, unknown>;
  title: string;
  className?: string;
}) {
  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>;
  }

  const sorted = column.getIsSorted();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "data-[state=open]:bg-accent text-foreground -ml-3 h-8 font-semibold",
            className
          )}
        >
          <span>{title}</span>
          {sorted === "desc" ? <ArrowDown /> : sorted === "asc" ? <ArrowUp /> : <ChevronsUpDown />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUp />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDown />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const columns: ColumnDef<PreconstructionTaskRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false
  },
  {
    accessorKey: "label",
    header: ({ column }) => <TaskColumnHeader column={column} title="Task" />,
    cell: ({ row }) => <span className="text-foreground font-medium">{row.original.label}</span>
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TaskColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const { label, icon: Icon } = statusConfig[row.original.status];
      return (
        <div className="flex items-center gap-2">
          <Icon className="text-muted-foreground size-4" />
          <span>{label}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => <TaskColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.startDate}</span>
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.dueDate}</span>,
    enableSorting: false
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="flex justify-end">
        <TaskActionsMenu />
      </div>
    )
  }
];

function TasksTable({ data }: { data: PreconstructionTaskRow[] }) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const reduceMotion = useReducedMotion() ?? false;

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, sorting },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-foreground font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, index) => (
              <motion.tr
                key={row.id}
                data-slot="table-row"
                data-state={row.getIsSelected() ? "selected" : undefined}
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 4 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.25, delay: index * 0.03, ease: "easeOut" as const }
                    })}
                className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No tasks.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function PreconstructionTasks({ project, className }: Props) {
  return (
    <PreconstructionTabLayout categories={project.categories} className={className}>
      <section className="bg-card rounded-2xl border p-5" data-slot="tasks-card">
        <header className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h3 className="text-foreground text-lg font-semibold">Tasks</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              Filter
            </Button>
            <Button size="sm" className="h-9">
              Add Task
            </Button>
          </div>
        </header>
        <TasksTable data={project.taskList} />
      </section>
    </PreconstructionTabLayout>
  );
}
