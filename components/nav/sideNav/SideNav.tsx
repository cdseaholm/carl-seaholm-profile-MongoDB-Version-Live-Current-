'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';
import openInNewTab from '@/components/listeners/OpenInNewTab';
import { useSession } from '@/app/context/session/SessionContext';
import useMediaQuery from '../../listeners/WidthSettings';
import { useModalContext } from "@/app/context/modal/modalContext";
import { set } from 'date-fns';

export default function Sidenav({ open, toggle, children }: { open: boolean; toggle: () => void; children: React.ReactNode }) {

  // constants
  const ref = React.useRef<HTMLDivElement>(null);
  const { user } = useSession();
  const router = useRouter();
  const isBreakpoint = useMediaQuery(768);
  const { setAlertMessage, setAlertParent, setShowAlert, setModalSignUpOpen, setModalOpen } = useModalContext();
  var screenName = '';
  if (user !== null && user !== undefined) {
    screenName = user.firstName ? user.firstName : '';
  };

  const handleClickedSignIn = () => {
    setModalOpen(true);
  };

  const handleClickedLogout = () => {
    setAlertParent('logout');
    setAlertMessage('Are you sure you want to log out?');
    setShowAlert(true);
    toggle();
  };

  const handleClickedSignUp = () => {
    setModalSignUpOpen(true);
  };

  const handleTest = () => {
    router.replace('/demo_303');
  };

  const style = {
    closeIcon: `absolute top-1 focus:outline-none right-3 text-3xl text-white cursor-pointer`,
    sidenav: {
      open: `${isBreakpoint ? "w-5/12" : 'w-3/12'} md:w-60 bg-green-900 text-white overflow-x-hidden z-40`,
      close: `w-0 bg-gray-800 text-white overflow-x-hidden`,
      default: `h-screen fixed z-30 top-0 left-0 transition-all ease duration-200`,
    },
    icon: {
      height: 35,
      width: 35,
      margin: 5,
      border: '1px solid white',
      borderRadius: '50%',
      alignContent: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    iconClose: {
      height: 2,
      width: 2,
      margin: 0,
      borderRadius: '50%',
      overflow: 'hidden',
      color: 'transparent',
    },
  };

  //variables
  const textSize = isBreakpoint ? 'text-sm' : '';

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
    <>
    <aside
      ref={ref}
      className={`${style.sidenav.default} 
        ${open ? style.sidenav.open : style.sidenav.close}`}
    >
      <button aria-label="Close" className={style.closeIcon} onClick={toggle}>
        &times;
      </button>
      <div className='mx-3 divide-y divide-solid width-4/6'>
        <div className={`px-10 rounded-lg px-3 mt-8 pt-5 pb-7 text-slate-200 ${isBreakpoint ? 'text-xs' : 'text-sm'}`}>
          Carl Seaholm&apos;s Portfolio
        </div>
        <div />
        </div>
        <div className='divide-y divide-solid'>
          <div className="my-5">{children}
        </div>
        <div className='flex flex-col mx-3 py-5 items-center'>
          <div className={`${textSize}`}>
              Socials
          </div>
          <div className={`justify-evenly mx-3 ${isBreakpoint ? 'pt-5' : 'pt-2'} ${textSize} flex flex-row items-center space-x-4 text-sm`}>
            <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
              <SocialIcon style={style.icon} network='github'/>
            </div>
            <p>|</p>
            <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
            <SocialIcon style={open ? style.icon : style.iconClose} network='linkedin' />
            </div>
          </div>
        </div>
          {!user ? (
          <div className='flex flex-col'>
            <div className={`mx-3 pt-5 flex flex-row justify-evenly items-center ${textSize}`}>
              <button onClick={handleClickedSignIn}>
                Login
              </button>
              <button onClick={handleClickedSignUp}>
                Sign Up
              </button>
            </div>
          </div>
          ) : (
          <div className='mx-3 flex flex-col'> 
            <div className='flex flex-row py-3 justify-center'>
              <p>
                Hello {screenName}
              </p>
            </div>
            <div className={`flex flex-row justify-evenly items-center ${textSize}`}>
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
    </aside>
    </>
  );
}