import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  InputAdornment,
} from '@material-ui/core';
import styles from './add.module.css';

type Inputs = {
  description?: string;
  amount: number;
  isRecurring?: boolean;
};

export default function Add() {
  const [checked, setChecked] = useState(false);

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <Paper className={styles.paper}>
      <h1>Add an expense</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type='number'
          name='amount'
          id='amount'
          label='Amount'
          className={styles.textfield}
          inputRef={register({ required: true })}
          InputProps={{
            autoComplete: 'off',
            startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
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
          className={styles.textfield}
          inputRef={register}
          inputProps={{ autoComplete: 'off' }}
          variant='outlined'
          fullWidth
        />

        <FormControlLabel
          label='Is this a recurring expense?'
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
          variant='outlined'
          className={styles.submitbutton}
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}
