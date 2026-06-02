"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  applyCustomTheme,
  clearCustomTheme,
  loadCustomTheme,
  removeCustomTheme,
  saveCustomTheme
} from "@/lib/custom-theme";
import { DEFAULT_THEME } from "@/lib/themes";
import { useThemeConfig } from "@src/components/active-theme";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PLACEHOLDER = `:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --radius: 0.625rem;
}
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}`;

export function CustomThemeDialog({ open, onOpenChange }: Props) {
  const { setTheme } = useThemeConfig();
  const [css, setCss] = useState("");

  useEffect(() => {
    if (open) setCss(loadCustomTheme() ?? "");
  }, [open]);

  function handleApply() {
    const value = css.trim();
    if (!value) {
      toast.error("Paste the CSS from tweakcn first.");
      return;
    }
    saveCustomTheme(value);
    applyCustomTheme(value);
    // A pasted theme is authoritative — clear preset/radius/font overrides so its
    // `:root` / `.dark` variables aren't shadowed by the customizer's body attributes.
    setTheme({ ...DEFAULT_THEME });
    toast.success("Custom theme applied");
    onOpenChange(false);
  }

  function handleRemove() {
    removeCustomTheme();
    clearCustomTheme();
    setCss("");
    toast.success("Custom theme removed");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Custom theme</DialogTitle>
          <DialogDescription>
            Paste the CSS from a{" "}
            <a
              href="https://tweakcn.com/community"
              target="_blank"
              rel="noreferrer"
              className="text-foreground font-medium underline underline-offset-4"
            >
              tweakcn community theme
            </a>{" "}
            (the <code className="text-foreground">index.css</code> with{" "}
            <code className="text-foreground">:root</code> and{" "}
            <code className="text-foreground">.dark</code> variables) to apply it across the app.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="tweakcn-css">Theme CSS</Label>
          <Textarea
            id="tweakcn-css"
            value={css}
            onChange={(event) => setCss(event.target.value)}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            className="h-64 resize-none font-mono text-xs"
          />
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="ghost" className="text-muted-foreground" onClick={handleRemove}>
            <Trash2 />
            Remove
          </Button>
          <Button onClick={handleApply}>Apply theme</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
