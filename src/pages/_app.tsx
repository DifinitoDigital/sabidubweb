import "@/styles/globals.css";
import "@/lib/console-override";
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
        <title>SabiDub | Empowering Students through Educational Innovation</title>
        <meta name="description" content="SabiDub is a student-first educational ecosystem providing advanced admission analysis, career guidance, and streamlined school management for educational excellence." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SabiDub | Empowering Students through Educational Innovation" />
        <meta property="og:description" content="SabiDub is a student-first educational ecosystem providing advanced admission analysis, career guidance, and streamlined school management for educational excellence." />
        <meta property="og:image" content="/images/black.png" />
        <meta property="og:type" content="website" />
      </Head>
      <main className={`${manrope.className} ${neonderthaw.variable} ${greyQo.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
