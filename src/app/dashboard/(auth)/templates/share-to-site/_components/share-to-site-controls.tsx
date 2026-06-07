"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, LayoutGrid, Palette, Type } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import {
  COLOR_OPTIONS,
  DEFAULT_SHARE_CONFIG,
  FONT_OPTIONS,
  STYLE_OPTIONS,
  buildEmbedSrc,
  buildIframeCode,
  type ShareConfig,
} from "./config";

type Props = {
  config: ShareConfig;
  onChange: (config: ShareConfig) => void;
};

export function ShareToSiteControls({ config, onChange }: Props) {
  const iframeCode = buildIframeCode(config);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copyIframe() {
    try {
      await navigator.clipboard.writeText(iframeCode);
      toast.success("Iframe code copied to clipboard");
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  }

  return (
    <aside
      className="bg-card flex h-fit flex-col gap-4 rounded-2xl border p-4"
      data-slot="share-controls"
    >
      <div className="grid gap-1.5">
        <Label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
          <Type className="size-3.5" />
          Font Setting
        </Label>
        <Select
          value={config.font}
          onValueChange={(value) => onChange({ ...config, font: value })}
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
          Design Style
        </Label>
        <Select
          value={String(config.style)}
          onValueChange={(value) =>
            onChange({
              ...config,
              style: Number(value) as ShareConfig["style"],
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select design style" />
          </SelectTrigger>
          <SelectContent>
            {STYLE_OPTIONS.map((style) => (
              <SelectItem key={style.value} value={String(style.value)}>
                {style.name}
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
          value={config.color}
          onValueChange={(value) => onChange({ ...config, color: value })}
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
          onClick={() => onChange({ ...DEFAULT_SHARE_CONFIG })}
        >
          Reset All
        </Button>
        <Button onClick={() => toast.success("Changes saved")}>Save</Button>
      </div>

      <Button variant="secondary" className="w-full" asChild>
        <a href={buildEmbedSrc(config)} target="_blank" rel="noreferrer">
          Visit Site
        </a>
      </Button>

      <Separator />

      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="iframe-code">Iframe</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={copyIframe}
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
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </div>
        <Textarea
          id="iframe-code"
          readOnly
          value={iframeCode}
          placeholder="Iframe code here"
          spellCheck={false}
          className="h-28 resize-none font-mono text-xs"
        />
      </div>
    </aside>
  );
}
