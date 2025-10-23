# Encrypted Cross-Chain Intent Settlement Protocol

## Overview

This is a privacy-preserving DeFi protocol built with Zama FHEVM (Fully Homomorphic Encryption) that enables encrypted cross-chain swap intents. Users create swap intents with fully encrypted parameters (amounts, rates, chain IDs, deadlines), and solvers compete to fill them while all sensitive data remains encrypted on-chain. The application consists of a Solidity smart contract using TFHE encryption primitives and a React-based frontend with wallet integration for interacting with the protocol.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Smart Contract Layer (Solidity 0.8.24)

**Core Contract: EncryptedIntentProtocol**
- Built on Zama FHEVM v0.5.8 using fully homomorphic encryption
- Utilizes encrypted data types: `euint64` (for amounts/rates), `euint8` (for chain IDs), `ebool` (for boolean flags)
- Inherits from `GatewayCaller` for decryption capabilities
- Uses TFHE library for all encrypted operations and access control

**Data Model:**
- **EncryptedIntent**: Stores user swap requests with encrypted token amounts, min output requirements, source/destination chains, and deadlines
- **EncryptedOffer**: Stores solver offers with encrypted exchange rates and fees
- Intent-to-offers mapping enables multiple solvers to compete for each intent

**Key Architectural Decisions:**
- **Privacy-First Design**: All sensitive financial data (amounts, rates, limits, chain selections) encrypted on-chain using FHE to prevent MEV and front-running
- **MVP Limitation - Gateway Integration**: Current implementation uses client-side encryption (`fhevmjs.createEncryptedInput`) which is suitable for demonstration but requires full Gateway integration for production deployment to enable proper encrypted comparisons and decryption
- **Simplified Matching Logic**: Accepts first offer without encrypted comparison (production would use `TFHE.ge()` and `TFHE.le()` with Gateway decryption)
- **No Token Transfers**: MVP focuses on intent/offer mechanism architecture; actual ERC20 transfers not implemented

**Contract Deployment:**
- Hardhat-based build system with TypeScript scripts
- Deployment script exports contract address and ABI
- Custom script to extract ABI for frontend consumption

### Frontend Architecture (React + TypeScript)

**Framework Stack:**
- React 18 with TypeScript for type safety
- Vite for fast development and optimized builds
- Wouter for lightweight client-side routing

**Web3 Integration:**
- **Wallet Connection**: RainbowKit v2 for polished wallet connection UX
- **Chain Configuration**: Custom Zama Devnet setup (Chain ID: 8009, RPC: https://devnet.zama.ai)
- **Contract Interaction**: ethers.js v6 via wagmi hooks for contract calls
- **FHE Encryption**: `fhevmjs` library for client-side encryption before on-chain submission

**Component Architecture:**
- **Dual Interface Pattern**: Tab-based UI separating User (intent creation) and Solver (offer submission) workflows
- **CreateIntent Component**: Form for users to create encrypted swap intents
- **SubmitOffer Component**: Form for solvers to submit encrypted competitive offers
- **IntentList Component**: Dashboard showing active intents with offer counts and status
- **Header Component**: Global navigation with wallet connection and theme toggle

**State Management:**
- React Query (TanStack Query) for server state management and caching
- Wagmi hooks for blockchain state (account, contracts, transactions)
- Local component state for form inputs and UI interactions

**Design System:**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom theme configuration
- Light/dark mode support with persistent theme selection
- Privacy-focused design with encryption indicators (🔒 badges)
- Gradient backgrounds and polished DeFi aesthetics

### Backend Architecture (Express.js)

**Minimal Server Setup:**
- Express.js server primarily for serving the Vite-built frontend
- Development mode integrates Vite middleware for HMR
- Production mode serves static built files
- Placeholder route structure (no active API endpoints in current implementation)

**Storage Interface:**
- Drizzle ORM configuration for PostgreSQL
- In-memory storage implementation (`MemStorage`) as placeholder
- Schema defines basic user model (not actively used in current flow)
- Database-ready architecture but not utilized in MVP (blockchain is source of truth)

**Architectural Rationale:**
- Backend kept minimal since smart contract handles all business logic
- Storage layer designed for potential future features (user profiles, analytics, off-chain indexing)
- Server primarily exists to support frontend deployment and potential API expansion

### Build and Development Workflow

**Dual Build System:**
- Frontend: Vite-based build outputting to `dist/public`
- Backend: esbuild bundling server code to `dist`
- Smart Contracts: Hardhat compilation to `artifacts` and `cache` directories

**Development Flow:**
- `npm run dev`: Runs development server with Vite HMR
- `npm run build`: Builds both frontend and backend for production
- `npm run check`: TypeScript type checking across all layers

**Path Aliases:**
- `@/*`: Client source files
- `@shared/*`: Shared types/schemas between frontend and backend
- `@assets/*`: Static assets

## External Dependencies

### Blockchain & Encryption
- **Zama FHEVM** (fhevm@0.5.8): Core FHE library providing TFHE encrypted types and operations
- **fhevmjs**: Client-side library for creating encrypted inputs before blockchain submission
- **Hardhat**: Ethereum development environment for contract compilation, deployment, and testing
- **ethers.js v6**: Ethereum library for contract interaction
- **wagmi**: React hooks for Ethereum with TypeScript support

### Web3 Wallet Integration
- **RainbowKit**: Wallet connection UI with support for multiple providers
- **@tanstack/react-query**: Required by wagmi for state management

### UI Framework
- **shadcn/ui**: Pre-built accessible components built on Radix UI
- **Radix UI**: Headless UI primitives (30+ packages for dialogs, dropdowns, tabs, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styles
- **Lucide React**: Icon library

### Database (Configured but Not Active)
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **PostgreSQL**: Database system (configured via `DATABASE_URL` environment variable)

### Development Tools
- **TypeScript**: Type safety across frontend, backend, and contract scripts
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast backend bundling
- **tsx**: TypeScript execution for Node.js scripts
- **@replit/vite-plugin-***: Replit-specific development plugins

### Design Utilities
- **date-fns**: Date formatting and manipulation
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **clsx + tailwind-merge**: Conditional className utilities

### Key External Service
- **Zama Devnet**: Blockchain network providing FHE capabilities (RPC endpoint: https://devnet.zama.ai)