"use client";

import { Suspense, useState } from "react";

import { cn } from "@/lib/utils";

import { DEFAULT_SHARE_CONFIG, type ShareConfig } from "./config";
import { ShareToSiteControls } from "./share-to-site-controls";
import { ShareToSitePreview } from "./share-to-site-preview";

type Props = {
  className?: string;
};

export function ShareToSiteLayout({ className }: Props) {
  const [config, setConfig] = useState<ShareConfig>(DEFAULT_SHARE_CONFIG);

  return (
    <div className={cn("flex h-full flex-col gap-6", className)}>
      <div className="grid h-full gap-2 overflow-auto xl:grid-cols-[256px_minmax(0,1fr)]">
        <ShareToSiteControls config={config} onChange={setConfig} />
        <Suspense fallback={<div className="bg-card min-h-96 rounded-2xl border" />}>
          <ShareToSitePreview config={config} />
        </Suspense>
      </div>
    </div>
  );
}
