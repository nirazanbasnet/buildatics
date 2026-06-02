"use client";

import { FileText, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";

import type { PreconstructionDetailProject } from "../_data";

import { AttachedFilesTable } from "./attached-files-table";
import { PreconstructionTabLayout } from "./preconstruction-tab-layout";

type Props = {
  project: PreconstructionDetailProject;
  className?: string;
};

export function DocumentsV1({ project, className }: Props) {
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
          className="border-border bg-muted/30 hover:bg-muted/50 focus-visible:ring-ring data-[dragging=true]:border-primary data-[dragging=true]:bg-primary/5 mt-3 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors outline-none focus-visible:ring-2"
        >
          <input {...getInputProps()} className="sr-only" />
          <span className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
            <UploadCloud className="size-6" />
          </span>
          <div className="space-y-1">
            <p className="text-foreground text-sm font-medium">Drag &amp; drop files here</p>
            <p className="text-muted-foreground text-xs">or click to browse from your device</p>
          </div>
        </div>

        {files.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {files.map((entry) => (
              <span
                key={entry.id}
                className="border-border bg-muted/50 inline-flex items-center gap-2 rounded-full border py-1 pr-1 pl-3 text-xs"
              >
                <FileText className="text-muted-foreground size-3.5 shrink-0" />
                <span className="text-foreground max-w-40 truncate font-medium">
                  {entry.file.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 rounded-full"
                  onClick={() => removeFile(entry.id)}
                  aria-label={`Remove ${entry.file.name}`}
                >
                  <X className="size-3" />
                </Button>
              </span>
            ))}
          </div>
        ) : null}

        <h3 className="text-foreground mt-6 mb-3 text-base font-semibold">Attached files</h3>
        <AttachedFilesTable data={project.documents} />
      </section>
    </PreconstructionTabLayout>
  );
}
