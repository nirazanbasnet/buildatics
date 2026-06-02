"use client";

import { ArrowRight, Loader2, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ShowcaseSection } from "../_components/showcase-section";

export default function ButtonShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </ShowcaseSection>

      <ShowcaseSection title="Sizes">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add">
          <Plus />
        </Button>
      </ShowcaseSection>

      <ShowcaseSection title="With icon">
        <Button>
          <Plus />
          New project
        </Button>
        <Button variant="outline">
          Continue
          <ArrowRight />
        </Button>
        <Button variant="destructive">
          <Trash2 />
          Delete
        </Button>
      </ShowcaseSection>

      <ShowcaseSection title="States">
        <Button disabled>Disabled</Button>
        <Button disabled>
          <Loader2 className="animate-spin" />
          Loading
        </Button>
      </ShowcaseSection>
    </div>
  );
}
