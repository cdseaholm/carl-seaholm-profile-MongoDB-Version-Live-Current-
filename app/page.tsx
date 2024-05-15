'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/misc/Spinner';

export default function Home() {
  const { data: session } = useSession();
  const [isShowing, setIsShowing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const thisUser = session?.user;
      if (thisUser === null || thisUser === undefined || thisUser) {
        setLoading(false);
        return;
      } else if (thisUser === undefined) {
        console.error('Failed to fetch user');
        return;
      }
      
      setLoading(false);
    }
    fetchUser();
  }, [setLoading, session, router, session?.user]);

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
            {loading ? (
              Spinner()
            ) : (
          <div className={`landing-page ${isShowing ? 'slide-up' : ''}`}>
            <div className={`flex flex-col px-8 pt-2 pb-8 md:pt-16`}>
                <h1 className={`flex flex-start text-6xl md:text-8xl font-semibold text-slate-600`}>Carl Seaholm</h1>
                <div className='py-5 px-3'>
                  <h2 className={`flex text-xl md:text-2xl font-semibold text-slate-600 pb-10`}>A Professional and Personal Portfolio</h2>
                  <div className='flex flex-row items-start space-x-10'>
                  <button className={`flex text-sm p-2 md:text-md p-3 bg-slate-500/70 text-white rounded-lg`} onClick={navigateToDashboard}>
                    Personal Dashboard
                  </button>
                  <button className={`flex text-sm p-2 md:text-md p-3 bg-slate-500/70 text-white rounded-lg`} onClick={navigateToProfessional}>
                    Professional Hub
                  </button>
                </div>
                </div>
              </div>
            </div>
            )}
        </main>
        );
}