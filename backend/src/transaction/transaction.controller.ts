import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

class TransactionDto {
  transaction_id: string;
  business_partner: string;
  product_name: string;
  quantity: string;
  price: string;
}

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}
    
    @Post('create')
    async createTransaction(@Body() transactionDto: TransactionDto) {
        return this.transactionService.createTransactionInDb(
        transactionDto.transaction_id,
        transactionDto.business_partner,
        transactionDto.product_name,
        transactionDto.quantity,
        transactionDto.price,
        );
    }
}
