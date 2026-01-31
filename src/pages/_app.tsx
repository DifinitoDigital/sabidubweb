import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800',],
});

import { Neonderthaw, Grey_Qo } from 'next/font/google';
const neonderthaw = Neonderthaw({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-neonderthaw',
});

const greyQo = Grey_Qo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-grey-qo',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SabiDub | Transforming Education through Innovation</title>
        <meta name="description" content="SabiDub is a comprehensive digital ecosystem for modern African schools, offering advanced management tools and admission analysis for educational excellence." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SabiDub | Transforming Education through Innovation" />
        <meta property="og:description" content="Experience the future of school management with SabiDub. Comprehensive tools for modern African schools, visionary educators, and ambitious students." />
        <meta property="og:image" content="/images/black.png" />
        <meta property="og:type" content="website" />
      </Head>
      <main className={`${manrope.className} ${neonderthaw.variable} ${greyQo.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
