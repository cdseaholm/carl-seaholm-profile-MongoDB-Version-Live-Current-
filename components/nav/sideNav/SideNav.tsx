'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SocialButton from '@/components/buttons/socialButton';
import { useAlertStore } from '@/context/alertStore';
import { useModalStore } from '@/context/modalStore';
import { useStateStore } from '@/context/stateStore';

export default function Sidenav({ open, toggle, children }: { open: boolean; toggle: () => void; children: React.ReactNode }) {

  // constants
  const ref = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const setAlertMessage = useAlertStore((state) => state.setAlertMessage);
  const setAlertParent = useAlertStore((state) => state.setAlertParent);
  const setShowAlert = useAlertStore((state) => state.setShowAlert);
  const { data: session } = useSession();
  const user = session?.user;

  const loggedInMenu = user !== null && user !== undefined ? true : false;

  const handleClickedSignIn = () => {
    setModalOpen('login');
  };

  const handleClickedLogout = () => {
    setAlertParent('logout');
    setAlertMessage('Are you sure you want to log out?');
    setShowAlert(true);
    toggle();
  };

  const handleClickedSub = () => {
    setModalOpen('subscribe');
  }

  const style = {
    closeIcon: `absolute top-1 focus:outline-none right-3 text-3xl text-white cursor-pointer`,
    sidenav: {
      open: `w-5/12 md:w-4/12 md:w-60 bg-green-900 text-white overflow-x-hidden z-40`,
      close: `w-0 bg-gray-800 text-white overflow-x-hidden`,
      default: `h-screen fixed z-30 top-0 left-0 transition-all ease duration-200`,
    }
  };

  //effects

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!ref.current || !ref.current.contains(event.target as HTMLDivElement)) {
        if (!open) return;
        toggle();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [open, ref, toggle]);

  useEffect(() => {
      if (localStorage.getItem("token")) {
          router.replace("/dashboard");
      }
  }, [router]);

  return (
    <aside
      ref={ref}
      className={`${style.sidenav.default} ${open ? 'w-screen h-screen bg-transparent' : 'h-0 w-0 hidden'}`}
    >
      <div className={`${style.sidenav.default} 
        ${open ? style.sidenav.open : style.sidenav.close}`}>
        <button aria-label="Close" className={style.closeIcon} onClick={toggle}>
          &times;
        </button>
        <div className='mx-3 divide-y divide-solid width-4/6'>
          <Link href='/'>
            <p className={`px-10 rounded-lg px-3 mt-8 pt-5 pb-7 text-slate-200 ${isBreakpoint ? 'text-xs' : 'text-sm'}`}>
              {`Carl Seaholm's Portfolio`}
            </p>
          </Link>
          <div />
          </div>
          <div className='divide-y divide-solid'>
            <div className="my-5">
              {children}
          </div>
          <div className='flex flex-col mx-3 py-5 items-center'>
            <div className={`max-md:text-sm`}>
                Socials
            </div>
            <div className={`justify-evenly mx-3 ${isBreakpoint ? 'pt-5' : 'pt-2'} max-md:text-sm flex flex-row items-center space-x-4 text-sm`}>
              <SocialButton networkName='github' parent={false} />
              <p>|</p>
              <SocialButton networkName='linkedin' parent={false} />
            </div>
          </div> 
            {loggedInMenu === false ? (
            <div className='flex flex-col'>
              <div className={`mx-3 pt-5 flex flex-col justify-evenly items-center max-md:text-sm`}>
                <button onClick={handleClickedSignIn} className='pb-5'>
                  Admin Login
                </button>
                <button onClick={handleClickedSub}>
                  Subscribe
                </button>
              </div>
            </div>
            ) : (
            <div className='mx-3 flex flex-col'> 
              <div className='flex flex-row py-3 justify-center'>
                <p>
                  Hello {session?.user?.name}
                </p>
              </div>
              <div className={`flex flex-row justify-evenly items-center max-md:text-sm`}>
                <Link href='/profile'>
                  Profile
                </Link>
                <button onClick={handleClickedLogout}>
                  Logout
                </button>
              </div>
            </div>
            )}
          </div>
        </div>
    </aside>
  );
}