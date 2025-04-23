'use client'

import { useRouter } from "next/navigation";
import { useStateStore } from "@/context/stateStore";
import React, { useEffect, useState } from 'react';
import SocialBar from '@/components/buttons/socialbar';
import Image from 'next/image';
import openInNewTab from '@/components/listeners/OpenInNewTab';

export default function LandingPage() {

    const router = useRouter();
    const [dashShow, setDashShow] = useState(true);
    const [proShow, setProShow] = useState(true);

    const [fadeInBegin, setFadeInBegin] = useState(false);
    const [fadeOutBegin, setFadeOutBegin] = useState(false);

    const buttonClass = `w-full lg:w-2/3 text-center`;

    const textClass = `hover:underline hover:text-slate-300 font-bold text-white font-sans text-lg sm:text-2xl md:text-4xl p-3 rounded-md`

    const [dashText, setDashText] = useState(['Personal Dashboard']);
    const [proText, setProText] = useState(['Professional Hub']);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (dashShow && !proShow) {
                setProText(['', 'p-3']);
            } else if (proShow && !dashShow) {
                setDashText(['', 'p-3']);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [dashShow, proShow]);

    useEffect(() => {
        setFadeInBegin(true);
    }, []);

    const navigateToDashboard = () => {
        setProShow(false);
        setFadeOutBegin(true);
        setTimeout(() => {
            router.replace('/dashboard');
        }, 750);
    };

    const navigateToProfessional = () => {
        setDashShow(false);
        setFadeOutBegin(true);
        setTimeout(() => {
            router.replace('/about/professional');
        }, 750);
    };

    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
    const size = isBreakpoint ? 50 : 100;
    return (

        <section className={`w-screen h-screen flex flex-col justify-between items-center p-2 py-12 sm:py-8 md:py-6 md:py-5 md:p-5`}>
            <div className='flex flex-row justify-between items-center p-1 md:p-2 w-full h-content'>
                <div className='flex flex-col justify-start items-start w-full h-content'>
                    <h1 className={`text-2xl md:text-5xl font-semibold text-slate-100 ${fadeOutBegin ? 'fade-out' : fadeInBegin ? 'fade-in' : ''} w-content h-content`}>
                        {!fadeOutBegin && fadeInBegin ? 'Carl Seaholm' : ''}
                    </h1>
                    <h2 className={`text-base md:text-2xl font-semibold text-slate-300 ${fadeOutBegin ? 'fade-out' : fadeInBegin ? 'fade-in' : ''} w-content h-content`}>
                        {!fadeOutBegin && fadeInBegin ? 'A Personal and Professional Portfolio' : ''}
                    </h2>
                </div>
                <div className={`relative flex flex-col justify-center items-center rounded-full ${fadeInBegin && !fadeOutBegin ? 'border border-white' : ''} cursor-pointer ${fadeOutBegin ? 'fade-out' : fadeInBegin ? 'fade-in' : ''}`} onClick={() => openInNewTab('/images/carlseaholmimage.jpg')}>
                    {!fadeOutBegin && fadeInBegin ?
                        <>
                            <Image
                                priority
                                src={`/images/carlseaholmimage.jpg`}
                                height={size}
                                width={size}
                                alt="Carl Seaholm Profile Photo"
                                style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
                                className={`rounded-full ${fadeOutBegin ? 'fade-out' : fadeInBegin ? 'fade-in' : ''}`}
                            />
                            <div className="absolute inset-0 bg-black opacity-20 rounded-full"></div>
                        </>
                        :
                        <div
                            style={{
                                height: size,
                                width: size,
                                borderRadius: '50%',
                                backgroundColor: 'transparent',
                            }}
                            className="rounded-full"
                        />

                    }
                </div>
            </div>
            <div className='flex flex-row w-full h-content px-2 sm:px-8 items-center justify-evenly space-x-5 md:space-x-1'>
                <div className='flex flex-col h-full w-full justify-center items-center space-y-4'>
                    <button className={`${buttonClass}`} onClick={navigateToDashboard}>
                        <p className={`${textClass} ${!dashShow && fadeOutBegin ? 'fade-out' : !fadeOutBegin && fadeInBegin ? `fade-in bg-cyan-900/20 hover:bg-cyan-900/40` : ''}`}>{`${!fadeInBegin && !fadeOutBegin ? '' : `${dashText[0]}`}`}</p>
                    </button>
                    <button className={`${buttonClass}`} onClick={navigateToProfessional}>
                        <p className={`${textClass} ${!proShow && fadeOutBegin ? 'fade-out' : !fadeOutBegin && fadeInBegin ? `fade-in bg-cyan-900/20 hover:bg-cyan-900/40` : ''}`}>{`${!fadeInBegin && !fadeOutBegin ? '' : `${proText[0]}`}`}</p>
                    </button>
                </div>
            </div>
            <div className={`flex flex-row justify-end w-full h-content items-center p-2 ${fadeOutBegin ? 'fade-out' : fadeInBegin ? 'fade-in' : ''}`}>
                {!fadeOutBegin && fadeInBegin ? <SocialBar /> : null}
            </div>
        </section>

    );
}