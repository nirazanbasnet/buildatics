"use client";

import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { ShowcaseSection } from "../_components/showcase-section";

export default function TooltipShowcase() {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        <ShowcaseSection title="On button">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Helpful hint goes here</TooltipContent>
          </Tooltip>
        </ShowcaseSection>

        <ShowcaseSection title="On icon">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="More info">
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">More information</TooltipContent>
          </Tooltip>
        </ShowcaseSection>

        <ShowcaseSection title="Sides">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  {side}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side}>From {side}</TooltipContent>
            </Tooltip>
          ))}
        </ShowcaseSection>
      </div>
    </TooltipProvider>
  );
}
