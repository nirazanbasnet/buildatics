"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ShowcaseSection } from "../_components/showcase-section";

export default function InputShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Default">
        <div className="w-72">
          <Input placeholder="Enter your name" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With label">
        <div className="w-72 space-y-2">
          <Label htmlFor="email-input">Email</Label>
          <Input id="email-input" type="email" placeholder="you@example.com" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="States">
        <div className="w-72 space-y-3">
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Invalid" aria-invalid />
          <Input type="password" placeholder="Password" defaultValue="secret123" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With icon (manual)">
        <div className="relative w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input placeholder="Search…" className="pl-9" />
        </div>
      </ShowcaseSection>
    </div>
  );
}
