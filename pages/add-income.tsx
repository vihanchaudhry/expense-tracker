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
  CircularProgress,
} from '@material-ui/core';
import { Transaction } from '../interfaces/Transaction';
import db from '../utils/db';
import styles from './add.module.css';

export default function AddIncome() {
  const [loading, setLoading] = useState<boolean>(false);
  // const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm<Transaction>();
  const onSubmit = async (income: Transaction) => {
    // TODO: remove when dates and recurring payments are implemented
    income.isRecurring = false;
    
    income.isIncome = true;
    income.amount = +income.amount;

    setLoading(true);

    const added = await db.transactions.add(income);
    if (added) {
      setLoading(false);
      router.push('/');
    }
  };

  return (
    <Paper component='section' className='paper'>
      {loading && <CircularProgress className='circularprogress' />}

      {!loading && (
        <>
          <h2 className={styles.addheader}>Add income</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type='number'
              name='amount'
              id='amount'
              label='Amount'
              placeholder='150'
              className={styles.textfield}
              inputRef={register({ required: true })}
              InputProps={{
                autoComplete: 'off',
                startAdornment: (
                  <InputAdornment position='start'>₹</InputAdornment>
                ),
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
              placeholder='e.g. Aadya paid me for lunch.'
              className={styles.textfield}
              inputRef={register}
              inputProps={{ autoComplete: 'off' }}
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
              fullWidth
            />

            {/* <FormControlLabel
              label='This is a recurring income'
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
            /> */}

            <Button
              type='submit'
              variant='contained'
              className={styles.submitbutton}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </Paper>
  );
}
