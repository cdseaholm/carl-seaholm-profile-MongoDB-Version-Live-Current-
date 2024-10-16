'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SocialBar from '@/components/buttons/socialbar';
import Image from 'next/image';
import { useStateStore } from '@/context/stateStore';
import { Spinner } from '@/components/misc/Spinner';
import openInNewTab from '@/components/listeners/OpenInNewTab';

export default function Home() {

  const [isImageVisible, setIsImageVisible] = useState(false); // Initially hidden
  const router = useRouter();
  const [dashShow, setDashShow] = useState(false); // Initially hidden
  const [proShow, setProShow] = useState(false); // Initially hidden
  const [loading, setLoading] = useState(true);
  const [fadeBegin, setFadeBegin] = useState(false);

  useEffect(() => {
    setLoading(false);
    setFadeBegin(true);
    setIsImageVisible(true); // Show after loading
    setDashShow(true); // Show after loading
    setProShow(true); // Show after loading
  }, []);

  const navigateToDashboard = async () => {
    setProShow(false);
    setIsImageVisible(false);
    setTimeout(() => {
      router.replace('/dashboard');
    }, 500);
  };

  const navigateToProfessional = async () => {
    setDashShow(false);
    setIsImageVisible(false);
    setTimeout(() => {
      router.replace('/about/professional');
    }, 500);
  };

  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
  const size = isBreakpoint ? 50 : 100;

  return (
    loading ? (
      <Spinner />
    ) : (
      <section className={`w-full h-full flex flex-col space-y-4 p-5`}>
        <div className='flex flex-row justify-between items-center p-1 md:p-2 space-x-2'>
          <div className='flex flex-col justify-start items-start w-2/3'>
            <h1 className={`text-xl md:text-5xl font-semibold text-slate-100 ${fadeBegin ? 'fade-in' : ''} ${isImageVisible ? '' : 'fade-out'}`}>
              Carl Seaholm
            </h1>
            <h2 className={`text-sm md:text-2xl font-semibold text-slate-300 ${fadeBegin ? 'fade-in' : ''} ${isImageVisible ? '' : 'fade-out'}`}>
              A Personal and Professional Portfolio
            </h2>
          </div>
          <div className={`relative flex flex-col justify-center items-center rounded-full border border-white cursor-pointer ${fadeBegin ? 'fade-in' : ''} ${isImageVisible ? '' : 'fade-out'}`} onClick={() => openInNewTab('/images/carlseaholmimage.jpg')}>
            <Image
              priority
              src={`/images/carlseaholmimage.jpg`}
              height={size}
              width={size}
              alt="Carl Seaholm Profile Photo"
              style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
              className={`rounded-full ${fadeBegin ? 'fade-in' : ''} ${isImageVisible ? '' : 'fade-out'}`}
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
        <div className={`flex flex-row justify-start items-center p-2 ${fadeBegin ? 'fade-in' : ''} ${isImageVisible ? '' : 'fade-out'}`}>
          <div className={`flex flex-col justify-start items-start ${fadeBegin ? 'fade-in' : ''} ${isImageVisible ? '' : 'fade-out'}`}>
            <SocialBar />
          </div>
        </div>
      </section>
    )
  );
}