import "@/styles/globals.css";
import "@/lib/console-override";
import type { AppProps } from "next/app";
import Head from 'next/head';
import { Manrope } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  const router = useRouter();

  // Global URL Sanitizer: Removes ugly tracking parameters
  useEffect(() => {
    if (!router.isReady) return;

    const cleanUrl = () => {
      const currentUrl = new URL(window.location.href);
      const params = new URLSearchParams(currentUrl.search);
      const paramsToRemove = [
        'fbclid', 'gclid', 'gclsrc', 'dclid',
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
        'msclkid', 'ref', 'token', 'code' // 'token' and 'code' are often used for auth and should be hidden after use
      ];

      let changed = false;
      paramsToRemove.forEach(param => {
        if (params.has(param)) {
          // Verify Email and Reset Password pages handle 'token' internally, 
          // so we can safe-guard or just let them handle it. 
          // However, for a global cleaner, we might want to be careful with 'token' if it's needed for initial render.
          // The page-specific logic I added earlier runs on mount. 
          // If this global cleaner runs first, conflict might occur. 
          // BUT: router.replace is async.

          // Better strategy: Only remove tracking params globally. 
          // Leave 'token' to specific pages to ensure they capture it first.
          if (['token', 'code'].includes(param)) return;

          params.delete(param);
          changed = true;
        }
      });

      if (changed) {
        const newPath = `${currentUrl.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        router.replace(newPath, undefined, { shallow: true });
      }
    };

    cleanUrl();
  }, [router.asPath, router.isReady, router]);
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
