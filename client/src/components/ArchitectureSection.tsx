import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function ArchitectureSection() {
  return (
    <div className="mt-20 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Privacy-preserving cross-chain intent settlement architecture
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="text-4xl font-bold text-primary mb-2">1</div>
          <h3 className="text-xl font-semibold mb-3">User Creates Intent</h3>
          <p className="text-sm text-muted-foreground">
            Users create swap intents with encrypted parameters including amounts, rates, and limits. All sensitive data is encrypted using FHE before being submitted on-chain.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/5 to-secondary/10">
          <div className="text-4xl font-bold text-secondary mb-2">2</div>
          <h3 className="text-xl font-semibold mb-3">Solvers Submit Offers</h3>
          <p className="text-sm text-muted-foreground">
            Solvers compete by submitting encrypted offers without seeing other bids. They can only see intent parameters they're authorized to view, ensuring fair competition.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/5 to-info/10">
          <div className="text-4xl font-bold text-info mb-2">3</div>
          <h3 className="text-xl font-semibold mb-3">Automated Settlement</h3>
          <p className="text-sm text-muted-foreground">
            The smart contract matches intents with offers using encrypted computations, selecting the best offer and executing the settlement automatically and privately.
          </p>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-info/5">
        <h3 className="text-xl font-semibold mb-4">Technical Stack</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Zama FHEVM</div>
              <div className="text-sm text-muted-foreground">Fully Homomorphic Encryption virtual machine on Ethereum</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Sepolia Testnet</div>
              <div className="text-sm text-muted-foreground">Ethereum test network for development and testing</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Smart Contracts</div>
              <div className="text-sm text-muted-foreground">Solidity contracts with encrypted data types</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">React Frontend</div>
              <div className="text-sm text-muted-foreground">Modern web interface with RainbowKit wallet integration</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
