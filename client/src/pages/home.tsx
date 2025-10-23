import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateIntent } from "@/components/CreateIntent";
import { SubmitOffer } from "@/components/SubmitOffer";
import { IntentList } from "@/components/IntentList";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { CodeViewerSection } from "@/components/CodeViewerSection";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"user" | "solver">("user");

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 -z-10" />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Privacy-Preserving Intent Settlement
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Create encrypted swap intents or compete as a solver to fill them. All sensitive data remains encrypted on-chain using FHE.
          </p>
        </div>

        {/* Tab Interface */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "user" | "solver")}
          className="w-full max-w-6xl mx-auto"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-12" data-testid="tabs-interface">
            <TabsTrigger 
              value="user" 
              className="text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid="tab-user"
            >
              I'm a User
            </TabsTrigger>
            <TabsTrigger 
              value="solver"
              className="text-base font-semibold data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              data-testid="tab-solver"
            >
              I'm a Solver
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="space-y-8" data-testid="content-user">
            <div className="grid gap-8 lg:grid-cols-2">
              <CreateIntent />
              <IntentList mode="user" />
            </div>
          </TabsContent>

          <TabsContent value="solver" className="space-y-8" data-testid="content-solver">
            <div className="grid gap-8 lg:grid-cols-2">
              <SubmitOffer />
              <IntentList mode="solver" />
            </div>
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <FeaturesSection />

        {/* Architecture Section */}
        <ArchitectureSection />

        {/* Code Viewer Section */}
        <CodeViewerSection />
      </div>
    </div>
  );
}
