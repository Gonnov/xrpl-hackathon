import { Controller, Post, Body } from '@nestjs/common';
import { EscrowService } from './escrow.service';

// Simple DTO for fund request
class FundEscrowDto {
  amount: string;
  currency: string;
}

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post('fund')
  async fundEscrow(@Body() fundEscrowDto: FundEscrowDto) {
    return this.escrowService.fundEscrow(fundEscrowDto);
  }
}
