'use client'

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';
import openInNewTab from '../listeners/OpenInNewTab';
import Image from 'next/image';
import { SideMenuAccordianMobile } from './menuDrops/SideMenuAccordianMobile';
import { useSession } from '@/app/SessionContext';
import logoutAuth from '@/lib/auth/logout/logout';

const SidenavMobile = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const imageClick = useCallback(() => {
    setIsHovered(prevHovered => !prevHovered);
    setClicked(prevClicked => !prevClicked);
  }, []);

  const imageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!imageRef.current || !imageRef.current.contains(event.target as HTMLDivElement)) {
        if (!clicked) return;
        imageClick();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [clicked, isHovered, imageRef, imageClick]);

  const style = {
    profilepicture: {
      large: `absolute z-40 top-0 right-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `absolute z-40 top-0 right-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
    },
  };

  return (
    <>
      {pathname !== '/'  && pathname !== '/demo_303' &&
      <div className='flex flex-row justify-start items-center'>
        <button 
          type='button'
          aria-disabled={open}
          disabled={open}
          onClick={toggle}
          className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`}
        >
          Menu
        </button>
        <>
        <div className={`mx-5 my-1 ${open ? 'text-transparent' : 'text-black'}`}>|</div>
        <div>
          <Link className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`} href='/'>
            Home
          </Link>
        </div>
        </>
      </div>
      }
      <div ref={imageRef} className={`mt-3 ml-5 ${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
      {pathname === '/about/professional' &&
        <Image
          onClick={imageClick}
          priority
          src="/images/carlseaholmimage.jpg"
          className={`z-30 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`}
          height={clicked ? 200 : 60}
          width={clicked ? 200 : 60}
          alt="Carl Seaholm Profile Photo"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
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
  closeIcon: `absolute top-1 focus:outline-none right-3 text-3xl text-white cursor-pointer`,
  sidenav: {
    open: `w-5/12 md:w-60 bg-green-900 text-white overflow-x-hidden z-40`,
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
  const { user, logout, session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      if (session) {
        const loggingOut = await logoutAuth({ session });
        if (loggingOut === 'Logged out successfully') {
          logout();
          router.push('/login');
        } else {
          alert('Already logged out');
          console.log(loggingOut);
        }
      }
    }
  };

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
        <div className='px-10 rounded-lg px-3 mt-8 pt-5 pb-7 text-slate-200 text-xs'>
          Carl Seaholm&apos;s Portfolio
        </div>
        <div />
        </div>
        <div className='divide-y divide-solid'>
          <div className="my-5">{children}
        </div>
        <div className='flex flex-col mx-3 py-5 items-center'>
          <div className='text-sm'>
              Socials
          </div>
          <div className='justify-evenly mx-3 pt-5 flex flex-row items-center space-x-4 text-sm'>
            <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
              <SocialIcon style={style.icon} network='github'/>
            </div>
            <p>|</p>
            <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
            <SocialIcon style={open ? style.icon : style.iconClose} network='linkedin' />
            </div>
          </div>
        </div>
        <div className='mx-3 pt-5 flex flex-row justify-evenly items-center text-sm'>
          {!user &&
            <>
              <Link href='/login'>
                Login
              </Link>
              <Link href='/signup'>
                Signup
              </Link>
            </>
          }
          {user &&
          <>
            <Link href='/profile'>
              Profile
            </Link>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
          }
        </div>
      </div>
    </aside>
  );
}

export default SidenavMobile;