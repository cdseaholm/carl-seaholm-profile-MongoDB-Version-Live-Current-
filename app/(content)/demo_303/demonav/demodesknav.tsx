'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';
import { SideMenuAccordian } from '@/app/(content)/demo_303/demonav/accordian/accordian';

const DemoSidenavPage = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

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
      <div className='justify-evenly flex flex-row items-center mx-3'>
        <div className='cursor-pointer pl-3' onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
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
      <Sidenav open={open} toggle={toggle}>
        {open ? (
            <SideMenuAccordian toggle={toggle} />
            ) : null}
      </Sidenav>
    </>
  );
};

const style = {
  closeIcon: `absolute top-1 focus:outline-none right-3 text-3xl text-black cursor-pointer`,
  sidenav: {
    open: `w-1/4 md:w-80 bg-amber-500 text-black overflow-x-hidden`,
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
        <div className='px-10 rounded-lg px-3 mt-4 pt-2 pb-7 text-black text-base'>
          303 Training Center
        </div>
      <div />
      </div>
      <div className='mx-3 divide-y divide-solid'>
      <div className="my-3">{children}</div>
      <div />
      </div>
      <div className='flex justify-center pt-3 text-base underline'>
        303 Training Center Socials
      </div>
      <div className='justify-evenly flex flex-row items-center pt-4 mx-3'>
        <div className='cursor-pointer pl-3' onClick={() => {}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
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
        <div className='flex justify-center items-center p-5'>
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

export default DemoSidenavPage;