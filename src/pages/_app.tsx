import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SabiDub - Coming Soon</title>
        <meta name="description" content="SabiDub - Coming Soon. Get notified when we launch!" />
        <link rel="icon" href="/images/favicon white.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SabiDub - Coming Soon" />
        <meta property="og:description" content="SabiDub - Coming Soon. Get notified when we launch!" />
        <meta property="og:image" content="/images/white.png" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
