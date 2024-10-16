import React from 'react';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';
import OverviewPage from '@/components/pagecomponents/about/overview';
import { GetData } from '@/utils/data/get';
import { Metadata } from 'next';

async function initData() {
  const data = await GetData();
  const returnData = data.data;
  return returnData;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await initData();
  const userName = data.name;

  return {
    title: `Overview Page for ${userName}`,
    description: `A page dedicated to the overview of ${userName}`,
  };
}

export default async function Page() {
  return (
    <MainPageBody>
      <OverviewPage />
    </MainPageBody>
  )
}