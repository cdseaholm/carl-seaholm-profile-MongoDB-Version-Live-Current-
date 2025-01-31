import React from 'react';
import { Metadata } from 'next';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';
import DevelopmentPage from '@/components/pagecomponents/about/developmentpage';
import { useUserStore } from '@/context/userStore';
import { IUser } from '@/models/types/user';

export async function generateMetadata(): Promise<Metadata> {
  const userInfo = useUserStore.getState().userInfo as IUser;
  const userName = userInfo ? userInfo.name : 'Guest';

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