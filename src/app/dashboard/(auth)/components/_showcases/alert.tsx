import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ShowcaseSection } from "../_components/showcase-section";

export default function AlertShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Default">
        <Alert>
          <Info />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </ShowcaseSection>

      <ShowcaseSection title="Destructive">
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session expired. Please log in again.
          </AlertDescription>
        </Alert>
      </ShowcaseSection>

      <ShowcaseSection title="Title only">
        <Alert>
          <CheckCircle2 />
          <AlertTitle>Changes saved.</AlertTitle>
        </Alert>
      </ShowcaseSection>
    </div>
  );
}
