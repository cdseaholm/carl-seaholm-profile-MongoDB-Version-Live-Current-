import React from 'react';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';
import OverviewPage from '@/components/pagecomponents/about/overview';
import { Metadata } from 'next';
import { useUserStore } from '@/context/userStore';
import { IUser } from '@/models/types/user';

export async function generateMetadata(): Promise<Metadata> {
    const userInfo = useUserStore.getState().userInfo as IUser;
    const userName = userInfo ? userInfo.name : 'Guest';

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