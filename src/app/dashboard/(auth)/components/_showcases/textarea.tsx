import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ShowcaseSection } from "../_components/showcase-section";

export default function TextareaShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Default">
        <div className="w-96">
          <Textarea placeholder="Write a short message…" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With label and helper">
        <div className="w-96 space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" rows={4} />
          <p className="text-muted-foreground text-xs">Max 280 characters.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Disabled">
        <div className="w-96">
          <Textarea placeholder="Disabled" disabled />
        </div>
      </ShowcaseSection>
    </div>
  );
}
