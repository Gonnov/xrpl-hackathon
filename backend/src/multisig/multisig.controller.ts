import { Controller, Post, Body } from '@nestjs/common';
import { MultisigService } from './multisig.service';

// Simple DTO for multisig payment request
class MultisigPaymentDto {}

@Controller('multisig')
export class MultisigController {
    constructor(private readonly multisigService: MultisigService) {}

    @Post('sign')
    async multiSigPayment(@Body() multisigPaymentDto: MultisigPaymentDto) {
        return this.multisigService.multiSigPayment();
    }
}