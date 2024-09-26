'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import SocialBar from '@/components/buttons/socialbar';

export default function Home() {

  const [isShowing, setIsShowing] = React.useState(false);
  const router = useRouter();

  const navigateToDashboard = async () => {
    setIsShowing(true);
    setTimeout(() => {
      router.replace('/dashboard');
    }, 500);
  };

  const navigateToProfessional = async () => {
    setIsShowing(true);
    setTimeout(() => {
      router.replace('/about/professional');
    }, 500);
  };

  return (
    <section className={`landing-page ${isShowing ? 'slide-up' : ''} w-full h-full flex flex-col space-y-4`}>
      <div className='flex flex-row justify-start items-center p-2'>
        <div className='flex flex-col justify-start items-start'>
          <h1 className={`text-4xl md:text-7xl font-semibold text-slate-600`}>
            Carl Seaholm
          </h1>
          <h2 className={`text-lg md:text-2xl font-semibold text-slate-600`}>
            A Professional and Personal Portfolio
          </h2>
        </div>
      </div>
      <div className='flex flex-col h-full w-full justify-center items-center space-y-4'>
        <button className={`text-md md:text-lg p-3 bg-slate-500/60 text-white rounded-lg w-1/2 md:w-1/4 lg:w-1/5 backdrop-blur-xl`} onClick={navigateToDashboard}>
          <p className='text-center'>{`Personal Dashboard`}</p>
        </button>
        <button className={`text-md md:text-lg p-3 bg-slate-500/60 text-white rounded-lg w-1/2 md:w-1/4 lg:w-1/5 backdrop-blur-xl`} onClick={navigateToProfessional}>
          <p className='text-center'>{`Professional Hub`}</p>
        </button>
      </div>
      <div className='flex flex-row justify-start items-center p-2'>
        {!isShowing &&
          <div className='flex flex-col justify-start items-start'>
            <SocialBar />
          </div>
        }
      </div>
    </section>
  );
}

