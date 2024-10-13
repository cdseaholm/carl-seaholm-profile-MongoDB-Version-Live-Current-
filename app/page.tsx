'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SocialBar from '@/components/buttons/socialbar';
import Image from 'next/image';
import { useStateStore } from '@/context/stateStore';

export default function Home() {

  const [isShowing, setIsShowing] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const router = useRouter();
  const [dashShow, setDashShow] = useState(true);
  const [proShow, setProShow] = useState(true);

  useEffect(() => {
    // Fade in the image on load
    setIsImageVisible(true);
  }, []);

  const navigateToDashboard = async () => {
    setProShow(false);
    setIsImageVisible(false);
    setTimeout(() => {
      setIsShowing(true);
      router.replace('/dashboard');
    }, 500);
  };

  const navigateToProfessional = async () => {
    setDashShow(false);
    setIsImageVisible(false);
    setTimeout(() => {
      setIsShowing(true);
      router.replace('/about/professional');
    }, 500);
  };

  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
  const size = isBreakpoint ? 80 : 100;

  return (
    <section className={`landing-page ${isShowing ? 'slide-up' : ''} w-full h-full flex flex-col space-y-4 bg-slate-900/50 p-5`}>
      <div className='flex flex-row justify-between items-center p-1 md:p-2 space-x-2'>
        <div className='flex flex-col justify-start items-start'>
          <h1 className={`text-xl md:text-5xl font-semibold text-slate-100 ${isImageVisible ? 'fade-in' : 'fade-out'}`}>
            Carl Seaholm
          </h1>
          <h2 className={`text-sm md:text-2xl font-semibold text-slate-300 ${isImageVisible ? 'fade-in' : 'fade-out'}`}>
            A Professional and Personal Portfolio
          </h2>
        </div>
        <div className={`relative flex flex-col justify-center items-center rounded-full border border-white ${isImageVisible ? 'fade-in' : 'fade-out'}`}>
          <Image
            priority
            src={`/images/carlseaholmimage.jpg`}
            height={size}
            width={size}
            alt="Carl Seaholm Profile Photo"
            style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
            className={`rounded-full ${isImageVisible ? 'fade-in' : 'fade-out'}`}
          />
          <div className="absolute inset-0 bg-black opacity-20 rounded-full"></div>
        </div>
      </div>
      <div className='flex flex-row w-full h-full px-8 items-center justify-evenly space-x-5 md:space-x-1'>
        <div className='flex flex-col h-full w-full justify-center items-center space-y-4'>
          <button className={`text-2xl md:text-4xl p-3 bg-transparent text-white rounded-lg hover:underline hover:text-slate-300 font-semibold`} onClick={navigateToDashboard}>
            <p className={`text-center ${dashShow ? 'fade-in' : 'fade-out'}`}>{`Personal Dashboard`}</p>
          </button>
          <button className={`text-2xl md:text-4xl p-3 bg-transparent text-white rounded-lg hover:underline hover:text-slate-300 font-semibold`} onClick={navigateToProfessional}>
            <p className={`text-center ${proShow ? 'fade-in' : 'fade-out'}`}>{`Professional Hub`}</p>
          </button>
        </div>
      </div>
      <div className={`flex flex-row justify-start items-center p-2 ${isImageVisible ? 'fade-in' : 'fade-out'}`}>
        <div className={`flex flex-col justify-start items-start ${isImageVisible ? 'fade-in' : 'fade-out'}`}>
          <SocialBar />
        </div>
      </div>
    </section>
  );
}