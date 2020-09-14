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
