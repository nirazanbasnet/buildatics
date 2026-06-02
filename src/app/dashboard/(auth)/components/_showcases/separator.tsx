import { Separator } from "@/components/ui/separator";

import { ShowcaseSection } from "../_components/showcase-section";

export default function SeparatorShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Horizontal">
        <div className="w-80 space-y-1">
          <p className="text-sm font-medium">Account settings</p>
          <p className="text-muted-foreground text-sm">Manage your profile and preferences.</p>
          <Separator className="my-3" />
          <p className="text-muted-foreground text-xs">Last updated 12 May 2026</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Vertical">
        <div className="flex h-6 items-center gap-3 text-sm">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Components</span>
          <Separator orientation="vertical" />
          <span>API</span>
        </div>
      </ShowcaseSection>
    </div>
  );
}
