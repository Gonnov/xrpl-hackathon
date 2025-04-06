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
            const mainWallet_secret = this.configService.get<string>('XRPL_VAULT_SECRET',);
            const XRPL_SIGNER_SECRET = this.configService.get<string>('XRPL_SIGNER_SECRET',);
            const XRPL_ISSUER_SECRET = this.configService.get<string>('XRPL_ISSUER_SECRET',);
            const RECEIVER_ADDRESS = this.configService.get<string>('XRPL_SIGNER_ADDRESS',);
            if (!mainWallet_secret || !XRPL_SIGNER_SECRET || !XRPL_ISSUER_SECRET || !RECEIVER_ADDRESS) {
                throw new Error('Missing XRPL secrets in environment variables');
            }

            const mainWallet = Wallet.fromSeed(mainWallet_secret);
            const signer_wallet = Wallet.fromSeed(XRPL_SIGNER_SECRET);
            const issuer_wallet = Wallet.fromSeed(XRPL_ISSUER_SECRET);
        
            // // Uncomment to set up trust line
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
            // @ts-ignore
            const trustline = await client.autofill(trustSetup);
            const trustResult = await client.submitAndWait(
                signer_wallet.sign(trustline).tx_blob,
            );
        
            const prepared = await client.autofill({
                TransactionType: "SignerListSet",
                Account: mainWallet.classicAddress,
                SignerQuorum: 2,
                SignerEntries:  [
                    {
                        SignerEntry: {
                            Account: signer_wallet.classicAddress,
                            SignerWeight: 1
                        }
                    },
                    {
                        SignerEntry: {
                            Account: issuer_wallet.classicAddress,
                            SignerWeight: 1
                        }
                    },
                ]
              });
            const signed = mainWallet.sign(prepared);
            const tx = await client.submitAndWait(signed.tx_blob);
            console.log('Transaction Submit Result', tx);
            const preparedPayment = await client.autofill({
                TransactionType: "Payment",
                Account: mainWallet.classicAddress,
                Destination: RECEIVER_ADDRESS!,
                Amount: {
                    // @ts-ignore
                    currency: this.configService.get<string>('XRPL_RLUSD_CURRENCY'),
                    value: '0.001',
                    //value: fundEscrowDto.amount,
                    // @ts-ignore
                    issuer: this.configService.get<string>('XRPL_RLUSD_ISSUER'),
                  },
            }, 3);
            const signed2 = signer_wallet.sign(preparedPayment, true);
            const signed3 = issuer_wallet.sign(preparedPayment, true);
            const combinedTransaction = multisign([signed2.tx_blob, signed3.tx_blob]);
            const result = await client.submitAndWait(combinedTransaction);
            console.log('Transaction Submit Result', result);
        }
        catch (error) {
            this.logger.error('Error during multisig payment:', error);
            throw error;
        }
        this.logger.log('Multisig payment completed successfully!');
    }
}