import { Module } from '@nestjs/common';
import { MultisigController } from './multisig.controller';
import { MultisigService } from './multisig.service';

@Module({
  controllers: [MultisigController],
  providers: [MultisigService],
})
export class MultisigModule {}