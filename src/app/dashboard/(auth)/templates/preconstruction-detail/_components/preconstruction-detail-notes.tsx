import { Textarea } from "@/components/ui/textarea";

export function PreconstructionDetailNotes() {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <h3 className="text-foreground text-base font-semibold">Notes</h3>
      <Textarea placeholder="" className="mt-4 min-h-28 resize-y" aria-label="Project notes" />
    </section>
  );
}
