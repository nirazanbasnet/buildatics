import fs from "node:fs";
import path from "node:path";

export type Variant = { name: string; file: string };
export type Feature = { name: string; variants: Variant[]; notes: string | null };

const TEMPLATES_DIR = path.join(process.cwd(), "templates");

export function discoverTemplates(): Feature[] {
  if (!fs.existsSync(TEMPLATES_DIR)) return [];
  return fs
    .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d): Feature => {
      const featureDir = path.join(TEMPLATES_DIR, d.name);
      const variants = fs
        .readdirSync(featureDir)
        .filter((f) => /^Variant\d+\.tsx$/.test(f))
        .sort()
        .map((f) => ({ name: f.replace(/\.tsx$/, ""), file: f }));
      const notesPath = path.join(featureDir, "notes.md");
      const notes = fs.existsSync(notesPath) ? fs.readFileSync(notesPath, "utf8") : null;
      return { name: d.name, variants, notes };
    })
    .filter((f) => f.variants.length > 0);
}
