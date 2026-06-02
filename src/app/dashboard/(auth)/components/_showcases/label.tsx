import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ShowcaseSection } from "../_components/showcase-section";

export default function LabelShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="With input">
        <div className="w-72 space-y-2">
          <Label htmlFor="full-name">Full name</Label>
          <Input id="full-name" placeholder="Jane Doe" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With checkbox">
        <Label className="flex items-center gap-2">
          <Checkbox /> Remember me
        </Label>
      </ShowcaseSection>
    </div>
  );
}
