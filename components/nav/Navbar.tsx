'use client'

import { useState, useCallback, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';
import FullMenu from './FullMenu';
import Image from 'next/image';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: { matches: any; }) => {
        if (e.matches) {
          setTargetReached(true);
        } else {
          setTargetReached(false);
        }
      }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);if (media.addEventListener) {
            media.addEventListener("change", updateTarget);
          } else {
            // compatibility for browser that dont have addEventListener
            media.addEventListener("change", updateTarget);
          }
          // Check on mount (callback is not called until a change occurs)
          if (media.matches) {
            setTargetReached(true);
          }
          if (media.removeEventListener) {
            return () => media.removeEventListener('change', updateTarget);
          } else {
            // compatibility for browser that dont have removeEventListener
            return () => media.removeEventListener("change", updateTarget);
          }
        }, []);

    return targetReached;

}

const NavBar = () => {
    const isBreakpoint = useMediaQuery(768);
    return (
        <div className='justify-between flex p-3 space-x-4'>
        <div className='pr-5'>
            Carl Seaholm
        </div>
                <div>
                    <FullMenu/>
                </div>
        {/*
        
            {isBreakpoint ? (
                <div>
                    <HamburgerMenu />
                </div>
            ) : (
                <div>
                    <FullMenu/>
                </div>
            )}
          
          <Image
            rel="icon"
            height={10}
            width={10}
            src="/images/githubicon.png"
            className='w-10 h-10 full-rounded'
            alt="Github Icon"
          />
          */}
          <div className='flex flex-row items-start'>
            <p className='cursor-pointer pr-2 text-1xl font-bold' onClick={() => openInNewTab(`http://www.github.com/cdseaholm`)}>
              Github
            </p>
            <p>|</p>
            <p className='cursor-pointer pl-2 text-1x1 font-bold' onClick={() => openInNewTab(`https://www.linkedin.com/in/carlseaholm/`)}>
              LinkedIn
            </p>
          </div>
        </div>
    )
}

export default NavBar;