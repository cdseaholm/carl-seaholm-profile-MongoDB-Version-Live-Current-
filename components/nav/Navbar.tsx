'use client'

import { useState, useCallback, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';
import FullMenu from './FullMenu';
import { SocialIcon } from 'react-social-icons';

const iconStyle = {
  height: 25,
  width: 25,
  margin: 5,
  alignContent: 'center',
  justifyContent: 'center',
}

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
            media.addEventListener("change", updateTarget);
          }
          if (media.matches) {
            setTargetReached(true);
          }
          if (media.removeEventListener) {
            return () => media.removeEventListener('change', updateTarget);
          } else {
            return () => media.removeEventListener("change", updateTarget);
          }
        }, []);

    return targetReached;

}

const NavBar = () => {
    const isBreakpoint = useMediaQuery(768);
    return (
        <div className='justify-between flex p-5 space-x-4 items-center'>
        <div className='pr-5'>
            Carl Seaholm
        </div>
        
            {isBreakpoint ? (
                <div>
                    <HamburgerMenu />
                </div>
            ) : (
                <div>
                    <FullMenu/>
                </div>
            )}
  
          <div className='flex flex-row items-center'>
            <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
              <SocialIcon style={iconStyle} network='github'/>
            </div>
            <p>|</p>
            <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
              <SocialIcon style={iconStyle} network='linkedin' />
            </div>
          </div>
        </div>
    )
}

export default NavBar;