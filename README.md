# Encrypted Cross-Chain Intent Settlement Protocol

A privacy-preserving DeFi protocol built with [Zama FHEVM](https://docs.zama.ai/fhevm) (Fully Homomorphic Encryption) where users create encrypted swap intents and solvers compete blindly to fill them.

## 🔒 Key Innovation

**First encrypted intent protocol in the Zama ecosystem** - All sensitive data (swap amounts, exchange rates, chain selections, and deadlines) remain fully encrypted on-chain using FHE. This solves the MEV problem by enabling blind bidding where solvers cannot see competitors' offers or users' minimum acceptable rates.

## 📋 Features

### Smart Contract (Solidity 0.8.24)
- **EncryptedIntent**: Stores swap intents with TFHE encrypted types (`euint64` for amounts, `euint8` for chain IDs)
- **EncryptedOffer**: Solvers submit encrypted rates and fees that remain private
- **Blind Matching**: MVP accepts first offer (full comparison requires Gateway integration)
- **Access Control**: Proper TFHE permission management for contract and users

### Frontend (React + TypeScript)
- **Dual Interface**: Separate tabs for Users (create intents) and Solvers (submit offers)
- **Wallet Integration**: RainbowKit with custom Zama Devnet configuration (chainId: 8009)
- **FHE Encryption**: Client-side encryption using `fhevmjs` before submission
- **Real-time Dashboard**: View active intents, offer counts, and match status
- **Privacy Indicators**: Visual encryption badges (🔒) throughout the UI
- **Responsive Design**: Mobile-first with gradient backgrounds and smooth animations

## 🚨 Important Limitations (MVP)

### Gateway Integration Required
This MVP demonstrates the encrypted intent architecture but has the following limitations:

1. **Encryption Flow**: The current implementation uses `fhevmjs.createEncryptedInput` which produces client-side encrypted handles. For production deployment to Zama Devnet, proper **Gateway integration** is required to generate valid `einput` handles with cryptographic proofs.

2. **Matching Logic**: The MVP accepts the first offer without encrypted comparison. Full offer comparison using `TFHE.ge()` and `TFHE.le()` requires Gateway decryption capabilities.

3. **No Token Transfers**: This MVP focuses on the intent/offer mechanism. Actual ERC20 token transfers are not implemented.

### What Works
- ✅ Smart contract compiles successfully with fhevm@0.5.8
- ✅ Frontend wallet connection and UI flow
- ✅ Design system with encryption indicators
- ✅ Component architecture for intent creation and offer submission

### Production Requirements
To deploy to Zama Devnet, you would need to:
- Implement Gateway relayer integration for proper `einput` generation
- Add TFHE permissions for Gateway address
- Implement offer comparison logic with Gateway decryption
- Add ERC20 token transfer mechanisms
- Comprehensive end-to-end testing on actual devnet

## 🛠 Tech Stack

**Blockchain:**
- Hardhat 2.26+ with TypeScript
- Solidity 0.8.24 (Cancun EVM)
- fhevm@0.5.8 (Zama FHE library)
- ethers.js v6
- TypeChain for type-safe contract interactions

**Frontend:**
- React 18.3 with TypeScript
- RainbowKit 2.0.2 for wallet connection
- Wagmi 2.5.7 for Ethereum interactions
- Viem 2.7.15 for blockchain utilities
- fhevmjs 0.5.0 for client-side FHE encryption
- TanStack Query for state management
- Tailwind CSS with custom DeFi design system
- Lucide React for icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Compile smart contracts
npx hardhat compile

# Export contract ABI
npx tsx scripts/export-abi.ts

# Start development server
npm run dev
```

## 🔧 Configuration

### Hardhat (hardhat.config.cjs)
```javascript
networks: {
  zamaDevnet: {
    url: "https://devnet.zama.ai",
    chainId: 8009,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  }
}
```

### Frontend (client/src/lib/constants.ts)
Update `CONTRACT_ADDRESS` after deployment:
```typescript
export const CONTRACT_ADDRESS = "0x..."; // Your deployed contract address
```

## 📁 Project Structure

```
├── contracts/
│   └── EncryptedIntentProtocol.sol    # Main FHE smart contract
├── scripts/
│   ├── deploy.ts                       # Deployment script
│   └── export-abi.ts                   # ABI export utility
├── client/
│   └── src/
│       ├── components/
│       │   ├── CreateIntent.tsx        # User intent creation form
│       │   ├── SubmitOffer.tsx         # Solver offer submission
│       │   ├── IntentList.tsx          # Dashboard component
│       │   └── Header.tsx              # Wallet connection
│       ├── lib/
│       │   ├── fhevm.ts               # FHE encryption helpers
│       │   ├── wagmi.ts               # Wagmi configuration
│       │   └── constants.ts           # Contract ABI & address
│       └── pages/
│           └── home.tsx               # Main page with tabs
└── hardhat.config.cjs                 # Hardhat configuration
```

## 🎨 Design System

- **Primary Color**: `hsl(239 84% 67%)` - Trustworthy blue
- **Secondary Color**: `hsl(262 83% 58%)` - Premium purple
- **Success Color**: `hsl(142 76% 36%)` - Encryption green
- **Fonts**: Inter (body), Space Grotesk (headings)
- **Gradients**: Blue → Purple → Pink backgrounds
- **Icons**: Lock symbols for encrypted fields

## 🔐 Smart Contract API

### Core Functions

```solidity
// Create encrypted intent (user)
function createIntent(
    einput encryptedTokenIn,
    einput encryptedMinOut,
    einput encryptedSourceChain,
    einput encryptedDestChain,
    bytes calldata inputProof
) external returns (uint256 intentId)

// Submit encrypted offer (solver)
function submitOffer(
    uint256 intentId,
    einput encryptedRate,
    einput encryptedFee,
    bytes calldata inputProof
) external

// Match intent with first offer (anyone)
function matchIntent(uint256 intentId) external
```

### View Functions

```solidity
function isIntentActive(uint256 intentId) external view returns (bool)
function getOfferCount(uint256 intentId) external view returns (uint256)
function getIntentCreator(uint256 intentId) external view returns (address)
function getIntentTimestamp(uint256 intentId) external view returns (uint256)
```

## 🚀 Deployment

```bash
# Set private key
export PRIVATE_KEY="0x..."

# Deploy to Zama Devnet
npx hardhat run scripts/deploy.ts --network zamaDevnet

# Update CONTRACT_ADDRESS in client/src/lib/constants.ts
```

## 🧪 Testing

```bash
# Compile contracts
npx hardhat compile

# Run tests (when implemented)
npx hardhat test

# Start local development
npm run dev
```

## 📚 Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [TFHE Operations](https://docs.zama.ai/fhevm/fundamentals/operations)
- [fhevmjs NPM Package](https://www.npmjs.com/package/fhevmjs)
- [Zama Devnet](https://devnet.zama.ai)

## 📝 License

MIT

## 🙏 Acknowledgments

Built using [Zama's FHEVM](https://www.zama.ai/) - pioneering Fully Homomorphic Encryption for blockchain.

---

**Note**: This is an MVP demonstration. Production deployment requires Gateway integration for proper encryption/decryption flows on Zama Devnet.
