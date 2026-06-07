"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import type { ProjectOwner } from "../../lib/detail-types";

function OwnerRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <li className="group hover:bg-muted/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors">
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      <span className="text-foreground flex-1 text-sm font-medium">
        {label}
      </span>
      <span className="text-muted-foreground group-hover:text-foreground text-sm transition-all motion-safe:group-hover:-translate-x-0.5">
        {value}
      </span>
    </li>
  );
}

type DetailOwnersProps = {
  owners: ProjectOwner[];
};

// Tabbed Owners card (V1). Hidden by the caller when there are no owners.
export function DetailOwners({ owners }: DetailOwnersProps) {
  const [activeId, setActiveId] = useState(owners[0]?.id ?? "");
  const active = owners.find((o) => o.id === activeId) ?? owners[0];
  const reduceMotion = useReducedMotion() ?? false;

  if (!active) return null;

  return (
    <section className="bg-card rounded-2xl border p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-foreground text-base font-semibold">Owners</h3>
        {owners.length > 1 ? (
          <div className="bg-muted flex items-center gap-1 rounded-md p-1">
            {owners.map((owner) => {
              const isActive = owner.id === active.id;
              return (
                <button
                  key={owner.id}
                  type="button"
                  onClick={() => setActiveId(owner.id)}
                  className={cn(
                    "rounded px-3 py-1 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {owner.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={active.id}
          initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex flex-col gap-3"
        >
          <OwnerRow icon={User} label="Name" value={active.name} />
          <OwnerRow icon={MapPin} label="Address" value={active.address} />
          <OwnerRow icon={Mail} label="Email" value={active.email} />
          <OwnerRow icon={Phone} label="Contact" value={active.phone} />
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
