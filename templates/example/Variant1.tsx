import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExampleVariant1() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Example — Variant 1</CardTitle>
        <CardDescription>
          A sketch using the active UI kit (root /components/). Iterate here freely.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </CardContent>
    </Card>
  );
}
