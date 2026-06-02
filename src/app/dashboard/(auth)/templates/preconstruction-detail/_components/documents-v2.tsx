"use client";

import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";

import type { PreconstructionDetailProject } from "../_data";

import { AttachedFilesTable } from "./attached-files-table";
import { PreconstructionTabLayout } from "./preconstruction-tab-layout";

type Props = {
  project: PreconstructionDetailProject;
  className?: string;
};

export function DocumentsV2({ project, className }: Props) {
  const [
    { files, isDragging },
    {
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      removeFile
    }
  ] = useFileUpload({ multiple: true });

  return (
    <PreconstructionTabLayout categories={project.categories} className={className}>
      <section className="bg-card rounded-2xl border p-5" data-slot="documents-card">
        <h3 className="text-foreground text-base font-semibold">Upload files</h3>

        <div
          role="button"
          tabIndex={0}
          onClick={openFileDialog}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openFileDialog();
            }
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-border bg-muted/50 hover:bg-muted text-foreground focus-visible:ring-ring data-[dragging=true]:border-primary data-[dragging=true]:bg-primary/5 mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-5 text-sm font-medium transition-colors outline-none focus-visible:ring-2"
        >
          <input {...getInputProps()} className="sr-only" />
          Select Files
          <Upload className="size-4" />
        </div>

        {files.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-2">
            {files.map((entry) => (
              <li
                key={entry.id}
                className="border-border bg-background flex items-center gap-3 rounded-lg border px-3 py-2 text-sm"
              >
                <span className="text-foreground flex-1 truncate font-medium">
                  {entry.file.name}
                </span>
                <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                  {formatBytes(entry.file.size)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => removeFile(entry.id)}
                  aria-label={`Remove ${entry.file.name}`}
                >
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}

        <h3 className="text-foreground mt-6 mb-3 text-base font-semibold">Attached files</h3>
        <AttachedFilesTable data={project.documents} />
      </section>
    </PreconstructionTabLayout>
  );
}
