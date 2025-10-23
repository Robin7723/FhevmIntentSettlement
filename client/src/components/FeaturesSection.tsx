import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Users, Eye, Check } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: "Fully Encrypted",
      description: "All swap amounts, rates, and limits remain encrypted on-chain using Fully Homomorphic Encryption (FHE)",
      color: "text-primary"
    },
    {
      icon: Eye,
      title: "Blind Bidding",
      description: "Solvers compete without seeing other offers, preventing MEV and ensuring fair price discovery",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "On-Chain Privacy",
      description: "Data stays encrypted even on the blockchain, accessible only with proper permissions",
      color: "text-info"
    },
    {
      icon: Zap,
      title: "Fast Settlement",
      description: "Automated matching and settlement of intents with minimal latency",
      color: "text-success"
    },
    {
      icon: Users,
      title: "Decentralized",
      description: "No central authority controls the protocol or has access to private data",
      color: "text-warning"
    },
    {
      icon: Check,
      title: "Verifiable",
      description: "All computations on encrypted data are cryptographically verifiable on-chain",
      color: "text-primary"
    }
  ];

  return (
    <div className="mt-20 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Key Features
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Privacy-first design powered by cutting-edge cryptography
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card/80 backdrop-blur">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-muted/50 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
