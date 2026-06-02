import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ShowcaseSection } from "../_components/showcase-section";

export default function AvatarShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="With image">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </ShowcaseSection>

      <ShowcaseSection title="Fallback only">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">N</AvatarFallback>
        </Avatar>
      </ShowcaseSection>

      <ShowcaseSection title="Sizes">
        <Avatar className="size-6">
          <AvatarFallback className="text-xs">SM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar className="size-12">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <Avatar className="size-16">
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </ShowcaseSection>

      <ShowcaseSection title="Stack">
        <div className="flex -space-x-2">
          {["A", "B", "C", "D"].map((l) => (
            <Avatar key={l} className="ring-background ring-2">
              <AvatarFallback>{l}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
