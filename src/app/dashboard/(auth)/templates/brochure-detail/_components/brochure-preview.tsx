import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function BrochurePreview({ className }: Props) {
  return (
    <div
      role="img"
      aria-label="Brochure preview"
      className={cn("bg-muted min-h-[32rem] w-full rounded-lg", className)}
      data-slot="brochure-preview"
    />
  );
}
