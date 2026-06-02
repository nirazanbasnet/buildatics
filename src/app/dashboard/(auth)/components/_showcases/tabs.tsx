"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShowcaseSection } from "../_components/showcase-section";

export default function TabsShowcase() {
  return (
    <div className="space-y-8">
      <ShowcaseSection title="Default">
        <div className="w-96">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-muted-foreground text-sm">
              Overview content
            </TabsContent>
            <TabsContent value="activity" className="text-muted-foreground text-sm">
              Activity content
            </TabsContent>
            <TabsContent value="settings" className="text-muted-foreground text-sm">
              Settings content
            </TabsContent>
          </Tabs>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With disabled tab">
        <div className="w-96">
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">Available</TabsTrigger>
              <TabsTrigger value="b" disabled>
                Disabled
              </TabsTrigger>
              <TabsTrigger value="c">Another</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="text-muted-foreground text-sm">
              First panel
            </TabsContent>
            <TabsContent value="c" className="text-muted-foreground text-sm">
              Third panel
            </TabsContent>
          </Tabs>
        </div>
      </ShowcaseSection>
    </div>
  );
}
