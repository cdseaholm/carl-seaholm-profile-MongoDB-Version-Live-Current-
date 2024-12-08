import React from 'react';
import { Metadata } from 'next';
import LandingMiddle from '@/components/pagecomponents/landingPage/landingMiddle';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';

export async function generateMetadata(): Promise<Metadata> {

  return {
      title: `Carl's Portfolio`,
      description: `A site dedicated to the Peronsal and Professional Portfolio of Carl`,
  };
}

export default async function Page() {

  return (
    <MainPageBody>
      <LandingMiddle />
    </MainPageBody>
  );
}