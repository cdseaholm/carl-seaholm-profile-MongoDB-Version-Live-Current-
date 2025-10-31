import React from 'react';
import { Metadata } from 'next';
import LandingPage from '@/components/pagecomponents/landingPage/landingPage';
import Loader from '@/components/misc/loader';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Carl's Portfolio`,
    description: `A site dedicated to the Peronsal and Professional Portfolio of Carl`,
  };
}

export default async function Page() {

  return (
    <Loader>
      <LandingPage />
    </Loader>
  );
}