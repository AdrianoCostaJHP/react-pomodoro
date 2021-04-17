import '../styles/global.css';
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
})

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}


