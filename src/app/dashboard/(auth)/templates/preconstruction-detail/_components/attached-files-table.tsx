"use client";

import { useState } from "react";
import {
  type Column,
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import type { PreconstructionDocument } from "../_data";

import { DocumentActionsMenu } from "./document-actions-menu";

function SortableHeader<TData>({
  column,
  title,
  className
}: {
  column: Column<TData, unknown>;
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

const columns: ColumnDef<PreconstructionDocument>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="File Name" />,
    cell: ({ row }) => <span className="text-foreground font-medium">{row.original.name}</span>
  },
  {
    accessorKey: "size",
    header: ({ column }) => <SortableHeader column={column} title="File Size" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.size}</span>
  },
  {
    accessorKey: "uploadedBy",
    header: "Uploaded by",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.uploadedBy}</span>,
    enableSorting: false
  },
  {
    accessorKey: "uploadedOn",
    header: ({ column }) => <SortableHeader column={column} title="Uploaded on" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.uploadedOn}</span>
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="flex justify-end">
        <DocumentActionsMenu />
      </div>
    )
  }
];

export function AttachedFilesTable({ data }: { data: PreconstructionDocument[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
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
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
