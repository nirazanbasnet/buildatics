"use client";

import { useState, useTransition } from "react";
import { Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { PaginationNav } from "@src/components/pagination-nav";

import { queryUsers } from "../actions/query-users";
import type { UsersResult } from "../types";
import { CreateUserSheet } from "./create-user-sheet";
import { UsersTable } from "./users-table";

type UsersListProps = {
  initial: UsersResult;
  pageSize: number;
};

export function UsersList({ initial, pageSize }: UsersListProps) {
  const [items, setItems] = useState(initial.items);
  const [total, setTotal] = useState(initial.total);
  const [page, setPage] = useState(initial.pageNumber || 1);
  const [createOpen, setCreateOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function load(nextPage: number) {
    startTransition(async () => {
      const res = await queryUsers(nextPage, pageSize);
      setItems(res.items);
      setTotal(res.total);
      setPage(nextPage);
    });
  }

  function goToPage(next: number) {
    load(next);
  }

  function refresh() {
    load(page);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <span className="text-muted-foreground text-sm tabular-nums">
          {total} {total === 1 ? "user" : "users"}
        </span>
        <Button size="sm" className="h-9" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" />
          Create user
        </Button>
      </div>

      {items.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>No users yet</EmptyTitle>
            <EmptyDescription>
              Create an Admin or DesignAdmin to get started.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <div
            className={cn(
              "transition-opacity duration-200",
              isPending && "pointer-events-none opacity-50",
            )}
          >
            <UsersTable users={items} onChanged={refresh} />
          </div>
          {totalPages > 1 ? (
            <PaginationNav
              totalPages={totalPages}
              page={page}
              onPageChange={goToPage}
            />
          ) : null}
        </>
      )}

      <CreateUserSheet
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={refresh}
      />
    </div>
  );
}
