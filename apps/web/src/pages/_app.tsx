import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppContext, AppProps } from 'next/app';
import { default as NextApp } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { WagmiConfig } from '../providers/wagmi';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();
  useEffect(() => {
    const handler = (page: any) => {
      window.dataLayer.push({
        event: 'pageview',
        page,
      });
    };
    router.events.on('routeChangeComplete', handler);
    router.events.on('hashChangeComplete', handler);
    return () => {
      router.events.off('routeChangeComplete', handler);
      router.events.off('hashChangeComplete', handler);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <link href='/apple-touch-icon.png?v=1' rel='apple-touch-icon' sizes='180x180' />
        <link href='/favicon-32x32.png?v=1' rel='icon' sizes='32x32' type='image/png' />
        <link href='/favicon-16x16.png?v=1' rel='icon' sizes='16x16' type='image/png' />
        <link href='/site.webmanifest?v=1' rel='manifest' />
        <link color='#fa52a0' href='/safari-pinned-tab.svg?v=1' rel='mask-icon' />
        <link href='/favicon.ico?v=1' rel='shortcut icon' />
      </Head>
      <WagmiConfig>
        <QueryClientProvider client={queryClient}>
          {/* <QueryClientProvider>
          <WagmiStoreVersionCheck>{children}</WagmiStoreVersionCheck>
        </QueryClientProvider> */}
          {/* <DefaultSeo {...SEO} />
        <Header /> */}
          <Component {...pageProps} />
        </QueryClientProvider>
      </WagmiConfig>
      {/* <ThemeProvider forcedTheme='dark'>
        <DefaultSeo {...SEO} />
        <Header />
        <Component {...pageProps} />
        <GlobalFooter />
      </ThemeProvider> */}
      {/* <HotJar /> */}
    </>
  );
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(ctx);

  // Pass the data to our page via props
  return { ...appProps };
};

export default MyApp;
