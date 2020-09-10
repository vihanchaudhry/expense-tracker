import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title='Order Corn — An online food ordering app with Strapi, Next.js, Stripe, Tailwind CSS, GraphQL, and React Context.'>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
