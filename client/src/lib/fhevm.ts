import { BrowserProvider } from "ethers";
import { initFhevm, createInstance } from "fhevmjs";

let fhevmInstance: any = null;

export async function initFhevmClient(provider: BrowserProvider) {
  if (fhevmInstance) return fhevmInstance;

  try {
    await initFhevm();
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    
    fhevmInstance = await createInstance({ chainId, publicKey: "" });
    return fhevmInstance;
  } catch (error) {
    console.error("Error initializing FHEVM:", error);
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
  return fhevmInstance;
}
