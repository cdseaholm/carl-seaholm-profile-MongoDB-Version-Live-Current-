'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';
import openInNewTab from '../listeners/OpenInNewTab';
import useMediaQuery from '../listeners/WidthSettings';
import { SideMenuAccordian } from './menuDrops/SideMenuAccordian';

const SidenavPage = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      {pathname !== '/' && pathname !== '/demo_303' &&
        <div className='flex flex-row w-full justify-between'>
          <div className='flex items-center'>
            <button 
              type='button'
              aria-disabled={open}
              disabled={open}
              onClick={toggle}
              className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`}
            >
              Menu
            </button>
            <div className={`mx-5 my-1 ${open ? 'text-transparent' : 'text-black'}`}>
              |
            </div>
            <div>
              <Link className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`} href='/'>
                Home
              </Link>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
              <SocialIcon style={style.mainBarIconStyle} network='github'/>
            </div>
            <p className='mx-3'>|</p>
            <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
              <SocialIcon style={style.mainBarIconStyle} network='linkedin' />
            </div>
          </div>
        </div>
      }
      <Sidenav open={open} toggle={toggle}>
        {open ? (
            <SideMenuAccordian toggle={toggle} />
            ) : null}
      </Sidenav>
    </>
  );
};

const style = {
  closeIcon: `absolute top-1 focus:outline-none right-3 text-3xl text-white cursor-pointer`,
  sidenav: {
    open: `w-3/12 md:w-60 bg-slate-900/90 text-white overflow-x-hidden`,
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
  mainBarIconStyle: {
    height: 30,
    width: 30,
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
    >
      <button aria-label="Close" className={style.closeIcon} onClick={toggle}>
        &times;
      </button>
      <div className='mx-3 divide-y divide-solid width-4/6'>
      <div className='px-10 rounded-lg px-3 mt-8 pt-5 pb-7 text-slate-200 text-sm'>
        Carl Seaholm&apos;s Portfolio
      </div>
      <div />
      </div>
      <div className='divide-y divide-solid'>
      <div className="my-5">{children}</div>
        <div className='justify-evenly mx-3 pt-5 flex flex-row items-center'>
          <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
            <SocialIcon style={style.icon} network='github'/>
          </div>
          <p>|</p>
          <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
          <SocialIcon style={open ? style.icon : style.iconClose} network='linkedin' />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidenavPage;