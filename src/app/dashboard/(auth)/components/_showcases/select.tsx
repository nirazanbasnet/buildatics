"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { ShowcaseSection } from "../_components/showcase-section";

export default function SelectShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Default">
        <div className="w-60 space-y-2">
          <Label>City</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sydney">Sydney</SelectItem>
              <SelectItem value="melbourne">Melbourne</SelectItem>
              <SelectItem value="brisbane">Brisbane</SelectItem>
              <SelectItem value="perth">Perth</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Grouped">
        <div className="w-60">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>East Coast</SelectLabel>
                <SelectItem value="syd">Sydney</SelectItem>
                <SelectItem value="bne">Brisbane</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>West Coast</SelectLabel>
                <SelectItem value="per">Perth</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Disabled">
        <div className="w-60">
          <Select disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unavailable" />
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
      </ShowcaseSection>
    </div>
  );
}
