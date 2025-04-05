import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Wallet } from 'xrpl';

@Injectable()
export class EscrowService {
  private readonly logger = new Logger(EscrowService.name);

  constructor(private configService: ConfigService) {}

  async fundEscrow(fundEscrowDto: { amount: string; currency: string }) {
    try {
      this.logger.log(`Initiating rUSD payment of ${fundEscrowDto.amount}`);

      // 1. Connect to XRPL
      const client = new Client(
        this.configService.get<string>('XRPL_CLIENT') ||
          'wss://proud-clean-sheet.xrp-testnet.quiknode.pro/a0bf4850e8dcbb3d76449fa1cb7db7f316b23a38/',
      );
      await client.connect();

      // 2. Create wallet from secret
      const issuerSecret = this.configService.get<string>('XRPL_ISSUER_SECRET');
      const vaultSecret = this.configService.get<string>('XRPL_VAULT_SECRET');

      if (!issuerSecret || !vaultSecret) {
        throw new Error('Missing XRPL secrets in environment variables');
      }

      const wallet = Wallet.fromSeed(issuerSecret);
      const wallet2 = Wallet.fromSeed(vaultSecret);

      this.logger.log('Wallets created successfully');
      this.logger.log(`Issuer Address: ${wallet.address}`);
      this.logger.log(`Vault Address: ${wallet2.address}`);

      // Uncomment to set up trust line
      const trustSetup = {
        TransactionType: 'TrustSet',
        Account: wallet2.address,
        LimitAmount: {
          currency: this.configService.get<string>('XRPL_RLUSD_CURRENCY'),
          value: '10000000',
          issuer: this.configService.get<string>('XRPL_RLUSD_ISSUER'),
        },
      };

      this.logger.log('Setting up trust line...');
      // @ts-ignore
      const trustline = await client.autofill(trustSetup);
      const trustResult = await client.submitAndWait(
        wallet2.sign(trustline).tx_blob,
      );

      // Prepare payment
      // @ts-ignore
      const prepared = await client.autofill({
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: {
          // @ts-ignore
          currency: this.configService.get<string>('XRPL_RLUSD_CURRENCY'),
          value: '0.001',
          //value: fundEscrowDto.amount,
          // @ts-ignore
          issuer: this.configService.get<string>('XRPL_RLUSD_ISSUER'),
        },
        // @ts-ignore
        Destination: this.configService.get<string>('XRPL_VAULT_ADDRESS'),
      });

      // Sign and submit
      const signed = wallet.sign(prepared);
      this.logger.log(`Transaction hash: ${signed.hash}`);

      const result = await client.submitAndWait(signed.tx_blob);

      console.log('result', result);

      await client.disconnect();

      return {
        success: true,
        result
      };
    } catch (error) {
      console.log('Payment failed:', error);
      throw new Error(
        `Failed to process rUSD payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
