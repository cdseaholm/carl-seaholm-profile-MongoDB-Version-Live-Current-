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
        router.replace('/dashboard');
    }, 500);
  };

  const navigateToProfessional = () => {
    setIsShowing(true);
    setTimeout(() => {
        router.replace('/about/professional');
    }, 500);
  };

        return (
          <main>
          <div className={`landing-page ${isShowing ? 'slide-up' : ''}`}>
            <div className={`flex flex-col px-8 ${isBreakpoint ? 'pt-2 pb-8' : 'pt-16'}`}>
                <h1 className={`flex flex-start ${isBreakpoint ? 'text-6xl' : 'text-8xl'} font-semibold text-slate-600`}>Carl Seaholm</h1>
                <div className='py-5 px-3'>
                  <h2 className={`flex ${isBreakpoint ? 'text-xl' : 'text-2xl'} font-semibold text-slate-600 pb-10`}>A Professional and Personal Portfolio</h2>
                  <div className='flex flex-row items-start space-x-10'>
                  <button className={`flex ${isBreakpoint ? 'text-sm p-2' : 'text-md p-3'} bg-slate-500/70 text-white rounded-lg`} onClick={navigateToDashboard}>
                    Personal Dashboard
                  </button>
                  <button className={`flex ${isBreakpoint ? 'text-sm p-2' : 'text-md p-3'} bg-slate-500/70 text-white rounded-lg`} onClick={navigateToProfessional}>
                    Professional Hub
                  </button>
                </div>
                </div>
              </div>
            </div>
        </main>
        );
}