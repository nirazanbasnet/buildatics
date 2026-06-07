"use client";

import { useRef, useState, useTransition } from "react";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteDocument, uploadDocument } from "../../actions/documents";
import type { ProjectDocument, ProjectOverview } from "../../lib/detail-types";
import { TabLayout } from "./tab-layout";

type DocumentsTabProps = {
  overview: ProjectOverview;
  leadId: string;
  documents: ProjectDocument[];
  onChanged: () => void;
};

export function DocumentsTab({
  overview,
  leadId,
  documents,
  onChanged,
}: DocumentsTabProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    startTransition(async () => {
      const res = await uploadDocument(leadId, file);
      if (res.ok) {
        toast.success("File uploaded");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to upload the file.");
      }
    });
  }

  function remove(blobId: string) {
    setBusyId(blobId);
    startTransition(async () => {
      const res = await deleteDocument(leadId, blobId);
      setBusyId(null);
      if (res.ok) {
        toast.success("File deleted");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to delete the file.");
      }
    });
  }

  return (
    <TabLayout overview={overview}>
      <section
        className="bg-card rounded-2xl border p-5"
        data-slot="documents-card"
      >
        <header className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h3 className="text-foreground text-lg font-semibold">Documents</h3>
          <Button
            size="sm"
            className="h-9"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
          >
            <Upload className="size-4" />
            {isPending ? "Uploading…" : "Upload"}
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={onPick}
          />
        </header>

        {documents.length === 0 ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="border-border hover:bg-muted/30 text-muted-foreground flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-12 text-sm transition-colors"
          >
            <Upload className="size-6" />
            Click to upload a file
          </button>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-foreground font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Uploaded
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    data-slot="table-row"
                    {...(reduceMotion
                      ? {}
                      : {
                          initial: { opacity: 0, y: 4 },
                          animate: { opacity: 1, y: 0 },
                          transition: {
                            duration: 0.25,
                            delay: index * 0.03,
                            ease: "easeOut" as const,
                          },
                        })}
                    className="hover:bg-muted/50 border-b transition-colors"
                  >
                    <TableCell className="text-foreground font-medium">
                      <span className="inline-flex items-center gap-2">
                        <FileText className="text-muted-foreground size-4 shrink-0" />
                        {doc.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {doc.uploadedOn}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {doc.url ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            asChild
                          >
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open ${doc.name}`}
                            >
                              <Download className="size-4" />
                            </a>
                          </Button>
                        ) : null}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => remove(doc.id)}
                          disabled={isPending && busyId === doc.id}
                          aria-label={`Delete ${doc.name}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </TabLayout>
  );
}
