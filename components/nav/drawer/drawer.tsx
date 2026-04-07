'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SocialButton from '@/components/buttons/socialButton';
import { useModalStore } from '@/context/modalStore';
import { useWindowSizes } from '@/context/width-height-store';
import { SideMenuAccordian } from '@/components/dropdowns/SideMenuAccordian';
import { Drawer } from '@mantine/core';

export default function NavDrawer({ open, toggleMenu }: { open: boolean; toggleMenu: () => void }) {

    // constants
    const router = useRouter();
    const isBreakpoint = useWindowSizes().width < 768 ? true : false;
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const { data: session } = useSession();
    const user = session?.user;
    const { width } = useWindowSizes();
    const drawerSize = width < 640 ? '80dvw' : width < 1024 ? '60dvw' : '40dvw';

    const loggedInMenu = user !== null && user !== undefined ? true : false;

    const handleClickedSignIn = () => {
        setModalOpen('login');
    };

    const handleClickedLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            toggleMenu();
        } else {
            return;
        }
    };

    const handleClickedSub = () => {
        setModalOpen('subscribe');
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.replace("/dashboard");
        }
    }, [router]);

    return (
        <Drawer opened={open} onClose={toggleMenu} title="Carl Seaholm's Portfolio" styles={{ content: { backgroundColor: '#064e3b', overflow: 'hidden' }, header: { backgroundColor: '#064e3b', color: 'white', borderBottom: '1px solid #ffffff70', height: '7dvh' }, close: { color: 'white' }, body: { height: '93dvh' } }} size={drawerSize} padding={'md'} position='left' w={drawerSize} h={'100dvh'} zIndex={1000} closeOnClickOutside={true} closeOnEscape={true}>
            <div className='flex flex-col justify-evenly h-[93dvh] w-full items-center pt-2 pb-8 md:pt-8 md:pb-16 overflow-hidden'>
                <SideMenuAccordian toggleMenu={toggleMenu} />
                <div className='flex flex-col items-center justify-center w-full h-content space-y-5'>
                    <div className='flex flex-col mx-3 py-3 md:py-5 items-center justify-center border-y border-gray-200/20 h-content w-full md:space-y-2'>
                        <p className={`max-md:text-sm`}>Socials</p>
                        <div className={`justify-evenly mx-3 ${isBreakpoint ? 'pt-5' : 'pt-2'} max-md:text-sm flex flex-row items-center space-x-4 text-sm`}>
                            <SocialButton networkName='github' parent={false} />
                            <p>|</p>
                            <SocialButton networkName='linkedin' parent={false} />
                        </div>
                    </div>
                    {loggedInMenu === false ? (
                        <div className={`flex flex-col w-full h-content justify-evenly items-center text-center space-y-5 mt-5`}>
                            <button type='button' onClick={handleClickedSignIn} className='cursor-pointer hover:underline text-slate-200 hover:text-slate-400'>
                                Admin Login
                            </button>
                            <button type='button' onClick={handleClickedSub} className='cursor-pointer hover:underline text-slate-200 hover:text-slate-400'>
                                Subscribe
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-col w-full h-content justify-evenly items-center text-center space-y-5'>
                            <p>
                                Hello {session?.user?.name}
                            </p>
                            <div className='flex flex-row justify-evenly items-center w-full h-content'>
                                <Link href='/profile' className='cursor-pointer hover:underline text-slate-200 hover:text-slate-400'>
                                    Profile
                                </Link>
                                <button onClick={handleClickedLogout} className='cursor-pointer hover:underline text-slate-200 hover:text-slate-400'>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Drawer>
    );
}