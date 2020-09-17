import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { amber, lime } from '@material-ui/core/colors';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import styles from './layout.module.css';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
    secondary: lime,
  },
});

type Props = {
  children: ReactElement;
  title?: string;
};

function Layout({ children, title = 'Expense Tracker' }: Props) {
  const router = useRouter();
  const [bottomNavState, setBottomNavState] = useState<string>(router.pathname);

  // On route change effect -- set bottom nav state on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => setBottomNavState(url);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  });

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
        <meta name='theme-color' content='#8bc34a' />

        <link rel='manifest' href='/manifest.json' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <link rel='apple-touch-icon' href='/icons/icon-72x72.png'></link>
      </Head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <AppBar position='fixed' className={styles.appbar}>
          <Toolbar>
            {/* <IconButton
              edge='start'
              className={styles.menubutton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton> */}

            <Typography variant='h6' component='h1' className={styles.title}>
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
          value={bottomNavState}
          onChange={(event, newValue) => router.push(newValue)}
          showLabels
          className={styles.bottomnav}
        >
          <BottomNavigationAction
            aria-label='summary'
            label='Summary'
            icon={<AttachMoneyIcon />}
            value='/'
          />

          <BottomNavigationAction
            aria-label='Add expenses'
            label='Add expense'
            icon={<TrendingDownIcon />}
            value='/add-expense'
          />

          <BottomNavigationAction
            aria-label='Add income'
            label='Add income'
            icon={<TrendingUpIcon />}
            value='/add-income'
          />
        </BottomNavigation>
      </ThemeProvider>
    </div>
  );
}

export default Layout;
