import { useEffect, useState } from 'react';
import db from '../utils/db';
import { Transaction } from '../interfaces/Transaction';

export default function Summary() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function getTransactions() {
      const transactions = await db.transactions.toArray();
      setTransactions(transactions);
    }

    getTransactions();
  }, []);

  return <pre>{JSON.stringify(transactions, null, 2)}</pre>;
}
