"use client";

import { AnimatedSection } from "@src/components/animated-section";

import { useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  MinusCircle,
  MoreHorizontal,
  Phone
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  preconstructionDetailTabItems,
  preconstructionDetailTabs,
  type PreconstructionCategory,
  type PreconstructionCategoryStatus,
  type PreconstructionDetailContact,
  type PreconstructionDetailOwner,
  type PreconstructionDetailProject,
  type PreconstructionDetailTab
} from "../_data";

import { DocumentsV2 } from "./documents-v2";
import { ItiPreconstructionV2 } from "./iti-preconstruction-v2";
import { PreconstructionTasks } from "./preconstruction-tasks";
import { PreconstructionTimeline } from "./preconstruction-timeline";

function Hero({ project }: { project: PreconstructionDetailProject }) {
  return (
    <section className="bg-card flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">{project.projectNo}</h2>
          <button
            type="button"
            className="text-foreground inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            In Progress
            <ChevronDown className="size-3.5" />
          </button>
        </div>
        <p className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
          <MapPin className="size-4" />
          {project.address}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" className="size-10 rounded-lg" aria-label="Call client">
          <Phone className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="size-10 rounded-lg" aria-label="Send mail">
          <Mail className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-lg"
          aria-label="Schedule meeting"
        >
          <CalendarDays className="size-4" />
        </Button>
      </div>
    </section>
  );
}

function KpiStrip({ project }: { project: PreconstructionDetailProject }) {
  return (
    <section className="bg-card divide-border grid grid-cols-2 divide-y rounded-2xl border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
      <div className="flex flex-col gap-1 p-4">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Progress
        </p>
        <p className="text-foreground text-xl font-bold tracking-tight">{project.progress}%</p>
        <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Budget</p>
        <p className="text-foreground text-xl font-bold tracking-tight">{project.totalBudget}</p>
        <p className="text-muted-foreground text-xs">Spent {project.spent}</p>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Timeline
        </p>
        <p className="text-foreground text-xl font-bold tracking-tight">{project.timeline}</p>
        <p className="text-muted-foreground text-xs">{project.timelineDate}</p>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Stage</p>
        <p className="text-foreground text-xl font-bold tracking-tight">{project.stage}</p>
        <p className="text-muted-foreground text-xs">{project.stageStatus}</p>
      </div>
    </section>
  );
}

const segmentStyles: Record<
  PreconstructionCategoryStatus,
  { track: string; fill: string; icon: typeof Check; iconColor: string }
> = {
  done: {
    track: "bg-emerald-500/15",
    fill: "bg-emerald-500",
    icon: Check,
    iconColor: "text-emerald-600 dark:text-emerald-400"
  },
  "in-progress": {
    track: "bg-blue-500/15",
    fill: "bg-blue-500",
    icon: MoreHorizontal,
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  pending: {
    track: "bg-orange-500/15",
    fill: "bg-orange-500",
    icon: MinusCircle,
    iconColor: "text-orange-600 dark:text-orange-400"
  }
};

function CategoryProgress({ categories }: { categories: PreconstructionCategory[] }) {
  const totalCompleted = categories.reduce((sum, c) => sum + c.completed, 0);
  const totalItems = categories.reduce((sum, c) => sum + c.total, 0);

  return (
    <section className="bg-card rounded-2xl border p-5">
      <header className="flex items-baseline justify-between gap-3">
        <h3 className="text-foreground text-base font-semibold">Category Progress</h3>
        <p className="text-muted-foreground text-xs">
          {totalCompleted}/{totalItems} items complete
        </p>
      </header>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const styles = segmentStyles[category.status];
          const fillPct = (category.completed / category.total) * 100;
          const Icon = styles.icon;
          return (
            <div key={category.id} className="flex flex-col gap-2">
              <div className={cn("h-1.5 w-full overflow-hidden rounded-full", styles.track)}>
                <div
                  className={cn("h-full rounded-full", styles.fill)}
                  style={{ width: `${fillPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium",
                    styles.iconColor
                  )}
                >
                  <Icon className="size-3" />
                  {category.completed}/{category.total}
                </span>
              </div>
              <p className="text-foreground text-xs leading-tight font-medium">{category.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function OwnersStack({ owners }: { owners: PreconstructionDetailOwner[] }) {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <h3 className="text-foreground text-base font-semibold">Owners</h3>
      <div className="mt-4 flex flex-col gap-3">
        {owners.map((owner) => (
          <div
            key={owner.id}
            className="border-border/60 grid grid-cols-1 gap-2 rounded-lg border p-4 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-x-4"
          >
            <p className="text-foreground text-sm font-semibold">{owner.label}</p>
            <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
              <div className="flex items-baseline justify-between gap-3 sm:flex-col sm:items-start sm:justify-start sm:gap-0">
                <dt className="text-muted-foreground text-xs">Name</dt>
                <dd className="text-foreground truncate font-medium">{owner.name}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 sm:flex-col sm:items-start sm:justify-start sm:gap-0">
                <dt className="text-muted-foreground text-xs">Contact</dt>
                <dd className="text-foreground truncate font-medium">{owner.contact}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 sm:col-span-2 sm:flex-col sm:items-start sm:justify-start sm:gap-0">
                <dt className="text-muted-foreground text-xs">Email</dt>
                <dd className="text-foreground truncate font-medium">{owner.email}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 sm:col-span-2 sm:flex-col sm:items-start sm:justify-start sm:gap-0">
                <dt className="text-muted-foreground text-xs">Address</dt>
                <dd className="text-foreground truncate font-medium">{owner.address}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactsGrid({ contacts }: { contacts: PreconstructionDetailContact[] }) {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <h3 className="text-foreground text-base font-semibold">Contacts</h3>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border-border/60 flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm"
          >
            <span className="text-foreground font-medium">{contact.role}</span>
            <span className="text-muted-foreground truncate">{contact.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotesBlock() {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <h3 className="text-foreground text-base font-semibold">Notes</h3>
      <Textarea placeholder="" className="mt-4 min-h-24 resize-y" aria-label="Project notes" />
    </section>
  );
}

function OverviewV2({ project }: { project: PreconstructionDetailProject }) {
  return (
    <div className="flex flex-col gap-4">
      <Hero project={project} />
      <KpiStrip project={project} />
      <CategoryProgress categories={project.categories} />
      <OwnersStack owners={project.owners} />
      <ContactsGrid contacts={project.contacts} />
      <NotesBlock />
    </div>
  );
}

type Props = {
  project: PreconstructionDetailProject;
  className?: string;
};

export function PreconstructionDetailLayoutV2({ project, className }: Props) {
  const [activeTab, setActiveTab] = useState<PreconstructionDetailTab>(
    preconstructionDetailTabs[0]
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <AnimatedSection>
        <SegmentedNav
          items={preconstructionDetailTabItems}
          value={activeTab}
          onValueChange={setActiveTab}
          ariaLabel="Preconstruction views"
        />
      </AnimatedSection>
      <AnimatedSection delay={0.04}>
        {activeTab === "Overview" ? (
          <OverviewV2 project={project} />
        ) : activeTab === "ITI Preconstruction" ? (
          <ItiPreconstructionV2 project={project} />
        ) : activeTab === "Tasks" ? (
          <PreconstructionTasks project={project} />
        ) : activeTab === "Documents" ? (
          <DocumentsV2 project={project} />
        ) : activeTab === "Timeline" ? (
          <PreconstructionTimeline project={project} />
        ) : (
          <div className="text-muted-foreground rounded-md border border-dashed py-12 text-center text-sm">
            {activeTab} — to be designed
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
