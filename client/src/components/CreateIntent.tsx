import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { BrowserProvider, Contract } from "ethers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2 } from "lucide-react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { initFhevmClient } from "@/lib/fhevm";

export function CreateIntent() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();

  const [tokenIn, setTokenIn] = useState("");
  const [minTokenOut, setMinTokenOut] = useState("");
  const [sourceChain, setSourceChain] = useState("");
  const [destChain, setDestChain] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateIntent = async () => {
    if (!isConnected || !walletClient || !publicClient) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create an intent",
        variant: "destructive",
      });
      return;
    }

    if (!tokenIn || !minTokenOut || !sourceChain || !destChain) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    try {
      const provider = new BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      
      toast({
        title: "Encrypting data...",
        description: "Using FHE to encrypt your sensitive data",
      });

      // Initialize FHEVM
      await initFhevmClient(provider);

      // Create encrypted inputs
      const fhevmInstance = (await import("@/lib/fhevm")).getFhevmInstance();
      const input = fhevmInstance.createEncryptedInput(CONTRACT_ADDRESS, address!);
      
      input.add64(BigInt(tokenIn));
      input.add64(BigInt(minTokenOut));
      input.add8(Number(sourceChain));
      input.add8(Number(destChain));

      const encryptedData = input.encrypt();

      toast({
        title: "Creating intent...",
        description: "Submitting encrypted intent to the blockchain",
      });

      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const tx = await contract.createIntent(
        encryptedData.handles[0],
        encryptedData.handles[1],
        encryptedData.handles[2],
        encryptedData.handles[3],
        encryptedData.inputProof
      );

      toast({
        title: "Transaction submitted",
        description: "Waiting for confirmation...",
      });

      await tx.wait();

      toast({
        title: "Intent created successfully! 🔒",
        description: "Your encrypted intent has been published on-chain",
        variant: "default",
      });

      // Reset form
      setTokenIn("");
      setMinTokenOut("");
      setSourceChain("");
      setDestChain("");
    } catch (error: any) {
      console.error("Error creating intent:", error);
      toast({
        title: "Error creating intent",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="hover-elevate" data-testid="card-create-intent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Create Encrypted Intent
          <Lock className="h-5 w-5 text-primary" />
        </CardTitle>
        <CardDescription>
          All values will be encrypted on-chain using FHE before submission
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-in" className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-primary" />
            Token In Amount
          </Label>
          <Input
            id="token-in"
            type="number"
            placeholder="1000"
            value={tokenIn}
            onChange={(e) => setTokenIn(e.target.value)}
            disabled={isCreating}
            data-testid="input-token-in"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="min-out" className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-primary" />
            Minimum Token Out
          </Label>
          <Input
            id="min-out"
            type="number"
            placeholder="950"
            value={minTokenOut}
            onChange={(e) => setMinTokenOut(e.target.value)}
            disabled={isCreating}
            data-testid="input-min-token-out"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source-chain" className="flex items-center gap-2">
              <Lock className="h-3 w-3 text-primary" />
              Source Chain
            </Label>
            <Input
              id="source-chain"
              type="number"
              placeholder="1"
              value={sourceChain}
              onChange={(e) => setSourceChain(e.target.value)}
              disabled={isCreating}
              data-testid="input-source-chain"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dest-chain" className="flex items-center gap-2">
              <Lock className="h-3 w-3 text-primary" />
              Dest Chain
            </Label>
            <Input
              id="dest-chain"
              type="number"
              placeholder="137"
              value={destChain}
              onChange={(e) => setDestChain(e.target.value)}
              disabled={isCreating}
              data-testid="input-dest-chain"
            />
          </div>
        </div>

        <Button
          onClick={handleCreateIntent}
          disabled={!isConnected || isCreating}
          className="w-full"
          data-testid="button-create-intent"
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Encrypting & Creating...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Create Encrypted Intent
            </>
          )}
        </Button>

        {!isConnected && (
          <p className="text-sm text-muted-foreground text-center">
            Connect your wallet to create an intent
          </p>
        )}
      </CardContent>
    </Card>
  );
}
