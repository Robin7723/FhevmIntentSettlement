import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Encrypted Intent Protocol",
  projectId: "encrypted-intent-protocol-fhevm",
  chains: [sepolia],
  ssr: false,
});
