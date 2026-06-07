"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import type { DesignProperty } from "@/features/designs";

import { listSystemDesigns } from "../../actions/list-system-designs";
import { importCompanyDesign } from "../../actions/import-company-design";

type ImportDesignSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export function ImportDesignSheet({ open, onOpenChange, onSaved }: ImportDesignSheetProps) {
  const [designs, setDesigns] = useState<DesignProperty[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [importingId, setImportingId] = useState<string | null>(null);
  const [isLoading, startLoad] = useTransition();
  const [isImporting, startImport] = useTransition();

  // Lazy-load the system catalogue the first time the sheet opens.
  useEffect(() => {
    if (!open || loaded) return;
    startLoad(async () => {
      const items = await listSystemDesigns();
      setDesigns(items);
      setLoaded(true);
    });
  }, [open, loaded]);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? designs.filter(
        (d) => d.title.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q)
      )
    : designs;

  function handleImport(design: DesignProperty) {
    setImportingId(design.id);
    startImport(async () => {
      const res = await importCompanyDesign(design.id);
      setImportingId(null);
      if (res.ok) {
        toast.success(`Imported "${design.title}"`);
        onOpenChange(false);
        onSaved?.();
        return;
      }
      toast.error(res.error ?? "Failed to import the design.");
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Import from library</SheetTitle>
          <SheetDescription className="sr-only">
            Copy a system design (with its images) into your company library.
          </SheetDescription>
        </SheetHeader>

        <div className="border-b px-4 py-3">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search designs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4">
          {isLoading && !loaded ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border p-2">
                <Skeleton className="size-16 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center text-sm">
              {q ? "No designs match your search." : "No system designs available to import."}
            </p>
          ) : (
            filtered.map((design) => (
              <div
                key={design.id}
                className="hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-2 transition-colors"
              >
                <div className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={design.facade}
                    alt={design.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{design.title}</p>
                  {design.brand ? (
                    <p className="text-muted-foreground truncate text-xs">{design.brand}</p>
                  ) : null}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isImporting}
                  onClick={() => handleImport(design)}
                >
                  {isImporting && importingId === design.id ? "Importing…" : "Import"}
                </Button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
