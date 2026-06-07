"use client";

import { useState } from "react";
import { Plus, FilePlus2, LibraryBig } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CreateDesignSheet } from "./create-design-sheet";
import { ImportDesignSheet } from "./import-design-sheet";

type AddDesignMenuProps = {
  // Called after a design is created or imported so the library can re-query.
  onSaved?: () => void;
};

export function AddDesignMenu({ onSaved }: AddDesignMenuProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="h-9">
            <Plus className="size-4" />
            Add Design
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem onSelect={() => setCreateOpen(true)}>
            <FilePlus2 className="size-4" />
            Create new
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setImportOpen(true)}>
            <LibraryBig className="size-4" />
            Import from library
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateDesignSheet
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSaved={onSaved}
      />
      <ImportDesignSheet
        open={importOpen}
        onOpenChange={setImportOpen}
        onSaved={onSaved}
      />
    </>
  );
}
