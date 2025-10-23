import contractABI from "../../../contract-abi.json";

export const ZAMA_DEVNET_CHAIN_ID = 8009;

export const ZAMA_DEVNET = {
  id: ZAMA_DEVNET_CHAIN_ID,
  name: "Zama Devnet",
  nativeCurrency: {
    decimals: 18,
    name: "ZAMA",
    symbol: "ZAMA",
  },
  rpcUrls: {
    default: {
      http: ["https://devnet.zama.ai"],
    },
    public: {
      http: ["https://devnet.zama.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "Zama Explorer",
      url: "https://devnet.zama.ai",
    },
  },
  testnet: true,
};

// This will be updated after deployment
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

export const CONTRACT_ABI = contractABI as any[];
