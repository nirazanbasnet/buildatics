"use client";

import { useState } from "react";
import { ListFilter, Upload, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function DocumentsToolbar({ className }: Props) {
  const [statusActive, setStatusActive] = useState(true);

  return (
    <div
      className={cn("flex flex-wrap items-center justify-between gap-3 pb-4", className)}
      data-slot="documents-toolbar"
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Status</span>
        {statusActive ? (
          <Badge variant="default" className="h-7 gap-1 rounded-full py-1 pr-1 pl-3">
            Issued
            <Button
              variant="ghost"
              size="icon"
              className="size-5 rounded-full hover:bg-white/20"
              onClick={() => setStatusActive(false)}
              aria-label="Clear status filter"
            >
              <X className="size-3" />
            </Button>
          </Badge>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <ListFilter className="size-4" />
          Filter
        </Button>
        <Button size="sm" className="h-9">
          <Upload className="size-4" />
          Upload File
        </Button>
      </div>
    </div>
  );
}
