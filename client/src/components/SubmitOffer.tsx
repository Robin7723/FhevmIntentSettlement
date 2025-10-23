import { useState } from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { BrowserProvider, Contract } from "ethers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2, Eye } from "lucide-react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { initFhevmClient } from "@/lib/fhevm";

export function SubmitOffer() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();

  const [intentId, setIntentId] = useState("");
  const [rate, setRate] = useState("");
  const [fee, setFee] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOffer = async () => {
    if (!isConnected || !walletClient || !publicClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit an offer",
        variant: "destructive",
      });
      return;
    }

    if (!intentId || !rate || !fee) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();

      toast({
        title: "Encrypting offer...",
        description: "Your bid will remain private using FHE",
      });

      // Initialize FHEVM
      await initFhevmClient(provider);

      // Create encrypted inputs
      const fhevmInstance = (await import("@/lib/fhevm")).getFhevmInstance();
      const input = fhevmInstance.createEncryptedInput(CONTRACT_ADDRESS, address!);
      
      input.add64(BigInt(rate));
      input.add64(BigInt(fee));

      const encryptedData = input.encrypt();

      toast({
        title: "Submitting offer...",
        description: "Publishing your encrypted bid on-chain",
      });

      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const tx = await contract.submitOffer(
        intentId,
        encryptedData.handles[0],
        encryptedData.handles[1],
        encryptedData.inputProof
      );

      toast({
        title: "Transaction submitted",
        description: "Waiting for confirmation...",
      });

      await tx.wait();

      toast({
        title: "Offer submitted successfully! 🔒",
        description: "Your encrypted offer is now competing blindly",
        variant: "default",
      });

      // Reset form
      setIntentId("");
      setRate("");
      setFee("");
    } catch (error: any) {
      console.error("Error submitting offer:", error);
      toast({
        title: "Error submitting offer",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="hover-elevate" data-testid="card-submit-offer">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Submit Blind Offer
          <Eye className="h-5 w-5 text-secondary" />
        </CardTitle>
        <CardDescription>
          Compete to fill intents - other solvers cannot see your bid
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="intent-id">
            Intent ID
          </Label>
          <Input
            id="intent-id"
            type="number"
            placeholder="0"
            value={intentId}
            onChange={(e) => setIntentId(e.target.value)}
            disabled={isSubmitting}
            data-testid="input-intent-id"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exchange-rate" className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-secondary" />
            Exchange Rate
          </Label>
          <Input
            id="exchange-rate"
            type="number"
            placeholder="975"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            disabled={isSubmitting}
            data-testid="input-exchange-rate"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fee" className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-secondary" />
            Fee Amount
          </Label>
          <Input
            id="fee"
            type="number"
            placeholder="5"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            disabled={isSubmitting}
            data-testid="input-fee"
          />
        </div>

        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 space-y-1">
          <p className="text-xs font-medium text-secondary flex items-center gap-2">
            <Lock className="h-3 w-3" />
            Blind Bidding Active
          </p>
          <p className="text-xs text-muted-foreground">
            Your offer is encrypted and invisible to other solvers, ensuring fair competition
          </p>
        </div>

        <Button
          onClick={handleSubmitOffer}
          disabled={!isConnected || isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90"
          data-testid="button-submit-offer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Encrypting & Submitting...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Submit Encrypted Offer
            </>
          )}
        </Button>

        {!isConnected && (
          <p className="text-sm text-muted-foreground text-center">
            Connect your wallet to submit an offer
          </p>
        )}
      </CardContent>
    </Card>
  );
}
