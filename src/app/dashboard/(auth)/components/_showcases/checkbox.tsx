"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { ShowcaseSection } from "../_components/showcase-section";

export default function CheckboxShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Default">
        <Label className="flex items-center gap-2">
          <Checkbox /> Accept terms
        </Label>
      </ShowcaseSection>

      <ShowcaseSection title="States">
        <div className="flex flex-col gap-3">
          <Label className="flex items-center gap-2">
            <Checkbox defaultChecked /> Checked
          </Label>
          <Label className="flex items-center gap-2">
            <Checkbox /> Unchecked
          </Label>
          <Label className="flex items-center gap-2 opacity-60">
            <Checkbox disabled /> Disabled
          </Label>
          <Label className="flex items-center gap-2 opacity-60">
            <Checkbox disabled defaultChecked /> Disabled & checked
          </Label>
        </div>
      </ShowcaseSection>
    </div>
  );
}
