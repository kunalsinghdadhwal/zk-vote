# ZK Vote

Private, verifiable elections using zero-knowledge cryptography. Your vote counts, but no one knows how you voted.

## Overview

ZK Vote is a decentralized voting platform that leverages zero-knowledge proofs to solve the fundamental tension between privacy and transparency in elections. Votes are cryptographically hidden while remaining publicly verifiable, ensuring both individual privacy and election integrity.

## Features

- **Zero-Knowledge Privacy** - Votes are cryptographically hidden while still being verifiable by anyone
- **Full Transparency** - All vote tallies are publicly auditable without revealing individual choices
- **Mathematically Verified** - Every vote is proven valid through cryptographic proofs, eliminating fraud
- **Instant Results** - Results are available immediately after voting ends with full verification
- **Tamper-Proof** - Once cast, votes cannot be altered, deleted, or manipulated
- **Decentralized** - No single entity controls the system; trust is distributed across the network

## How It Works

1. **Connect Wallet** - Link your Web3 wallet to verify identity without revealing personal information
2. **Cast Your Vote** - Select your choice; your vote is encrypted locally before submission
3. **Generate ZK Proof** - A zero-knowledge proof verifies your vote is valid without revealing your choice
4. **Verify & Confirm** - Your vote is recorded on-chain; anyone can verify the tally without seeing individual votes

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript 5](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
- [Three.js](https://threejs.org/) - 3D graphics for visual effects

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/zk-vote.git
cd zk-vote

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

