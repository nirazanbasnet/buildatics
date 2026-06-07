"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import { createCompanyDesign } from "../../actions/create-company-design";
import {
  createCompanyDesignFormSchema,
  type CreateCompanyDesignInput
} from "../../lib/create-company-design-schema";

type CreateDesignSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

const DEFAULTS: CreateCompanyDesignInput = {
  name: "",
  code: "",
  description: "",
  minimumLotWidthInMeters: "",
  minimumLotDepthInMeters: "",
  areaInSquares: "",
  bedrooms: "",
  bathrooms: "",
  livingRooms: "",
  maximumCarsInGarage: "",
  storeys: "",
  visibleOnWebsite: false
};

// Numeric fields rendered in a 2-up grid. label drives the FormLabel; key is the schema field.
const NUMERIC_FIELDS: Array<{
  key: keyof CreateCompanyDesignInput;
  label: string;
  step?: string;
}> = [
  { key: "minimumLotWidthInMeters", label: "Min lot width (m)", step: "0.1" },
  { key: "minimumLotDepthInMeters", label: "Min lot depth (m)", step: "0.1" },
  { key: "areaInSquares", label: "Area (squares)", step: "0.1" },
  { key: "storeys", label: "Storeys" },
  { key: "bedrooms", label: "Bedrooms" },
  { key: "bathrooms", label: "Bathrooms" },
  { key: "livingRooms", label: "Living rooms" },
  { key: "maximumCarsInGarage", label: "Garage (cars)" }
];

export function CreateDesignSheet({ open, onOpenChange, onSaved }: CreateDesignSheetProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateCompanyDesignInput>({
    resolver: zodResolver(createCompanyDesignFormSchema),
    defaultValues: DEFAULTS
  });

  useEffect(() => {
    if (open) form.reset(DEFAULTS);
  }, [open, form]);

  function onSubmit(values: CreateCompanyDesignInput) {
    startTransition(async () => {
      const res = await createCompanyDesign(values);
      if (res.ok) {
        toast.success("Design created");
        onOpenChange(false);
        onSaved?.();
        return;
      }
      if (res.fieldErrors?.name) form.setError("name", { message: res.fieldErrors.name });
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Create design</SheetTitle>
          <SheetDescription className="sr-only">
            Add a new company design. Images can be uploaded after the design is created.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hampton 28" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. HMP28" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 items-start gap-4">
                {NUMERIC_FIELDS.map((f) => (
                  <FormField
                    key={f.key}
                    control={form.control}
                    name={f.key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{f.label}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step={f.step ?? "1"}
                            placeholder="0"
                            {...field}
                            value={typeof field.value === "string" ? field.value : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <FormField
                control={form.control}
                name="visibleOnWebsite"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-4 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Visible on website</FormLabel>
                      <FormDescription>Show this design on your public website.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-2 border-t px-4 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating…" : "Create Design"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
