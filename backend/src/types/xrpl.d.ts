declare module 'xrpl' {
  export class Client {
    constructor(url: string);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
    autofill(transaction: Payment): Promise<Payment>;
    submitAndWait(tx_blob: string): Promise<SubmitResult>;
  }

  export class Wallet {
    static fromSeed(seed: string): Wallet;
    address: string;
    sign(transaction: Payment): SignedTransaction;
  }

  export function xrpToDrops(xrp: string): string;

  export interface IssuedCurrencyAmount {
    currency: string;
    value: string;
    issuer: string;
  }

  export interface Payment {
    TransactionType: string;
    Account: string;
    Amount: string | IssuedCurrencyAmount;
    Destination: string;
    Flags?: number;
    SendMax?: IssuedCurrencyAmount;
    Paths?: Array<
      Array<{
        currency: string;
        issuer?: string;
        type: number;
      }>
    >;
  }

  export interface SignedTransaction {
    tx_blob: string;
    hash: string;
  }

  export interface SubmitResult {
    result: {
      hash: string;
      ledger_index: number;
      meta: {
        TransactionResult: string;
      };
    };
  }
}
