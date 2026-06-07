"use client";

import { useState, useTransition } from "react";
import {
  CheckCircle,
  Circle,
  MoreHorizontal,
  Plus,
  Timer,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

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
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../../actions/lead-tasks";
import { TASK_STATUS_OPTIONS } from "../../lib/lead-detail-types";
import type { LeadOverview, LeadTask } from "../../lib/lead-detail-types";
import { TabLayout } from "./tab-layout";

const STATUS_ICON: Record<number, LucideIcon> = {
  0: Circle,
  1: Timer,
  2: CheckCircle,
};

type TasksTabProps = {
  overview: LeadOverview;
  leadId: string;
  tasks: LeadTask[];
  onChanged: () => void;
};

export function TasksTab({
  overview,
  leadId,
  tasks,
  onChanged,
}: TasksTabProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPending, startTransition] = useTransition();

  function add() {
    startTransition(async () => {
      const res = await createTask(leadId, {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      });
      if (res.ok) {
        toast.success("Task added");
        setAddOpen(false);
        setTitle("");
        setDescription("");
        setDueDate("");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to add the task.");
      }
    });
  }

  function changeStatus(taskId: string, status: number) {
    startTransition(async () => {
      const res = await updateTaskStatus(leadId, taskId, status);
      if (res.ok) onChanged();
      else toast.error(res.error ?? "Failed to update the task.");
    });
  }

  function remove(taskId: string) {
    startTransition(async () => {
      const res = await deleteTask(leadId, taskId);
      if (res.ok) {
        toast.success("Task deleted");
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to delete the task.");
      }
    });
  }

  return (
    <TabLayout overview={overview}>
      <section className="bg-card rounded-2xl border p-5">
        <header className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <h3 className="text-foreground text-lg font-semibold">Tasks</h3>
          <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" />
            Add task
          </Button>
        </header>

        {tasks.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-dashed py-10 text-center text-sm">
            No tasks yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-foreground font-semibold">
                    Task
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Due Date
                  </TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => {
                  const Icon = STATUS_ICON[task.status] ?? Circle;
                  return (
                    <motion.tr
                      key={task.id}
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
                        {task.title}
                        {task.description ? (
                          <span className="text-muted-foreground block text-xs font-normal">
                            {task.description}
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="-ml-2 h-8 gap-2"
                              disabled={isPending}
                            >
                              <Icon className="text-muted-foreground size-4" />
                              {task.statusLabel}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {TASK_STATUS_OPTIONS.map((o) => (
                              <DropdownMenuItem
                                key={o.value}
                                onSelect={() => changeStatus(task.id, o.value)}
                              >
                                {o.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {task.dueDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              aria-label={`Actions for ${task.title}`}
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() => remove(task.id)}
                            >
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
            <DialogDescription>Create a task for this lead.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="lt-title">Title</Label>
              <Input
                id="lt-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lt-desc">Description</Label>
              <Textarea
                id="lt-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lt-due">Due date</Label>
              <Input
                id="lt-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
              {isPending ? "Adding…" : "Add task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabLayout>
  );
}
