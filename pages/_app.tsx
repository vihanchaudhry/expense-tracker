import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title='Next.js + TypeScript + Tailwind CSS — My personal boilerplate for bootstrapping Next.js with TypeScript and Tailwind CSS.'>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
