import React from 'react';
import { GetData } from '@/utils/data/get';
import { Metadata } from 'next';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';
import DevelopmentPage from '@/components/pagecomponents/about/developmentpage';

async function initData() {
  const data = await GetData();
  const returnData = data.data;
  return returnData;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await initData();
  const userName = data.name;

  return {
    title: `${userName} Development Page`,
    description: `A page dedicated to the Development work of ${userName}`,
  };
}


export default async function Page() {

  return (
    <MainPageBody>
        <DevelopmentPage />
    </MainPageBody>
  );
}