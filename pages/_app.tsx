'use client'

import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <Component {...pageProps} key={router.replace} />
    </AnimatePresence>
  );
}

export default MyApp;