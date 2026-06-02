"use client";

import { useSearchParams } from "next/navigation";

import { DisplayCenterShowcase } from "../../display-center/_components/display-center-showcase";

import type { ShareConfig } from "./config";

type Props = {
  config: ShareConfig;
};

export function ShareToSitePreview({ config }: Props) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "floor" ? "floor" : "facade";

  return (
    <DisplayCenterShowcase
      style={config.style}
      font={config.font}
      theme={config.color}
      view={view}
    />
  );
}
