'use client'

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from 'react';
import { Loader } from "@mantine/core";
import SocialBar from '@/components/buttons/socialbar';
import Image from 'next/image';
import openInNewTab from '@/components/listeners/OpenInNewTab';
import SectionWrapper from "@/components/pagetemplates/sectionWrapper";
import { useWindowSizes } from "@/context/width-height-store";

export default function LandingPage() {

    const router = useRouter();
    const [, startTransition] = useTransition();
    const [loadingTarget, setLoadingTarget] = useState<'dashboard' | 'professional' | null>(null);

    const [fadeInBegin, setFadeInBegin] = useState(false);
    const [fadeOutBegin, setFadeOutBegin] = useState(false);

    const buttonClass = `w-full lg:w-2/3 text-center md:min-h-[64px] sm:min-h-[56px] min-h-[52px]`;

    const textClass = `hover:underline hover:text-slate-300 font-bold text-white font-sans text-lg sm:text-2xl md:text-4xl p-3 rounded-md`

    const [shell, setShell] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            if (fadeOutBegin) {
                setShell(true)
            }
        }, 750);

        return () => clearTimeout(timer);
    }, [fadeOutBegin]);

    useEffect(() => {
        setFadeInBegin(true);
    }, []);

    const navigateToDashboard = () => {
        setLoadingTarget('dashboard');
        setFadeOutBegin(true);

        setTimeout(() => {
            startTransition(() => {
                router.push('/dashboard/stats');
            });
        }, 300);
    };

    const navigateToProfessional = () => {
        setLoadingTarget('professional');
        setFadeOutBegin(true);

        setTimeout(() => {
            startTransition(() => {
                router.push('/about/professional');
            });
        }, 300);
    };

    const isBreakpoint = useWindowSizes().width < 768 ? true : false;
    const size = isBreakpoint ? 50 : 100;

    useEffect(() => {
        router.prefetch('/dashboard/stats');
        router.prefetch('/about/professional');
    }, [router]);

    return (

        <SectionWrapper varHeight="h-[90%]" extraProps="flex flex-col justify-between items-center p-2 py-6 md:py-5 md:p-5">
            {!shell ? (
                <div className={`flex flex-row justify-between items-center p-1 md:p-2 w-full ${fadeOutBegin ? 'fade-out' : fadeInBegin ? 'fade-in' : ''}`}>
                    <div className="flex flex-col justify-start items-start w-full">
                        <h1 className={`text-2xl md:text-5xl font-semibold text-slate-100 w-content h-content`}>
                            Carl Seaholm
                        </h1>
                        <h2 className={`text-base md:text-2xl font-semibold text-slate-300 w-content h-content`}>
                            A Personal and Professional Portfolio
                        </h2>
                    </div>
                    <div className={`relative flex flex-col justify-center items-center rounded-full border border-white cursor-pointer`} onClick={() => openInNewTab('/images/carlseaholmimage.jpg')}>
                        <Image
                            priority
                            src={`/images/carlseaholmimage.jpg`}
                            height={size}
                            width={size}
                            alt="Carl Seaholm Profile Photo"
                            style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
                            className={`rounded-full`}
                        />
                        <div className="absolute inset-0 bg-black opacity-20 rounded-full" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-row p-1 md:p-2 w-full min-h-[64px] sm:min-h-[67.88px] md:min-h-[126.94]" />
            )}
            <div className='flex flex-col h-[70%] w-full justify-center items-center space-y-4 px-2 sm:px-8'>
                <button
                    className={`${buttonClass}`}
                    onClick={navigateToDashboard}
                    disabled={loadingTarget !== null}
                >
                    <p className={`${textClass} ${loadingTarget === 'professional' ? 'fade-out' : fadeInBegin ? `fade-in bg-cyan-900/20 hover:bg-cyan-900/40` : ''}`}>
                        {loadingTarget === 'dashboard' ? (
                            <span className="inline-flex items-center gap-3">
                                <Loader size="sm" color="white" />
                                Loading Dashboard...
                            </span>
                        ) : (
                            'Personal Dashboard'
                        )}
                    </p>
                </button>
                <button
                    className={`${buttonClass}`}
                    onClick={navigateToProfessional}
                    disabled={loadingTarget !== null}
                >
                    <p className={`${textClass} ${loadingTarget === 'dashboard' ? 'fade-out' : fadeInBegin ? `fade-in bg-cyan-900/20 hover:bg-cyan-900/40` : ''}`}>
                        {loadingTarget === 'professional' ? (
                            <span className="inline-flex items-center gap-3">
                                <Loader size="sm" color="white" />
                                Loading Professional Hub...
                            </span>
                        ) : (
                            'Professional Hub'
                        )}
                    </p>
                </button>
            </div>
            <SocialBar fadeOutBegin={fadeOutBegin} fadeInBegin={fadeInBegin} shell={shell} />
        </SectionWrapper>
    );
}
