import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionData {
  title: string;
  value: number; 
  type: "income" | "outcome";
};

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionParam:TransactionData): Transaction {

    if (transactionParam.type === "outcome") {
      const total = this.transactionsRepository.getBalance().total;
      if (total < transactionParam.value) {
        throw new Error('Invalid transaction. Runs off balance amount.');
      }
    }

    return this.transactionsRepository.create(transactionParam);
  }
}

export default CreateTransactionService;
