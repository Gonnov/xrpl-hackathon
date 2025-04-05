import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EscrowModule } from './escrow/escrow.module';
import { EscrowService } from './escrow/escrow.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config available everywhere
      envFilePath: '.env',
    }),
    EscrowModule,
  ],
  controllers: [AppController],
  providers: [AppService, EscrowService],
})
export class AppModule {}
