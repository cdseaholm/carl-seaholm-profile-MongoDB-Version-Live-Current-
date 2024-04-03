'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';
import { SideMenuAccordianMobile } from '@/app/(content)/demo_303/demonav/accordian/mobileaccordian';

const DemoSidenavMobile = () => {
  const [open, setOpen] = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const pathname = usePathname();
  const socialsRef = React.useRef<HTMLDivElement>(null);

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  
  const toggleSocials = React.useCallback(() => {
      setSocialsOpen((prevState) => !prevState);
  }, []);

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!socialsRef.current || !socialsRef.current.contains(event.target as HTMLDivElement) && event.target.id !== 'socialButton') {
        if (!socialsOpen) return;
        toggleSocials();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [socialsOpen, socialsRef, toggleSocials]);
  

  return (
    <>
    <div className='flex flex-row justify-between px-2 pt-4'>
      <div className='flex items-center px-4'>
        {pathname !== '/' && !open &&
        <button 
          type='button'
          aria-disabled={open}
          disabled={open}
          onClick={toggle}
          className={`font-medium text-white`}
        >
          Menu
        </button>
        }
        {pathname !== '/' && !open &&
        <>
        <div className={`mx-5 text-white`}>
          |</div>
        <div>
          <Link className={`font-medium text-white`} href=''>
            Schedule
          </Link>
        </div>
        </>
        }
      </div>
      <button id='socialButton' type='button' className='cursor-pointer text-white font-medium pr-4' onClick={socialsOpen ? () => setSocialsOpen(false) : () => setSocialsOpen(true)}>
        Socials
      </button>
      {socialsOpen && 
      <div className='absolute top-10 right-10 bg-black/90 z-20 border-white border'>
        <div className='justify-evenly flex flex-row items-center mx-3'>
          <div ref={socialsRef} className='cursor-pointer' onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-9 h-9">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className=''>|</p>
          <div className='cursor-pointer' onClick={() => {}}>
            <SocialIcon style={style.topicon} network='facebook'/>
          </div>
          <p className=''>|</p>
          <div className='cursor-pointer' onClick={() => {}}>
            <SocialIcon style={style.topicon} network='youtube' />
          </div>
            <div className='cursor-pointer' onClick={() => {}}>
              <SocialIcon style={style.topicon} network='twitter' />
            </div>
            <p>|</p>
            <div className='cursor-pointer' onClick={() => {}}>
              <SocialIcon style={style.topicon} network='instagram' />
            </div>
          </div>
        </div>
      }
    </div>
      <Sidenav open={open} toggle={toggle}>
        {open ? (
            <SideMenuAccordianMobile toggle={toggle} />
            ) : null}
      </Sidenav>
    </>
  );
};

const style = {
  closeIcon: `absolute top-1 focus:outline-none right-3 text-3xl text-black cursor-pointer`,
  sidenav: {
    open: `w-5/12 md:w-80 bg-amber-500 text-black overflow-x-hidden`,
    close: `w-0 bg-gray-800 text-white overflow-x-hidden`,
    default: `h-screen fixed z-30 top-0 left-0 transition-all ease duration-200`,
  },
  icon: {
    height: 30,
    width: 30,
    margin: 3,
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
  topicon: {
    height: 35,
    width: 35,
    margin: 5,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
};

function Sidenav({ open, toggle, children }: { open: boolean; toggle: () => void; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

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

  return (
    <aside
      ref={ref}
      className={`${style.sidenav.default} 
        ${open ? style.sidenav.open : style.sidenav.close}`}
        style={{scrollbarWidth: 'thin', scrollbarGutter: 'stable' }}
    >
      <button aria-label="Close" className={style.closeIcon} onClick={toggle}>
        &times;
      </button>
      <div className='mx-3 divide-y divide-solid'>
        <div className='px-10 rounded-lg px-3 mt-4 pt-2 pb-7 text-black text-sm'>
          303 Training Center
        </div>
      <div />
      </div>
      <div className='mx-3 divide-y divide-solid'>
      <div className="my-3">{children}</div>
      <div />
      </div>
      <div className='flex justify-center pt-3 text-sm underline'>
        303 Training Center Socials
      </div>
      <div className='justify-evenly flex flex-row items-center pt-4 mx-3'>
        <div className='cursor-pointer pl-3' onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
          </svg>
        </div>
        <p className=''>|</p>
        <div className='cursor-pointer' onClick={() => {}}>
          <SocialIcon style={style.icon} network='facebook'/>
        </div>
        <p className=''>|</p>
        <div className='cursor-pointer' onClick={() => {}}>
          <SocialIcon style={open ? style.icon : style.iconClose} network='youtube' />
        </div>
      </div>
        <div className='justify-evenly flex flex-row items-center pt-2 mx-10'>
          <div className='cursor-pointer' onClick={() => {}}>
            <SocialIcon style={open ? style.icon : style.iconClose} network='twitter' />
          </div>
          <p>|</p>
          <div className='cursor-pointer' onClick={() => {}}>
            <SocialIcon style={open ? style.icon : style.iconClose} network='instagram' />
          </div>
        </div>
        <div className='flex text-sm justify-center items-center p-5'>
          <div>
            <p className='text-center'>Contact</p>
            <p className='text-center'>Westminster: 303-650-4466</p>
            <p className='text-center'>Arvada: 720-360-0952</p>
            <p className='text-center'>T303TC@gmail.com</p>
          </div>
        </div>
    </aside>
  );
}

export default DemoSidenavMobile;