'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import useMediaQuery from '@/components/listeners/WidthSettings';
  

export default function Home() {
  const [isShowing, setIsShowing] = React.useState(false);
    const router = useRouter();
    const isBreakpoint = useMediaQuery(768);

  const navigateToDashboard = () => {
    setIsShowing(true);
    setTimeout(() => {
        router.push('/dashboard');
    }, 500);
  };

  const navigateToProfessional = () => {
    setIsShowing(true);
    setTimeout(() => {
        router.push('/about/professional');
    }, 500);
  };
  

  return (
    <main>
      <div className={`landing-page ${isShowing ? 'slide-up' : ''}`}>
        <div className={`flex px-5 ${isBreakpoint ? 'py-5' : 'py-8'}`}>
          <div className='min-h-screen min-w-screen my-10 mx-10'>
            <h1 className={`flex flex-start ${isBreakpoint ? 'text-6xl' : 'text-8xl'} font-semibold text-slate-600`}>Carl Seaholm</h1>
            <p className={`${isBreakpoint ? 'text-lg' : 'text-xl'} text-slate-700 pt-20 pb-15`}>So many projects, so little time!</p>
            <p className={`${isBreakpoint ? 'text-lg' : 'text-xl'} text-slate-700 pt-20 pb-10`}>See what he has been up to. Click below!</p>
              <button className={`flex ${isBreakpoint ? 'text-sm' : 'text-md'} bg-slate-600/70 text-white p-3 rounded-lg`} onClick={navigateToDashboard}>
                Dashboard
              </button>
              <p className={`${isBreakpoint ? 'text-lg' : 'text-xl'} text-slate-700 pt-20 pb-10`}>Or check out his professional work by clicking below</p>
              <button className={`flex ${isBreakpoint ? 'text-sm' : 'text-md'} bg-slate-600/70 text-white p-3 rounded-lg`} onClick={navigateToProfessional}>
                Professional Page
              </button>
          </div>
          </div>
        </div>
    </main>
  );
}