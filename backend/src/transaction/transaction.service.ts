import { Injectable, Logger } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  async createTransactionInDb(
    transaction_id: string,
    product_name: string,
    quantity: string,
    price: string,
  ) {
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
      );
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          transaction_id,
          product_name,
          quantity,
          price,
        });
      this.logger.log(`Fetching transaction with ID: ${transaction_id}`);
      return data;
    } catch (error) {
      this.logger.error(`Error fetching transaction: ${error.message}`);
      throw error;
    }
  }

  async getAllTransactions() {
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
      );
      const { data, error } = await supabase.from('transactions').select('*');
      if (error) {
        this.logger.error(`Error fetching transactions: ${error.message}`);
        throw error;
      }
      return data;
    } catch (error) {
      this.logger.error(`Error fetching transactions: ${error.message}`);
      throw error;
    }
  }
}
