'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

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
    <main>
      <div className={`landing-page ${isShowing ? 'slide-up' : ''}`}>
        <div className={`flex flex-col w-full h-full justify-center items-center space-y-6`}>
          <h1 className={`text-5xl md:text-7xl font-semibold text-slate-600 text-center`}>Carl Seaholm</h1>
          <h2 className={`text-xl md:text-2xl font-semibold text-slate-600 text-center`}>A Professional and Personal Portfolio</h2>
          <section className='flex flex-col items-center justify-center w-full h-full space-y-3'>
            <button className={`text-sm p-2 md:text-md p-3 bg-slate-500/70 text-white rounded-lg w-1/2 md:w-1/3 lg:w-1/4`} onClick={navigateToDashboard}>
              <p className='text-center'>{`Personal Dashboard`}</p>
            </button>
            <button className={`text-sm p-2 md:text-md p-3 bg-slate-500/70 text-white rounded-lg w-1/2 md:w-1/3 lg:w-1/4`} onClick={navigateToProfessional}>
              <p className='text-center'>{`Professional Hub`}</p>
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}