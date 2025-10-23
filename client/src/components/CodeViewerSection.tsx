import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode, Copy, Check } from "lucide-react";

export function CodeViewerSection() {
  const [selectedFile, setSelectedFile] = useState("contract");
  const [copied, setCopied] = useState(false);

  const codeFiles = {
    contract: {
      name: "EncryptedIntentProtocol.sol",
      language: "solidity",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";

contract EncryptedIntentProtocol is GatewayCaller {
    struct EncryptedIntent {
        address user;
        euint64 encryptedTokenInAmount;
        euint64 encryptedMinTokenOut;
        euint8 encryptedSourceChain;
        euint8 encryptedDestChain;
        euint64 encryptedDeadline;
        uint256 createdAt;
        bool isActive;
        bool isFilled;
    }
    
    mapping(uint256 => EncryptedIntent) public intents;
    uint256 public intentCounter;
    
    function createIntent(
        einput encryptedTokenIn,
        einput encryptedMinOut,
        einput encryptedSourceChain,
        einput encryptedDestChain,
        bytes calldata inputProof
    ) external returns (uint256) {
        uint256 intentId = intentCounter++;
        
        euint64 tokenInAmount = TFHE.asEuint64(encryptedTokenIn, inputProof);
        euint64 minTokenOut = TFHE.asEuint64(encryptedMinOut, inputProof);
        euint8 sourceChain = TFHE.asEuint8(encryptedSourceChain, inputProof);
        euint8 destChain = TFHE.asEuint8(encryptedDestChain, inputProof);
        
        // Allow contract and user to access encrypted values
        TFHE.allow(tokenInAmount, address(this));
        TFHE.allow(minTokenOut, address(this));
        TFHE.allow(tokenInAmount, msg.sender);
        TFHE.allow(minTokenOut, msg.sender);
        
        intents[intentId] = EncryptedIntent({
            user: msg.sender,
            encryptedTokenInAmount: tokenInAmount,
            encryptedMinTokenOut: minTokenOut,
            encryptedSourceChain: sourceChain,
            encryptedDestChain: destChain,
            encryptedDeadline: TFHE.asEuint64(uint64(block.timestamp + 1 hours)),
            createdAt: block.timestamp,
            isActive: true,
            isFilled: false
        });
        
        return intentId;
    }
}`
    },
    client: {
      name: "CreateIntent.tsx",
      language: "typescript",
      code: `import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { initFhevmClient } from "@/lib/fhevm";

export function CreateIntent() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [tokenIn, setTokenIn] = useState("");
  const [minTokenOut, setMinTokenOut] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateIntent = async () => {
    const provider = new BrowserProvider(walletClient as any);
    const signer = await provider.getSigner();
    
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
    
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    const tx = await contract.createIntent(
      encryptedData.handles[0],
      encryptedData.handles[1],
      encryptedData.handles[2],
      encryptedData.handles[3],
      encryptedData.inputProof
    );
    
    await tx.wait();
  };
  
  return (
    <form onSubmit={handleCreateIntent}>
      {/* Form fields */}
    </form>
  );
}`
    },
    fhevm: {
      name: "fhevm.ts",
      language: "typescript",
      code: `import { BrowserProvider } from "ethers";
import { initFhevm, createInstance } from "fhevmjs";
import { SEPOLIA_CHAIN_ID, FHEVM_SEPOLIA_CONFIG } from "./constants";

let fhevmInstance: any = null;

export async function initFhevmClient(provider: BrowserProvider) {
  if (fhevmInstance) return fhevmInstance;
  
  await initFhevm();
  
  fhevmInstance = await createInstance({
    chainId: SEPOLIA_CHAIN_ID,
    networkUrl: "https://sepolia.infura.io/v3/...",
    aclAddress: FHEVM_SEPOLIA_CONFIG.ACLAddress,
    kmsVerifierAddress: FHEVM_SEPOLIA_CONFIG.KMSVerifierAddress,
  });
  
  return fhevmInstance;
}

export function getFhevmInstance() {
  if (!fhevmInstance) {
    throw new Error("FHEVM not initialized. Please connect your wallet first.");
  }
  return fhevmInstance;
}`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeFiles[selectedFile as keyof typeof codeFiles].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-20 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Live Code Examples
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the implementation details and see how FHEVM works
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="bg-muted/30 p-4 md:w-64 border-r">
            <div className="space-y-2">
              {Object.entries(codeFiles).map(([key, file]) => (
                <Button
                  key={key}
                  variant={selectedFile === key ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setSelectedFile(key)}
                >
                  <FileCode className="h-4 w-4" />
                  {file.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className={`language-${codeFiles[selectedFile as keyof typeof codeFiles].language}`}>
                {codeFiles[selectedFile as keyof typeof codeFiles].code}
              </code>
            </pre>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Want to try it yourself? Connect your wallet and start creating encrypted intents above
        </p>
      </div>
    </div>
  );
}
