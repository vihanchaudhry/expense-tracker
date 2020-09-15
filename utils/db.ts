import Dexie from 'dexie';
import { Transaction } from '../interfaces/Transaction';

class ExpensesDatabase extends Dexie {
  transactions: Dexie.Table<Transaction, number>;

  constructor() {
    super('expenses_db');
    this.version(1).stores({ transactions: '++id,isRecurring,isIncome' });
    this.transactions = this.table('transactions');
  }
}

const db = new ExpensesDatabase();

export default db;
