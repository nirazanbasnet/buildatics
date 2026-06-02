"use client";

import {
  Building2,
  ClipboardList,
  Construction,
  Droplets,
  Globe,
  HardHat,
  Lightbulb,
  Pencil,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

import type { PreconstructionDetailContact } from "../_data";

const roleIcons: Record<string, LucideIcon> = {
  "Geotech Engineer": Globe,
  "Structural Engineer": Building2,
  "Energy Rater": Lightbulb,
  "Building Surveyer": ClipboardList,
  Developer: Construction,
  Council: HardHat,
  "Water Authority": Droplets
};

type Props = {
  contacts: PreconstructionDetailContact[];
};

export function PreconstructionDetailContacts({ contacts }: Props) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="bg-card rounded-2xl border p-5">
      <header className="flex items-center justify-between gap-3">
        <h3 className="text-foreground text-base font-semibold">Contacts</h3>
        <Button variant="outline" size="icon" className="size-9" aria-label="Edit contacts">
          <Pencil className="size-4" />
        </Button>
      </header>

      <ul className="mt-5 flex flex-col gap-3">
        {contacts.map((contact, index) => {
          const Icon = roleIcons[contact.role] ?? Users;
          const motionProps = reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 4 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.25, delay: index * 0.03, ease: "easeOut" as const }
              };
          return (
            <motion.li
              key={contact.id}
              {...motionProps}
              className="group hover:bg-muted/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
            >
              <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-4" />
              </span>
              <span className="text-foreground flex-1 text-sm font-medium">{contact.role}</span>
              <span className="text-muted-foreground group-hover:text-foreground text-sm transition-all motion-safe:group-hover:-translate-x-0.5">
                {contact.value}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
