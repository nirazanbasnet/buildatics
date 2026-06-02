import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { ShowcaseSection } from "../_components/showcase-section";

export default function CardShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Basic">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Project</CardTitle>
            <CardDescription>Short description of the surface.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Body content sits inside CardContent.</p>
          </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="With action and footer">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>You are on the Pro plan.</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">
                Manage
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Renews on 12 Jun 2026. Includes 5 seats.
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
            <Button size="sm">Upgrade</Button>
          </CardFooter>
        </Card>
      </ShowcaseSection>
    </div>
  );
}
