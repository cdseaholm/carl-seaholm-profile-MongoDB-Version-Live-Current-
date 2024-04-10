'use client'

import apolloClient from '@/lib/apollo';
import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} key={router.replace} />
      </ApolloProvider>
    </AnimatePresence>
  );
}

export default MyApp;