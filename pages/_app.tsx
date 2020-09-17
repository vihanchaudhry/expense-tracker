import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Layout title='Expense Tracker'>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
