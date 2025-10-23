import { BrowserProvider } from "ethers";
import { initFhevm, createInstance } from "fhevmjs";
import { SEPOLIA_CHAIN_ID, FHEVM_SEPOLIA_CONFIG } from "./constants";

let fhevmInstance: any = null;
let isInitializing = false;
let initializationError: Error | null = null;

export async function initFhevmClient(provider: BrowserProvider) {
  if (fhevmInstance) return fhevmInstance;
  if (isInitializing) {
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (fhevmInstance) return fhevmInstance;
    if (initializationError) throw initializationError;
  }

  isInitializing = true;
  initializationError = null;

  try {
    await initFhevm();
    
    fhevmInstance = await createInstance({
      chainId: SEPOLIA_CHAIN_ID,
      networkUrl: "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      aclAddress: FHEVM_SEPOLIA_CONFIG.ACLAddress,
      kmsVerifierAddress: FHEVM_SEPOLIA_CONFIG.KMSVerifierAddress,
    });
    
    console.log("FHEVM initialized successfully for Sepolia");
    isInitializing = false;
    return fhevmInstance;
  } catch (error) {
    console.error("Error initializing FHEVM:", error);
    initializationError = error as Error;
    isInitializing = false;
    throw error;
  }
}

export async function encryptValue(
  value: number | bigint,
  contractAddress: string,
  provider: BrowserProvider
): Promise<{ data: Uint8Array; proof: string }> {
  if (!fhevmInstance) {
    await initFhevmClient(provider);
  }

  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  const input = fhevmInstance.createEncryptedInput(contractAddress, signerAddress);
  input.add64(BigInt(value));
  
  const encrypted = input.encrypt();
  
  return {
    data: encrypted.handles[0],
    proof: encrypted.inputProof,
  };
}

export function getFhevmInstance() {
  if (!fhevmInstance) {
    throw new Error("FHEVM not initialized. Please connect your wallet first.");
  }
  return fhevmInstance;
}

export function isFhevmReady() {
  return fhevmInstance !== null;
}
