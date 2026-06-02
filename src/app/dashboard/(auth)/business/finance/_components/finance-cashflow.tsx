"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart";

import { cashflowData } from "../_data";

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-teal-700)" },
  tradeCost: { label: "Trade Cost", color: "var(--color-orange-500)" }
} satisfies ChartConfig;

export function FinanceCashflow({ className }: { className?: string }) {
  return (
    <div className={className} data-slot="finance-cashflow">
      <h3 className="text-foreground text-xl font-bold tracking-tight">Revenue vs Trade Cost</h3>
      <p className="text-muted-foreground text-sm">January - December 2024</p>

      <ChartContainer config={chartConfig} className="bg-card mt-6 h-72 w-full">
        <BarChart accessibilityLayer data={cashflowData} barGap={4}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="tradeCost" fill="var(--color-tradeCost)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>

      <p className="text-foreground mt-4 flex items-center gap-1.5 text-sm font-semibold">
        Trending up by 5.2% this month <TrendingUp className="size-4" />
      </p>
      <p className="text-muted-foreground text-sm">Showing for last 12 months</p>
    </div>
  );
}
