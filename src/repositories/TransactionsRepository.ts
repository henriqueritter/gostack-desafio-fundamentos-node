import Transaction from '../models/Transaction';

interface RequestTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome, total }: Balance = this.transactions.reduce(
      (accumulator: Balance, item: Transaction) => {
        if (item.type === 'income') {
          accumulator.income += item.value;
        } else if (item.type === 'outcome') {
          accumulator.outcome += item.value;
        }
        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return { income, outcome, total };
  }

  public create({ title, type, value }: RequestTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });
    const { total } = this.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error('Not Enough Balance');
    } else {
      this.transactions.push(transaction);
      return transaction;
    }
  }
}

export default TransactionsRepository;
