import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionData {
  title: string;
  value: number; 
  type: "income" | "outcome";
};


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.all().filter(t => t.type === "income")
      .map(t => t.value)
      .reduce((acc, cur) => acc + cur, 0);

    const outcome = this.all().filter(t => t.type === "outcome")
      .map(t => t.value)
      .reduce((acc, cur) => acc + cur, 0);

    const total = this.all().map(t => t.type === 'income'? t.value: t.value * -1).reduce((acc, cur) => acc + cur, 0);

    return {
      income,
      outcome,
      total
    };
  }

  public create(transactionData: TransactionData): Transaction {

    const transaction = new Transaction(transactionData);
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
