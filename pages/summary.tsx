import { useEffect, useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Transaction } from '../interfaces/Transaction';
import db from '../utils/db';
import styles from './summary.module.css';

interface Summary {
  income: number;
  expenses: number;
  netIncome: number;
}

export default function Summary() {
  const [summary, setSummary] = useState<Summary>({} as Summary);

  function createSummary(transactions: Transaction[]): Summary {
    let income = 0;
    let expenses = 0;
    let netIncome = 0;

    for (const t of transactions) {
      if (t.isIncome) {
        income += t.amount;
      } else {
        expenses += t.amount;
      }
    }

    netIncome = income - expenses;
    return Object.assign({}, { income, expenses, netIncome }) as Summary;
  }

  useEffect(() => {
    async function fetchTransactions() {
      const transactions = await db.transactions.toArray();
      const summary = createSummary(transactions);
      setSummary(summary);
    }

    fetchTransactions();
  }, []);

  return (
    <Paper className={styles.paper}>
      <Typography variant='h5' display='block' gutterBottom>
        Hello, World!
      </Typography>

      <pre>{JSON.stringify(summary, null, 2)}</pre>
    </Paper>
  );
}
