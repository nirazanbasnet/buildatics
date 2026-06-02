import { Badge, badgeVariants } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  permissions: string[];
  max?: number;
  className?: string;
};

export function PermissionBadges({ permissions, max = 3, className }: Props) {
  const visible = permissions.slice(0, max);
  const overflow = permissions.slice(max);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {visible.map((permission) => (
        <Badge key={permission} variant="secondary" className="font-normal">
          {permission}
        </Badge>
      ))}
      {overflow.length > 0 ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={`Show ${overflow.length} more permission${overflow.length > 1 ? "s" : ""}`}
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "text-muted-foreground hover:bg-secondary/80 focus-visible:ring-ring cursor-pointer font-normal focus-visible:ring-2 focus-visible:outline-none"
              )}
            >
              +{overflow.length}
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto max-w-xs p-3">
            <p className="text-muted-foreground mb-2 text-[10px] font-medium tracking-wider uppercase">
              All permissions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {permissions.map((permission) => (
                <Badge key={permission} variant="secondary" className="font-normal">
                  {permission}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}
