"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { ShareToSiteVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: ShareToSiteVariantId }) {
  const router = useRouter();

  function apply() {
    document.cookie = `share_to_site_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `share_to_site_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Share to Site ${variant.toUpperCase()} promoted`, {
      description: "It is now active on /dashboard/share-to-site."
    });
    router.push("/dashboard/share-to-site");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={apply}>
      <Check className="size-4" />
      Use this
    </Button>
  );
}
