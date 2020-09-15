import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  InputAdornment,
} from '@material-ui/core';
import { Transaction } from '../interfaces/Transaction';
import db from '../utils/db';
import styles from './add.module.css';

export default function AddExpense() {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm<Transaction>();
  const onSubmit = async (expense: Transaction) => {
    expense.isIncome = false;

    const added = await db.transactions.add(expense);
    if (added) {
      router.push('/summary');
    }
  };

  return (
    <Paper className={styles.paper}>
      <h1>Add expense</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type='number'
          name='amount'
          id='amount'
          label='Amount'
          placeholder='200'
          className={styles.textfield}
          inputRef={register({ required: true })}
          InputProps={{
            autoComplete: 'off',
            startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          autoFocus
          required
        />

        <TextField
          type='text'
          name='description'
          id='description'
          label='Description'
          multiline
          rows={2}
          rowsMax={4}
          placeholder='e.g. Bought lunch with my debit card.'
          className={styles.textfield}
          inputRef={register}
          inputProps={{ autoComplete: 'off' }}
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          fullWidth
        />

        <FormControlLabel
          label='This is a recurring expense'
          control={
            <Checkbox
              name='isRecurring'
              id='isRecurring'
              inputRef={register}
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              color='primary'
            />
          }
        />

        <Button
          type='submit'
          variant='contained'
          className={styles.submitbutton}
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}
