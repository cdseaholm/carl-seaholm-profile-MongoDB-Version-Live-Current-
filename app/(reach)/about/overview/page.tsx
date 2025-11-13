import React from 'react';
import OverviewPage from '@/components/pagecomponents/about/overview';
import { Metadata } from 'next';
import { useUserStore } from '@/context/userStore';
import { IUser } from '@/models/types/user';
import Loader from '@/components/misc/loader';

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
    <Loader>
      <OverviewPage />
    </Loader>
  )
}