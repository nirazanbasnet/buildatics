"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  Home,
  LayoutGrid,
  Palette,
  RefreshCw,
  Type,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { DesignGrid } from "@/features/designs/components/grid/design-grid";
import { DesignEmptyState } from "@/features/designs/components/grid/design-empty-state";
import type { DesignProperty, DesignView } from "@/features/designs";

import { regenerateIframe } from "../actions/regenerate-iframe";
import { updatePublicDesignStyle } from "../actions/update-style";
import {
  COLOR_OPTIONS,
  DEFAULT_SHARE_CONFIG,
  FONT_OPTIONS,
  LAYOUT_OPTIONS,
  gridClassNameFor,
  type LayoutId,
  type ShareConfig,
} from "../lib/share-config";

const VIEW_ITEMS = [
  { value: "facade" as const, label: "Facade View", icon: Home },
  { value: "floor" as const, label: "Floor Plan View", icon: LayoutGrid },
];

type ShareToSiteProps = {
  iframeCode: string;
  embedSrc: string;
  initialDesigns: DesignProperty[];
  initialConfig: ShareConfig;
};

export function ShareToSite({
  iframeCode,
  embedSrc,
  initialDesigns,
  initialConfig,
}: ShareToSiteProps) {
  const [code, setCode] = useState(iframeCode);
  const [src, setSrc] = useState(embedSrc);
  const [designs, setDesigns] = useState(initialDesigns);
  const [view, setView] = useState<DesignView>("facade");
  const [config, setConfig] = useState<ShareConfig>(initialConfig);

  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isRegenerating, startRegenerate] = useTransition();
  const [isSaving, startSave] = useTransition();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const hasLink = code.trim().length > 0;
  const themePreset = config.theme !== "default" ? config.theme : undefined;
  const themeFont = config.font !== "default" ? config.font : undefined;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Iframe code copied to clipboard");
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  }

  function regenerate() {
    startRegenerate(async () => {
      const res = await regenerateIframe();
      if (res.ok) {
        setCode(res.iframe ?? "");
        setSrc(res.embedSrc ?? "");
        setDesigns(res.designs ?? []);
        toast.success(
          hasLink ? "Share link regenerated" : "Share link generated",
        );
        return;
      }
      toast.error(res.error ?? "Failed to regenerate the link.");
    });
  }

  function saveStyle() {
    startSave(async () => {
      const res = await updatePublicDesignStyle(config);
      if (res.ok) {
        toast.success("Appearance saved");
        return;
      }
      toast.error(res.error ?? "Failed to save the appearance.");
    });
  }

  return (
    <div className="grid h-full gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside
        className="bg-card flex h-fit flex-col gap-4 rounded-2xl border p-4"
        data-slot="share-controls"
      >
        <div className="space-y-1">
          <h1 className="text-base font-semibold">Share to Site</h1>
          <p className="text-muted-foreground text-sm">
            Embed your published designs on your own website.
          </p>
        </div>

        <Separator />

        <div className="grid gap-1.5">
          <Label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <Type className="size-3.5" />
            Font setting
          </Label>
          <Select
            value={config.font}
            onValueChange={(font) => setConfig({ ...config, font })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {FONT_OPTIONS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <LayoutGrid className="size-3.5" />
            Design style
          </Label>
          <Select
            value={config.layout}
            onValueChange={(layout) =>
              setConfig({ ...config, layout: layout as LayoutId })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              {LAYOUT_OPTIONS.map((layout) => (
                <SelectItem key={layout.value} value={layout.value}>
                  {layout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <Palette className="size-3.5" />
            Color theme
          </Label>
          <Select
            value={config.theme}
            onValueChange={(theme) => setConfig({ ...config, theme })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select color theme" />
            </SelectTrigger>
            <SelectContent>
              {COLOR_OPTIONS.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  <span
                    className="size-3 rounded-full"
                    style={{ backgroundColor: theme.colors[0] }}
                  />
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => setConfig({ ...DEFAULT_SHARE_CONFIG })}
            disabled={isSaving}
          >
            Reset
          </Button>
          <Button onClick={saveStyle} disabled={isSaving}>
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </div>

        <Separator />

        {hasLink ? (
          <>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="iframe-code">Embed code</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  aria-live="polite"
                  className={cn(
                    "h-7 transition-colors",
                    copied && "border-primary/40 bg-primary/10 text-primary",
                  )}
                >
                  <span className="relative grid size-3.5 place-items-center">
                    <Copy
                      className={cn(
                        "size-3.5 transition-all duration-200",
                        copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
                      )}
                    />
                    <Check
                      className={cn(
                        "absolute size-3.5 transition-all duration-200",
                        copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
                      )}
                    />
                  </span>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <Textarea
                id="iframe-code"
                readOnly
                value={code}
                spellCheck={false}
                className="h-32 resize-none font-mono text-xs"
              />
            </div>

            {src ? (
              <Button variant="secondary" className="w-full" asChild>
                <a href={src} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" />
                  Visit site
                </a>
              </Button>
            ) : null}

            <Button
              variant="outline"
              className="w-full"
              onClick={regenerate}
              disabled={isRegenerating}
            >
              <RefreshCw
                className={cn("size-4", isRegenerating && "animate-spin")}
              />
              {isRegenerating ? "Regenerating…" : "Regenerate link"}
            </Button>
            <p className="text-muted-foreground text-xs">
              Regenerating creates a new link and invalidates the old one.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
              <Globe className="size-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">No share link yet</p>
              <p className="text-muted-foreground text-sm">
                Generate a link to embed your designs on your website.
              </p>
            </div>
            <Button onClick={regenerate} disabled={isRegenerating}>
              <Globe className="size-4" />
              {isRegenerating ? "Generating…" : "Generate share link"}
            </Button>
          </div>
        )}
      </aside>

      <section
        className="min-w-0"
        data-theme-preset={themePreset}
        data-theme-font={themeFont}
        data-slot="share-preview"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div>
            <h2 className="text-sm font-medium">Live preview</h2>
            <span className="text-muted-foreground text-sm tabular-nums">
              {designs.length} {designs.length === 1 ? "design" : "designs"}
            </span>
          </div>
          <SegmentedNav<DesignView>
            items={VIEW_ITEMS}
            value={view}
            onValueChange={setView}
            ariaLabel="View"
            className="h-9 w-auto"
          />
        </div>

        <div
          className={cn(
            "transition-opacity duration-200",
            isRegenerating && "pointer-events-none opacity-50",
          )}
        >
          {designs.length === 0 ? (
            <DesignEmptyState />
          ) : (
            <DesignGrid
              designs={designs}
              view={view}
              className={gridClassNameFor(config.layout)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
