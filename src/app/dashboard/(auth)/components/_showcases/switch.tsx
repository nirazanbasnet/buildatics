"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { ShowcaseSection } from "../_components/showcase-section";

export default function SwitchShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Default">
        <Label className="flex items-center gap-2">
          <Switch /> Notifications
        </Label>
      </ShowcaseSection>

      <ShowcaseSection title="States">
        <div className="flex flex-col gap-3">
          <Label className="flex items-center gap-2">
            <Switch defaultChecked /> Enabled
          </Label>
          <Label className="flex items-center gap-2">
            <Switch /> Disabled by user
          </Label>
          <Label className="flex items-center gap-2 opacity-60">
            <Switch disabled /> Read-only off
          </Label>
          <Label className="flex items-center gap-2 opacity-60">
            <Switch disabled defaultChecked /> Read-only on
          </Label>
        </div>
      </ShowcaseSection>
    </div>
  );
}
