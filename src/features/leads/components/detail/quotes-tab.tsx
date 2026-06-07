"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  createLeadQuote,
  deleteLeadQuote,
  updateLeadQuoteStatus,
} from "../../actions/lead-quotes";
import { QUOTE_STATUS_OPTIONS } from "../../lib/lead-detail-types";
import type { LeadOverview, LeadQuoteRow } from "../../lib/lead-detail-types";
import { TabLayout } from "./tab-layout";

type QuotesTabProps = {
  overview: LeadOverview;
  leadId: string;
  quotes: LeadQuoteRow[];
  onChanged: () => void;
};

export function QuotesTab({
  overview,
  leadId,
  quotes,
  onChanged,
}: QuotesTabProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [isPending, startTransition] = useTransition();

  function add() {
    startTransition(async () => {
      const res = await createLeadQuote(leadId, {
        title,
        description,
        validUntil,
      });
      if (res.ok) {
        toast.success("Quote created");
        setAddOpen(false);
        setTitle("");
        setDescription("");
        setValidUntil("");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to create the quote.");
      }
    });
  }

  function changeStatus(quoteId: string, status: number) {
    startTransition(async () => {
      const res = await updateLeadQuoteStatus(leadId, quoteId, status);
      if (res.ok) onChanged();
      else toast.error(res.error ?? "Failed to update the quote.");
    });
  }

  function remove(quoteId: string) {
    startTransition(async () => {
      const res = await deleteLeadQuote(leadId, quoteId);
      if (res.ok) {
        toast.success("Quote deleted");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to delete the quote.");
      }
    });
  }

  return (
    <TabLayout overview={overview}>
      <section className="bg-card rounded-2xl border p-5">
        <header className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h3 className="text-foreground text-lg font-semibold">Quotes</h3>
          <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" />
            Add quote
          </Button>
        </header>

        {quotes.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-dashed py-10 text-center text-sm">
            No quotes yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-foreground font-semibold">
                    Quote
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Version
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Amount
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Valid until
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote, index) => (
                  <motion.tr
                    key={quote.id}
                    data-slot="table-row"
                    {...(reduceMotion
                      ? {}
                      : {
                          initial: { opacity: 0, y: 4 },
                          animate: { opacity: 1, y: 0 },
                          transition: {
                            duration: 0.25,
                            delay: index * 0.03,
                            ease: "easeOut" as const,
                          },
                        })}
                    className="hover:bg-muted/50 border-b transition-colors"
                  >
                    <TableCell className="text-foreground font-medium">
                      {quote.ref}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      v{quote.version}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {quote.amount}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {quote.validUntil}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{quote.statusLabel}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label={`Actions for ${quote.ref}`}
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {QUOTE_STATUS_OPTIONS.map((o) => (
                            <DropdownMenuItem
                              key={o.value}
                              onSelect={() => changeStatus(quote.id, o.value)}
                            >
                              Mark {o.label}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={() => remove(quote.id)}
                          >
                            <Trash2 />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add quote</DialogTitle>
            <DialogDescription>Create a quote for this lead.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="lq-title">Title</Label>
              <Input
                id="lq-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Initial proposal"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lq-desc">Description</Label>
              <Textarea
                id="lq-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional scope summary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lq-valid">Valid until</Label>
              <Input
                id="lq-valid"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={add} disabled={isPending || !title.trim()}>
              {isPending ? "Creating…" : "Create quote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabLayout>
  );
}
