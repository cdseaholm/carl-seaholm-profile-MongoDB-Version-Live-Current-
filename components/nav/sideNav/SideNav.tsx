'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SocialButton from '@/components/buttons/socialButton';
import { useModalStore } from '@/context/modalStore';
import { useStateStore } from '@/context/stateStore';
import { IoIosClose, IoMdHome } from "react-icons/io";

export default function Sidenav({ open, toggle, children }: { open: boolean; toggle: () => void; children: React.ReactNode }) {

  // constants
  const ref = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const { data: session } = useSession();
  const user = session?.user;

  const loggedInMenu = user !== null && user !== undefined ? true : false;

  const handleClickedSignIn = () => {
    setModalOpen('login');
  };

  const handleClickedLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      toggle();
    } else {
      return;
    }
  };

  const handleClickedSub = () => {
    setModalOpen('subscribe');
  }

  const style = {
    closeIcon: `flex flex-row justify-end items-center px-6 pt-4 text-white w-full h-content`,
    sidenav: {
      open: `w-3/4 sm:w-1/2 lg:w-2/5 bg-emerald-900 text-white overflow-x-hidden z-40`,
      close: `w-0 bg-gray-800 text-white overflow-x-hidden`,
      default: `h-screen fixed z-30 top-0 left-0 transition-all ease duration-200 font-sans`,
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
          <IoIosClose size={28} />
        </button>
        <Link href='/' className='flex flex-row justify-center items-center w-full h-content space-x-3 py-6 border-b border-gray-100/20'>
          <IoMdHome size={18} />
          <p className={`text-slate-200 text-sm sm:text-base`}>
            {`Carl Seaholm's Portfolio`}
          </p>
        </Link>
        {children}
        <div className='flex flex-col mx-3 py-5 items-center justify-center border-b border-gray-100/20 h-[15%]'>
          <p className={`max-md:text-sm`}>Socials</p>
          <div className={`justify-evenly mx-3 ${isBreakpoint ? 'pt-5' : 'pt-2'} max-md:text-sm flex flex-row items-center space-x-4 text-sm`}>
            <SocialButton networkName='github' parent={false} />
            <p>|</p>
            <SocialButton networkName='linkedin' parent={false} />
          </div>
        </div>
        {loggedInMenu === false ? (
          <div className={`flex flex-col w-full h-[15%] justify-evenly items-center text-center`}>
            <button type='button' onClick={handleClickedSignIn} className='cursor-pointer hover:underline text-slate-200 hover:text-slate-400'>
              Admin Login
            </button>
            <button type='button' onClick={handleClickedSub} className='cursor-pointer hover:underline text-slate-200 hover:text-slate-400'>
              Subscribe
            </button>
          </div>
        ) : (
          <div className='flex flex-col w-full h-[15%] justify-evenly items-center text-center'>
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
    </aside>
  );
}