import { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { Transaction } from '../interfaces/Transaction';
import db from '../utils/db';
import styles from './summary.module.css';

interface Summary {
  income: number;
  expenses: number;
  netIncome: number;
  recent: Transaction[];
}

export default function Summary() {
  const [summary, setSummary] = useState<Summary>({} as Summary);

  useEffect(() => {
    async function fetchTransactions() {
      const transactions = await db.transactions.toArray();
      const summary = createSummary(transactions);
      setSummary(summary);
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <Paper component='section' className={styles.paper}>
        <Typography
          variant='h5'
          component='h2'
          display='block'
          className={styles.netincome}
        >
          <strong>Net Income</strong>
          <br />
          {summary.netIncome >= 0 && (
            <strong className={styles.textsuccess}>
              ₹{summary.netIncome?.toFixed(2)}
            </strong>
          )}
          {summary.netIncome < 0 && (
            <strong className={styles.texterror}>
              -₹{Math.abs(summary.netIncome)?.toFixed(2)}
            </strong>
          )}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6} className={styles.griditem}>
            <Typography variant='body1' component='h3' display='inline'>
              Income
              <br />
              <span className={styles.textsuccess}>
                ₹{summary.income?.toFixed(2)}
              </span>
            </Typography>
          </Grid>

          <Grid item xs={6} className={styles.griditem}>
            <Typography variant='body1' component='h3' display='inline'>
              Expenses
              <br />
              <span className={styles.texterror}>
                ₹{summary.expenses?.toFixed(2)}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <section className={styles.recentactivity}>
        <Typography
          variant='h6'
          component='h2'
          display='block'
          className={styles.recentheader}
          gutterBottom
        >
          Recent Activity
        </Typography>

        <Divider />

        <TableContainer className={styles.tablecontainer}>
          <Table size='small' aria-label='recent activity'>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align='right'>Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {summary.recent?.map(r => (
                <TableRow key={r.id}>
                  <TableCell component='th' scope='row' className={styles.descriptionellipsis}>
                    {r.description}
                  </TableCell>
                  <TableCell align='right'>
                    {r.isIncome ? (
                      <span className={styles.textsuccess}>₹{r.amount?.toFixed(2)}</span>
                    ) : (
                      <span className={styles.texterror}>-₹{r.amount?.toFixed(2)}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}

function createSummary(transactions: Transaction[]): Summary {
  let income = 0;
  let expenses = 0;
  let netIncome = 0;
  let recent = [...transactions].slice(Math.max(transactions.length - 5, 0));

  for (const t of transactions) {
    if (t.isIncome) {
      income += t.amount;
    } else {
      expenses += t.amount;
    }
  }

  netIncome = income - expenses;
  return Object.assign({}, { income, expenses, netIncome, recent }) as Summary;
}

// function createRecentActivity()
