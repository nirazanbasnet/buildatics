"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Plus, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { BrochureOwner } from "../_data";
import { BrochureField } from "./brochure-field";

type Props = {
  owners: BrochureOwner[];
  onAddOwner: () => string;
  onUpdateOwner: (id: string, patch: Partial<BrochureOwner>) => void;
  className?: string;
};

export function BrochureOwners({ owners, onAddOwner, onUpdateOwner, className }: Props) {
  const [activeId, setActiveId] = useState(owners[0]?.id);
  const active = owners.find((owner) => owner.id === activeId) ?? owners[0];

  function handleAdd() {
    setActiveId(onAddOwner());
  }

  return (
    <section
      className={cn("bg-card rounded-2xl border p-5", className)}
      data-slot="brochure-owners"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="bg-muted/60 flex flex-wrap gap-1 rounded-lg p-1"
          role="tablist"
          aria-label="Owners"
        >
          {owners.map((owner, index) => {
            const isActive = owner.id === active?.id;
            return (
              <button
                key={owner.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(owner.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Owner {index + 1}
              </button>
            );
          })}
        </div>
        <Button size="sm" className="h-9 gap-1.5" onClick={handleAdd}>
          <Plus className="size-4" />
          Add Owner
        </Button>
      </div>

      {active ? (
        <div className="mt-5 flex flex-col gap-3">
          <BrochureField
            icon={User}
            label="Name"
            value={active.name}
            onChange={(value) => onUpdateOwner(active.id, { name: value })}
          />
          <BrochureField
            icon={MapPin}
            label="Address"
            value={active.address}
            onChange={(value) => onUpdateOwner(active.id, { address: value })}
          />
          <BrochureField
            icon={Mail}
            label="Email"
            type="email"
            value={active.email}
            onChange={(value) => onUpdateOwner(active.id, { email: value })}
          />
          <BrochureField
            icon={Phone}
            label="Contact"
            value={active.contact}
            onChange={(value) => onUpdateOwner(active.id, { contact: value })}
          />
        </div>
      ) : null}
    </section>
  );
}
