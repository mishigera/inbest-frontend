import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
       <Toaster
    toastOptions={{
      success: {
        style: {
         background: '#4ade80',
          color: 'black',
        }
     },
      error: {
       style: {
          background: '#f87171',
         color: 'white',
       }
     }
  }}
  position="top-right"
/>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
