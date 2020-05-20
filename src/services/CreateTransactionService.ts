import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestTransaction): Transaction {
    // Check inputs type
    if (typeof title !== 'string') {
      throw Error('Title must be a String');
    }
    if (typeof value !== 'number') {
      throw Error('Value must be a number');
    }
    if (type !== 'income' && type !== 'outcome') {
      throw Error(`Type doenst match 'income' or 'outcome'`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
