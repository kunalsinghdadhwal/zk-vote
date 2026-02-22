# ZK Vote

Private, verifiable elections using zero-knowledge cryptography and Self Protocol identity verification.

## Overview

ZK Vote is a voting platform that combines zero-knowledge proofs with Aadhaar-based identity verification via the Self Protocol. Users must verify their Aadhaar identity before accessing the voting interface, ensuring one-person-one-vote while preserving voter privacy.

## Architecture

```
Landing Page (/) --> Verify Identity (/vote) --> Cast Vote --> Confirmation
                         |                          |
                    Self SDK QR Code           ZK Proof Generated
                    (Aadhaar verification)    (vote privacy)
                         |
                    Backend Verifier
                    (/api/verify)
```

### Flow

1. User visits the landing page and clicks "Launch App"
2. Redirected to `/vote` where they must complete identity verification
3. Self SDK displays a QR code -- user scans with the Self mobile app (Aadhaar verification)
4. Proof is sent to `/api/verify` backend endpoint for verification
5. On success, the voting interface is unlocked
6. User selects a proposal and casts their vote
7. Vote is confirmed with a ZK proof

### Key Directories

- `/src/app` -- Next.js App Router pages and API routes
- `/src/app/api/verify` -- Self SDK backend verifier endpoint
- `/src/app/vote` -- Voting page with verification gate
- `/src/components` -- React components (hero, features, verification, etc.)
- `/src/components/ui` -- Primitive UI components

## Tech Stack

- [Next.js 16](https://nextjs.org/) -- App Router, React Server Components
- [React 19](https://react.dev/) -- UI framework
- [TypeScript 5](https://www.typescriptlang.org/) -- Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) -- Styling
- [Self Protocol SDK](https://docs.self.xyz/) -- Identity verification via QR/ZK proofs
- [ethers.js](https://docs.ethers.org/) -- Ethereum utilities

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
git clone https://github.com/your-username/zk-vote.git
cd zk-vote
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SELF_ENDPOINT=https://your-ngrok-url.ngrok.io/api/verify
```

For local development, the Self SDK requires a publicly accessible endpoint. Use [ngrok](https://ngrok.com/) to tunnel your local server:

```bash
ngrok http 3000
```

Then set `NEXT_PUBLIC_SELF_ENDPOINT` to the ngrok HTTPS URL followed by `/api/verify`.

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
pnpm build
pnpm start
```

## Self SDK Integration

The app uses the Self Protocol for privacy-preserving identity verification:

- **Frontend**: `@selfxyz/qrcode` renders a QR code that users scan with the Self mobile app
- **Backend**: `@selfxyz/core` provides `SelfBackendVerifier` to validate proofs server-side
- **Accepted Documents**: Aadhaar only (configured via `ATTESTATION_ID.AADHAAR`)
- **Verification Config**: Minimum age 18, using staging mode for development

The frontend and backend configurations (scope, disclosures) must match exactly for verification to succeed.
