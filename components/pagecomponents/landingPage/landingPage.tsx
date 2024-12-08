'use client'

import React from 'react';
import SocialBar from '@/components/buttons/socialbar';
import Image from 'next/image';
import openInNewTab from '@/components/listeners/OpenInNewTab';

export default function Home({ navigateToDashboard, navigateToProfessional, size, dashShow, proShow, fadeInBegin, fadeOutBegin }: { navigateToDashboard: () => void, navigateToProfessional: () => void, size: number, dashShow: boolean, proShow: boolean, fadeInBegin: boolean, fadeOutBegin: boolean }) {

    return (
            <section className={`w-full h-full flex flex-col space-y-4 p-5 ${fadeInBegin ? 'fade-in' : ''}`}>
                <div className='flex flex-row justify-between items-center p-1 md:p-2 space-x-2'>
                    <div className='flex flex-col justify-start items-start w-2/3'>
                        <h1 className={`text-xl md:text-5xl font-semibold text-slate-100 ${fadeOutBegin ? 'fade-out' : ''}`}>
                            Carl Seaholm
                        </h1>
                        <h2 className={`text-sm md:text-2xl font-semibold text-slate-300 ${fadeOutBegin ? 'fade-out' : ''}`}>
                            A Personal and Professional Portfolio
                        </h2>
                    </div>
                    <div className={`relative flex flex-col justify-center items-center rounded-full border border-white cursor-pointer ${fadeOutBegin ? 'fade-out' : ''}`} onClick={() => openInNewTab('/images/carlseaholmimage.jpg')}>
                        <Image
                            priority
                            src={`/images/carlseaholmimage.jpg`}
                            height={size}
                            width={size}
                            alt="Carl Seaholm Profile Photo"
                            style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
                            className={`rounded-full ${fadeOutBegin ? 'fade-out' : ''}`}
                        />
                        <div className="absolute inset-0 bg-black opacity-20 rounded-full"></div>
                    </div>
                </div>
                <div className='flex flex-row w-full h-full px-8 items-center justify-evenly space-x-5 md:space-x-1'>
                    <div className='flex flex-col h-full w-full justify-center items-center space-y-4'>
                        <button className={`text-2xl md:text-4xl p-3 bg-transparent text-white rounded-lg hover:underline hover:text-slate-300 font-semibold`} onClick={navigateToDashboard}>
                            <p className={`text-center ${dashShow ? '' : 'fade-out'}`}>{`Personal Dashboard`}</p>
                        </button>
                        <button className={`text-2xl md:text-4xl p-3 bg-transparent text-white rounded-lg hover:underline hover:text-slate-300 font-semibold`} onClick={navigateToProfessional}>
                            <p className={`text-center ${proShow ? '' : 'fade-out'}`}>{`Professional Hub`}</p>
                        </button>
                    </div>
                </div>
                <div className={`flex flex-row justify-start items-center p-2 ${fadeOutBegin ? 'fade-out' : ''}`}>
                    <div className={`flex flex-col justify-start items-start ${fadeOutBegin ? 'fade-out' : ''}`}>
                        <SocialBar />
                    </div>
                </div>
            </section>
    );
}