import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

class TransactionDto {
  transaction_id: string;
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
      transactionDto.product_name,
      transactionDto.quantity,
      transactionDto.price,
    );
  }

  @Get('get_transactions')
  async getAllTransactions() {
    return this.transactionService.getAllTransactions();
  }
}
