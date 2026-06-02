"use client";

import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { MotionTableRow } from "@src/components/ui/motion-table-row";
import { SortableTableHead, sortBy, useSortState } from "@src/components/ui/sortable-table-head";
import { cn } from "@/lib/utils";

import { documentStatusConfig, type BusinessDocument } from "../_data";
import { DocumentDetailSheet } from "./document-detail-sheet";
import { DocumentsActionsMenu } from "./documents-actions-menu";
import { getDocumentTypeIcon } from "./document-type-icon";

type Props = {
  documents: BusinessDocument[];
  className?: string;
};

type SortField = "fileName" | "status" | "uploadedBy" | "uploadedOn";

const ACCESSORS: Record<SortField, (d: BusinessDocument) => string | number> = {
  fileName: (d) => d.fileName,
  status: (d) => d.status,
  uploadedBy: (d) => d.uploadedBy,
  uploadedOn: (d) => d.uploadedOn
};

export function DocumentsTable({ documents, className }: Props) {
  const [sort, setSort] = useSortState<SortField>({ field: "fileName", direction: "asc" });
  const [selected, setSelected] = useState<BusinessDocument | null>(null);
  const sortedDocuments = useMemo(() => sortBy(documents, sort, ACCESSORS), [documents, sort]);

  return (
    <>
      <div className={cn("bg-card flex-1 overflow-auto rounded-lg border", className)}>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <SortableTableHead field="fileName" sort={sort} onSort={setSort} className="pl-4">
                File Name
              </SortableTableHead>
              <SortableTableHead field="status" sort={sort} onSort={setSort}>
                Status
              </SortableTableHead>
              <SortableTableHead field="uploadedBy" sort={sort} onSort={setSort}>
                Uploaded by
              </SortableTableHead>
              <SortableTableHead field="uploadedOn" sort={sort} onSort={setSort}>
                Uploaded on
              </SortableTableHead>
              <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDocuments.map((document, index) => {
              const status = documentStatusConfig[document.status];
              const Icon = getDocumentTypeIcon(document.type);
              return (
                <MotionTableRow
                  key={document.id}
                  index={index}
                  onClick={() => setSelected(document)}
                  className="cursor-pointer"
                >
                  <TableCell className="py-3 pl-4 font-medium">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(document);
                      }}
                      className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 transition-colors hover:underline"
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{document.fileName}</span>
                    </button>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex min-w-24 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        status.badge
                      )}
                    >
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{document.uploadedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{document.uploadedOn}</TableCell>
                  <TableCell className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <DocumentsActionsMenu
                      fileName={document.fileName}
                      onView={() => setSelected(document)}
                    />
                  </TableCell>
                </MotionTableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selected ? (
        <DocumentDetailSheet
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          document={selected}
        />
      ) : null}
    </>
  );
}
