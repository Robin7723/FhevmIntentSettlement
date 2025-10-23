import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { ZAMA_DEVNET } from "./constants";

export const wagmiConfig = getDefaultConfig({
  appName: "Encrypted Intent Protocol",
  projectId: "encrypted-intent-protocol-fhevm",
  chains: [ZAMA_DEVNET as any],
  ssr: false,
});
