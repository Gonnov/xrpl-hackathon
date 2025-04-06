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
-   **Stablecoin**: RLUSD (XRP Ledger USD)

## Key Features

-   Secure RLUSD stablecoin transactions
-   Document management system with validation
-   Multi-signature release mechanism (2-of-3 signers)
-   Real-time transaction status tracking
-   Automated escrow vault management
-   Trust line management for RLUSD
-   Atomic swaps between RLUSD and XRP

## Required Documents

-   Commercial Invoice (Required)
-   Bill of Lading (Required)
-   Packing List (Required)
-   Certificate of Origin (Optional)

## Technical Workflow

1. **Trust Line Setup**

    ```typescript
    // Set up trust line for RLUSD
    const trustSetup = {
        TransactionType: "TrustSet",
        Account: signer_wallet.address,
        LimitAmount: {
            currency: "RLUSD",
            value: "10000000",
            issuer: RLUSD_ISSUER,
        },
    };
    ```

2. **Multi-Signature Configuration**

    ```typescript
    // Configure 2-of-3 multi-signature
    const signerListSet = {
        TransactionType: "SignerListSet",
        Account: mainWallet.classicAddress,
        SignerQuorum: 2,
        SignerEntries: [
            {
                SignerEntry: {
                    Account: signer_wallet.classicAddress,
                    SignerWeight: 1,
                },
            },
            {
                SignerEntry: {
                    Account: issuer_wallet.classicAddress,
                    SignerWeight: 1,
                },
            },
        ],
    };
    ```

3. **Payment Process**

    ```typescript
    // Multi-signature payment transaction
    const payment = {
        TransactionType: "Payment",
        Account: mainWallet.classicAddress,
        Destination: RECEIVER_ADDRESS,
        Amount: {
            currency: "RLUSD",
            value: "0.001",
            issuer: RLUSD_ISSUER,
        },
    };
    ```

4. **RLUSD to XRP Swap**
    ```typescript
    // Create immediate swap offer
    const swapTx = {
        TransactionType: "OfferCreate",
        Account: signer_wallet.address,
        TakerGets: "5000000", // 5 XRP
        TakerPays: {
            currency: "RLUSD",
            value: "1",
            issuer: RLUSD_ISSUER,
        },
        Flags: 0x00080000, // tfImmediateOrCancel
    };
    ```

## Transaction Flow Details

1. **Trust Line Initialization**

    - System establishes trust line for RLUSD
    - Sets maximum limit for token transfers
    - Enables wallet to hold RLUSD tokens

2. **Multi-Signature Setup**

    - Configures 2-of-3 multi-signature requirement
    - Assigns signing weights to authorized parties
    - Establishes quorum threshold

3. **Payment Processing**

    - Buyer initiates RLUSD payment
    - Funds are held in multi-signature escrow
    - Multiple signatures required for release

4. **Document Validation**

    - Seller uploads required documents
    - System validates document completeness
    - Documents are verified by authorized parties

5. **Fund Release**

    - Multi-signature approval triggers release
    - Funds transferred to seller's wallet
    - Optional RLUSD to XRP conversion

6. **Currency Conversion**
    - Immediate or cancel swap mechanism
    - Direct order book interaction
    - Atomic transaction execution

## Security Features

-   Multi-signature (2-of-3) requirement
-   Trust line limits for RLUSD
-   Immediate-or-cancel swap protection
-   Document verification system
-   Row Level Security in Supabase
-   Environment variable protection

## Setup

1. Clone the repository
2. Set up environment variables:

```env
XRPL_CLIENT=<XRPL node websocket URL>
XRPL_ISSUER_SECRET=<Issuer wallet secret>
XRPL_ISSUER_ADDRESS=<Issuer wallet address>
XRPL_VAULT_SECRET=<Vault wallet secret>
XRPL_VAULT_ADDRESS=<Vault wallet address>
XRPL_SIGNER_SECRET=<Signer wallet secret>
XRPL_SIGNER_ADDRESS=<Signer wallet address>
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
