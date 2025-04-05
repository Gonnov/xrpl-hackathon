import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EscrowModule } from './escrow/escrow.module';
import { EscrowService } from './escrow/escrow.service';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config available everywhere
      envFilePath: '.env',
    }),
    EscrowModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, EscrowService, TransactionService],
})
export class AppModule {}
