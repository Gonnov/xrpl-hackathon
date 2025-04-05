import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EscrowModule } from './escrow/escrow.module';

@Module({
  imports: [EscrowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
