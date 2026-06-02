"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Download, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { SheetMobileBar } from "@src/components/ui/sheet-mobile-bar";
import { cn } from "@/lib/utils";

import { documentStatusConfig, formatFileSize, type BusinessDocument } from "../_data";
import { getDocumentTypeIcon } from "./document-type-icon";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: BusinessDocument;
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground text-sm font-medium">{value}</span>
    </div>
  );
}

export function DocumentDetailSheet({ open, onOpenChange, document }: Props) {
  const close = () => onOpenChange(false);
  const status = documentStatusConfig[document.status];
  const Icon = getDocumentTypeIcon(document.type);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full overflow-y-auto p-0 sm:max-w-md"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>{document.fileName}</SheetTitle>
            <SheetDescription>File details</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <SheetMobileBar onClose={close} title="File details" />

        <div className="flex flex-col gap-6 p-4 sm:p-6" data-slot="document-detail">
          <header className="flex flex-col items-center gap-3 text-center">
            <span className="bg-muted text-foreground flex size-16 items-center justify-center rounded-2xl">
              <Icon className="size-7" />
            </span>
            <h3 className="text-foreground text-lg font-semibold">{document.fileName}</h3>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                status.badge
              )}
            >
              {status.label}
            </span>
          </header>

          <section className="divide-border divide-y">
            <Row label="Uploaded by" value={document.uploadedBy} />
            <Row label="Uploaded on" value={document.uploadedOn} />
            <Row label="Size" value={formatFileSize(document.size)} />
            <Row label="Type" value={<span className="capitalize">{document.type}</span>} />
          </section>

          <div className="flex flex-col gap-2">
            <Button
              variant="secondary"
              className="h-10 justify-center gap-2"
              onClick={() => toast.success("Download started")}
            >
              <Download className="size-4" />
              Download
            </Button>
            <Button
              variant="secondary"
              className="h-10 justify-center gap-2"
              onClick={() => toast.success("Share link copied")}
            >
              <Share2 className="size-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive h-10 justify-center gap-2"
              onClick={() => {
                toast.error("File deleted");
                close();
              }}
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
