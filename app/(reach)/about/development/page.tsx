import React from 'react';
import { Metadata } from 'next';
import DevelopmentPage from '@/components/pagecomponents/about/developmentpage';
import { useUserStore } from '@/context/userStore';
import { IUser } from '@/models/types/user';
import Loader from '@/components/misc/loader';

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
    <Loader>
      <DevelopmentPage />
    </Loader>
  );
}