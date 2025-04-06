import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Wallet, multisign } from 'xrpl';

@Injectable()
export class MultisigService {
  private readonly logger = new Logger(MultisigService.name);

  constructor(private configService: ConfigService) {}

  async multiSigPayment() {
    try {
      this.logger.log('Initiating multisig payment...');

      // 1. Connect to XRPL
      const client = new Client(
        this.configService.get<string>('XRPL_CLIENT') ||
          'wss://proud-clean-sheet.xrp-testnet.quiknode.pro/a0bf4850e8dcbb3d76449fa1cb7db7f316b23a38/',
      );
      await client.connect();

      // 2. Create wallets from secrets
      const mainWallet_secret =
        this.configService.get<string>('XRPL_VAULT_SECRET');
      const XRPL_SIGNER_SECRET =
        this.configService.get<string>('XRPL_SIGNER_SECRET');
      const XRPL_ISSUER_SECRET =
        this.configService.get<string>('XRPL_ISSUER_SECRET');
      const RECEIVER_ADDRESS = this.configService.get<string>(
        'XRPL_SIGNER_ADDRESS',
      );
      if (
        !mainWallet_secret ||
        !XRPL_SIGNER_SECRET ||
        !XRPL_ISSUER_SECRET ||
        !RECEIVER_ADDRESS
      ) {
        throw new Error('Missing XRPL secrets in environment variables');
      }

      const mainWallet = Wallet.fromSeed(mainWallet_secret);
      const signer_wallet = Wallet.fromSeed(XRPL_SIGNER_SECRET);
      const issuer_wallet = Wallet.fromSeed(XRPL_ISSUER_SECRET);

      //Set up trust line
      const trustSetup = {
        TransactionType: 'TrustSet',
        Account: signer_wallet.address,
        LimitAmount: {
          currency: this.configService.get<string>('XRPL_RLUSD_CURRENCY'),
          value: '10000000',
          issuer: this.configService.get<string>('XRPL_RLUSD_ISSUER'),
        },
      };
      this.logger.log('Setting up trust line...');
      // @ts-expect-error
      const trustline = await client.autofill(trustSetup);
      await client.submitAndWait(signer_wallet.sign(trustline).tx_blob);

      // Create a multisig transaction
      const prepared = await client.autofill({
        TransactionType: 'SignerListSet',
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
      });
      const signed = mainWallet.sign(prepared);
      const tx = await client.submitAndWait(signed.tx_blob);
      this.logger.log('SignerListSet transaction result:', tx);

      // Create a payment transaction
      const preparedPayment = await client.autofill(
        {
          TransactionType: 'Payment',
          Account: mainWallet.classicAddress,
          Destination: RECEIVER_ADDRESS,
          Amount: {
            // @ts-expect-error
            currency: this.configService.get<string>('XRPL_RLUSD_CURRENCY'),
            value: '0.001',
            // @ts-expect-error
            issuer: this.configService.get<string>('XRPL_RLUSD_ISSUER'),
          },
        },
        3,
      );
      const signed2 = signer_wallet.sign(preparedPayment, true);
      const signed3 = issuer_wallet.sign(preparedPayment, true);
      const combinedTransaction = multisign([signed2.tx_blob, signed3.tx_blob]);
      const result = await client.submitAndWait(combinedTransaction);
      this.logger.log('Payment transaction result:', result);

      // After multisig payment, execute the swap
      this.logger.log('Executing XRP/RLUSD swap...');

      const swapTx = {
        TransactionType: 'OfferCreate',
        Account: signer_wallet.address,
        TakerGets: '5000000', // Amount in XRP drops (5 XRP)
        TakerPays: {
          currency: this.configService.get<string>('XRPL_RLUSD_CURRENCY'),
          issuer: this.configService.get<string>('XRPL_RLUSD_ISSUER'),
          value: '1', // 1 RLUSD
        },
        Flags: 0x00080000, // tfImmediateOrCancel flag
      };

      // @ts-expect-error
      const preparedSwap = await client.autofill(swapTx);
      const signedSwap = signer_wallet.sign(preparedSwap);
      const swapResult = await client.submitAndWait(signedSwap.tx_blob);
      this.logger.log('Swap transaction result:', swapResult);
    } catch (error) {
      this.logger.error('Error during multisig payment:', error);
      throw error;
    }
    this.logger.log('Multisig payment and swap completed successfully!');
  }
}
