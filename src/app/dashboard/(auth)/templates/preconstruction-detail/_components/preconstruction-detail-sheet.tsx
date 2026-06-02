"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { SheetMobileBar } from "@src/components/ui/sheet-mobile-bar";

import type { PreconstructionDetailProject } from "../_data";

import { PreconstructionDetailLayout } from "./preconstruction-detail-layout";
import { PreconstructionDetailLayoutV2 } from "./preconstruction-detail-layout-v2";
import type { PreconstructionDetailVariantId } from "./variants";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: PreconstructionDetailProject;
  variant?: PreconstructionDetailVariantId;
};

export function PreconstructionDetailSheet({ open, onOpenChange, project, variant = "v1" }: Props) {
  const Layout = variant === "v2" ? PreconstructionDetailLayoutV2 : PreconstructionDetailLayout;
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full overflow-y-auto p-0 sm:max-w-3xl lg:max-w-5xl"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Preconstruction Detail — {project.projectNo}</SheetTitle>
            <SheetDescription>Project detail view</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <SheetMobileBar onClose={close} title={`Project ${project.projectNo}`} />
        <div className="p-4 sm:p-6">
          <Layout project={project} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
