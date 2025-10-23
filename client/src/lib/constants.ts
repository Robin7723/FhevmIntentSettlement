import contractABI from "../../../contract-abi.json";
import { sepolia } from "viem/chains";

export const SEPOLIA_CHAIN_ID = sepolia.id;

export const FHEVM_SEPOLIA_CONFIG = {
  ACLAddress: "0xFee8407e2f5e3Ee68ad77cAE98c434e637f516e5",
  KMSVerifierAddress: "0x9D6891A6240D6130c54ae243d8005063D05fE14b",
  InputVerifierAddress: "0x9D6891A6240D6130c54ae243d8005063D05fE14b",
  FHEVMCoprocessorAddress: "0x0000000000000000000000000000000000000044",
  GatewayContractAddress: "0x0000000000000000000000000000000000000000",
};

// This will be updated after deployment
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

export const CONTRACT_ABI = contractABI as any[];
