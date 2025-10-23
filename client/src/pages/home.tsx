import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateIntent } from "@/components/CreateIntent";
import { SubmitOffer } from "@/components/SubmitOffer";
import { IntentList } from "@/components/IntentList";

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

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-card/80 backdrop-blur border rounded-lg p-6 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="font-semibold">Fully Encrypted</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                All swap amounts, rates, and limits remain encrypted on-chain using Fully Homomorphic Encryption (FHE)
              </p>
            </div>

            <div className="bg-card/80 backdrop-blur border rounded-lg p-6 space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold">Blind Bidding</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Solvers compete without seeing other offers, preventing MEV and ensuring fair price discovery
              </p>
            </div>

            <div className="bg-card/80 backdrop-blur border rounded-lg p-6 space-y-2">
              <div className="flex items-center gap-2 text-info">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="font-semibold">On-Chain Privacy</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Data stays encrypted even on the blockchain, accessible only with proper permissions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
