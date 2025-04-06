# XRPL Escrow Transaction System

A secure and decentralized escrow system built on the XRP Ledger (XRPL) for handling document-based transactions with RLUSD stablecoin payments.

## Overview

This system facilitates secure transactions between buyers and sellers using XRPL's native features and RLUSD stablecoin. The workflow is as follows:

1. Buyer initiates a transaction and sends RLUSD to a secure vault
2. Seller uploads required transaction documents
3. Multi-signature verification releases funds upon document validation

## Tech Stack

-   **Backend**: NestJS with XRPL integration
-   **Frontend**: Next.js with App Router
-   **UI Components**: ShadCN
-   **Database**: Supabase
-   **Smart Contract Platform**: XRPL

## Key Features

-   Secure RLUSD stablecoin transactions
-   Document management system with validation
-   Multi-signature release mechanism
-   Real-time transaction status tracking
-   Automated escrow vault management

## Required Documents

-   Commercial Invoice (Required)
-   Bill of Lading (Required)
-   Packing List (Required)
-   Certificate of Origin (Optional)

## Setup

1. Clone the repository
2. Set up environment variables:

```env
XRPL_CLIENT=<XRPL node websocket URL>
XRPL_ISSUER_SECRET=<Issuer wallet secret>
XRPL_ISSUER_ADDRESS=<Issuer wallet address>
XRPL_VAULT_SECRET=<Vault wallet secret>
XRPL_VAULT_ADDRESS=<Vault wallet address>
XRPL_RLUSD_ISSUER=<RLUSD issuer address>
XRPL_RLUSD_CURRENCY=<RLUSD currency code>
SUPABASE_URL=<Supabase project URL>
SUPABASE_ANON_KEY=<Supabase anon key>
```

3. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

4. Start the development servers:

```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

## Transaction Flow

1. **Initiation**

    - Buyer creates transaction with product and payment details
    - System generates unique transaction ID

2. **Escrow Funding**

    - Buyer sends RLUSD to the vault
    - Funds are locked in escrow

3. **Document Upload**

    - Seller uploads required transaction documents
    - System validates document completeness

4. **Verification**

    - Documents are verified by relevant parties
    - Multi-signature approval is required

5. **Fund Release**
    - Upon successful verification, funds are released to seller
    - Transaction is marked as complete

## Security Features

-   Secure vault implementation on XRPL
-   Multi-signature requirement for fund release
-   Document verification system
-   Row Level Security in Supabase
-   Environment variable protection

## Development

-   Follow ESLint & Prettier configuration
-   Write meaningful commit messages
-   Use feature branches and pull requests
-   Ensure proper test coverage

## Production Deployment

1. Set up production environment variables
2. Build the applications:

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

3. Deploy using your preferred hosting service

## License

[Add your license information here]
