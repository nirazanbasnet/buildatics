import { Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { ShowcaseSection } from "../_components/showcase-section";

export default function BadgeShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </ShowcaseSection>

      <ShowcaseSection title="With icon">
        <Badge>
          <Check className="size-3" />
          Active
        </Badge>
        <Badge variant="destructive">
          <X className="size-3" />
          Failed
        </Badge>
        <Badge variant="outline" className="rounded-full">
          v2.4
        </Badge>
      </ShowcaseSection>

      <ShowcaseSection title="As counter">
        <Badge variant="secondary" className="rounded-full px-2">
          12
        </Badge>
        <Badge variant="default" className="rounded-full px-2">
          99+
        </Badge>
      </ShowcaseSection>
    </div>
  );
}
