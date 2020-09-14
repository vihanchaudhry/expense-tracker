import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './layout.module.css';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightGreen,
  },
});

type Props = {
  children?: any;
  title?: string;
};

function Layout({ children, title = 'Expense Tracker' }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(0);

  return (
    <div className={styles.root}>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='An expense tracker progressive web app.'
        ></meta>
        <meta name='keywords' content='expense, pwa, nextjs, typescript' />
        <meta property='og:title' content='Expense Tracker'></meta>
        <meta
          property='og:description'
          content='An expense tracker progressive web app.'
        ></meta>
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <meta name='theme-color' content='#8bc34a' />
        <link rel='apple-touch-icon' href='/icons/icon-72x72.png'></link>
      </Head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <AppBar position='fixed' className={styles.appbar}>
          <Toolbar>
            <IconButton
              edge='start'
              className={styles.menubutton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={styles.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <main>
          <Container maxWidth='md' className={styles.container}>
            {children}
          </Container>
        </main>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            router.push(newValue);
          }}
          showLabels
          className={styles.bottomnav}
        >
          <BottomNavigationAction
            aria-label='expenses'
            label='Expenses'
            icon={<AttachMoneyIcon />}
            value='/expenses'
          />
          <BottomNavigationAction
            aria-label='add'
            label='Add'
            icon={<AddIcon />}
            value='/add'
          />
          <BottomNavigationAction
            aria-label='profile'
            label='Profile'
            icon={<PersonIcon />}
            value='/profile'
          />
        </BottomNavigation>
      </ThemeProvider>
    </div>
  );
}

export default Layout;
