import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient, useReadContract } from "wagmi";
import { BrowserProvider, Contract } from "ethers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Lock, Users, Clock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";

interface IntentListProps {
  mode: "user" | "solver";
}

export function IntentList({ mode }: IntentListProps) {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();
  const [matchingIntent, setMatchingIntent] = useState<number | null>(null);

  // Read intent counter
  const { data: intentCounter } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "intentCounter",
  });

  const totalIntents = intentCounter ? Number(intentCounter) : 0;

  const handleMatchIntent = async (intentId: number) => {
    if (!isConnected || !walletClient || !publicClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet",
        variant: "destructive",
      });
      return;
    }

    setMatchingIntent(intentId);

    try {
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      toast({
        title: "Matching intent...",
        description: "Accepting the first offer",
      });

      const tx = await contract.matchIntent(intentId);
      await tx.wait();

      toast({
        title: "Intent matched successfully! ✓",
        description: `Intent #${intentId} has been filled`,
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error matching intent:", error);
      toast({
        title: "Error matching intent",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setMatchingIntent(null);
    }
  };

  if (!isConnected) {
    return (
      <Card data-testid="card-intent-list">
        <CardHeader>
          <CardTitle>{mode === "user" ? "My Intents" : "Active Intents"}</CardTitle>
          <CardDescription>Connect your wallet to view intents</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground text-center">
            Connect your wallet to see {mode === "user" ? "your" : "active"} intents
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-intent-list">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {mode === "user" ? "My Intents" : "Active Intents"}
          <Badge variant="secondary">{totalIntents} Total</Badge>
        </CardTitle>
        <CardDescription>
          {mode === "user" 
            ? "Track your encrypted swap intents"
            : "Find intents to fill as a solver"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {totalIntents === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-2">
            <Lock className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground text-center">
              No intents yet. Create the first encrypted intent!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from({ length: totalIntents }, (_, i) => (
              <IntentCard
                key={i}
                intentId={i}
                mode={mode}
                onMatch={handleMatchIntent}
                isMatching={matchingIntent === i}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IntentCard({ 
  intentId, 
  mode, 
  onMatch, 
  isMatching 
}: { 
  intentId: number; 
  mode: "user" | "solver";
  onMatch: (id: number) => void;
  isMatching: boolean;
}) {
  const { data: isActive } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "isIntentActive",
    args: [BigInt(intentId)],
  });

  const { data: offerCount } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getOfferCount",
    args: [BigInt(intentId)],
  });

  const { data: creator } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getIntentCreator",
    args: [BigInt(intentId)],
  });

  const { data: timestamp } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getIntentTimestamp",
    args: [BigInt(intentId)],
  });

  const active = Boolean(isActive);
  const offers = offerCount ? Number(offerCount) : 0;
  const createdTime = timestamp ? new Date(Number(timestamp) * 1000) : new Date();

  return (
    <div 
      className="border rounded-lg p-4 space-y-3 hover-elevate"
      data-testid={`intent-card-${intentId}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Intent #{intentId}</span>
            {active ? (
              <Badge variant="default" className="bg-success text-white">Active</Badge>
            ) : (
              <Badge variant="secondary">Filled</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Lock className="h-3 w-3" />
            All data encrypted on-chain
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {offers} {offers === 1 ? "offer" : "offers"}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(createdTime, { addSuffix: true })}
          </span>
        </div>
      </div>

      {creator && (
        <div className="text-xs text-muted-foreground font-mono truncate">
          Creator: {creator.toString().slice(0, 10)}...{creator.toString().slice(-8)}
        </div>
      )}

      {mode === "solver" && active && offers > 0 && (
        <Button
          onClick={() => onMatch(intentId)}
          disabled={isMatching}
          size="sm"
          className="w-full bg-success hover:bg-success/90 text-white"
          data-testid={`button-match-${intentId}`}
        >
          {isMatching ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Matching...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-3 w-3" />
              Match Best Offer
            </>
          )}
        </Button>
      )}
    </div>
  );
}
