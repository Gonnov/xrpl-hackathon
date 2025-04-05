import { Injectable, Logger } from '@nestjs/common';
import { Client, Wallet } from 'xrpl';

@Injectable()
export class EscrowService {
  private readonly logger = new Logger(EscrowService.name);

  async fundEscrow(fundEscrowDto: { amount: string; currency: string }) {
    try {
      this.logger.log(`Initiating rUSD payment of ${fundEscrowDto.amount}`);

      // 1. Connect to XRPL
      const client = new Client(
        'wss://proud-clean-sheet.xrp-testnet.quiknode.pro/a0bf4850e8dcbb3d76449fa1cb7db7f316b23a38/',
      );
      await client.connect();

      // 2. Create wallet from secret
      //@ts-ignore
      const wallet = Wallet.fromSeed(process.env.XRPL_ISSUER_SECRET);
      //@ts-ignore
      const wallet2 = Wallet.fromSeed(process.env.XRPL_VAULT_SECRET);
      console.log('wallet DLSKJLKDJQSDKLMJQS', wallet);
      //   // 3. Prepare transaction for rUSD

      const a: any = {
        TransactionType: 'TrustSet',
        Account: wallet2.address,
        LimitAmount: {
          currency: process.env.XRPL_RLUSD_CURRENCY,
          value: '10000000',
          issuer: process.env.XRPL_RLUSD_ISSUER,
        },
      };
      const trustline = await client.autofill(a);
      await client.submitAndWait(wallet2.sign(trustline).tx_blob);

      const prepared = await client.autofill({
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: {
          //@ts-ignore
          currency: process.env.XRPL_RLUSD_CURRENCY,
          value: '0.01',
          //@ts-ignore
          issuer: process.env.XRPL_RLUSD_ISSUER,
        },
        //@ts-ignore
        Destination: process.env.XRPL_VAULT_ADDRESS,
      });

      //   // 4. Sign the transaction
      const signed = wallet.sign(prepared);
      this.logger.log(`Transaction hash: ${signed.hash}`);

      //   // 5. Submit and wait for validation
      const result = await client.submitAndWait(signed.tx_blob);

      console.log('result', result);
      // 6. Disconnect client
      await client.disconnect();
    } catch (error) {
      this.logger.error('Payment failed:', error);
      throw new Error(
        `Failed to process rUSD payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
