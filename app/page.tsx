import React from 'react';
import { Metadata } from 'next';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';
import LandingPage from '@/components/pagecomponents/landingPage/landingPage';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Carl's Portfolio`,
    description: `A site dedicated to the Peronsal and Professional Portfolio of Carl`,
  };
}

export default async function Page() {

  return (
    <MainPageBody>
      <LandingPage />
    </MainPageBody>
  );
}