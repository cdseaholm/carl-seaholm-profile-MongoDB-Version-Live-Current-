'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
  

export default function Home() {
  const [isShowing, setIsShowing] = React.useState(false);
    const router = useRouter();

  const navigateToDashboard = () => {
    setIsShowing(true);
    setTimeout(() => {
        router.push('/dashboard');
    }, 500);
  };
  

  return (
    <main>
      <div className={`landing-page ${isShowing ? 'slide-up' : ''}`}>
        <div className="px-5 py-8">
          <div className='min-h-screen min-w-screen my-10 mx-10'>
            <h1 className="flex flex-start text-8xl font-semibold text-slate-600">Carl Seaholm</h1>
            <p className="text-xl text-slate-700 pt-20">So many projects, so little time!</p>
            <p className="text-xl text-slate-700 pt-20 pb-20">See what he has been up to.</p>
              <button className="bg-slate-600/70 text-white p-3 rounded-lg" onClick={navigateToDashboard}>
                Dashboard
              </button>
          </div>
          </div>
        </div>
    </main>
  );
}