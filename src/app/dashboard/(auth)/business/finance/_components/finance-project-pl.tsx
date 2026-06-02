"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { MotionProgress } from "@src/components/ui/motion-progress";
import { MotionTableRow } from "@src/components/ui/motion-table-row";

import { projectPL } from "../_data";
import { PaginationNav } from "@src/components/pagination-nav";
import { FinanceToolbar } from "./finance-toolbar";

export function FinanceProjectPL() {
  return (
    <div>
      <FinanceToolbar />
      <div className="bg-card overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="pl-4 font-semibold">Project</TableHead>
              <TableHead className="text-right font-semibold">Profit</TableHead>
              <TableHead className="font-semibold">Margin</TableHead>
              <TableHead className="font-semibold">Stage</TableHead>
              <TableHead className="font-semibold">Contract</TableHead>
              <TableHead className="font-semibold">Est. Cost</TableHead>
              <TableHead className="font-semibold">Received</TableHead>
              <TableHead className="pr-4 font-semibold">Outstanding</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectPL.map((project, index) => (
              <MotionTableRow key={project.id} index={index}>
                <TableCell className="py-3 pl-4">
                  <div className="transition-transform motion-safe:group-hover:translate-x-0.5">
                    <p className="text-foreground text-sm font-semibold">{project.project}</p>
                    <p className="text-muted-foreground group-hover:text-foreground text-xs transition-colors">
                      {project.clientAddress}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-foreground text-right font-medium whitespace-nowrap">
                  {project.profit}
                </TableCell>
                <TableCell>
                  <MotionProgress
                    value={project.margin}
                    index={index}
                    trackClassName="h-1.5 w-24"
                  />
                </TableCell>
                <TableCell className="text-muted-foreground">{project.stage}</TableCell>
                <TableCell className="text-foreground font-semibold whitespace-nowrap">
                  {project.contract}
                </TableCell>
                <TableCell className="text-foreground font-semibold whitespace-nowrap">
                  {project.estCost}
                </TableCell>
                <TableCell className="font-semibold whitespace-nowrap text-green-600">
                  {project.received}
                </TableCell>
                <TableCell className="pr-4 font-semibold whitespace-nowrap text-red-600">
                  {project.outstanding}
                </TableCell>
              </MotionTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationNav />
    </div>
  );
}
