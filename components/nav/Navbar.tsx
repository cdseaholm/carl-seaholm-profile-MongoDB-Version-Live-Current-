'use client'

import { useState, useCallback, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';
import FullMenu from './FullMenu';

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
        <div>
            {isBreakpoint ? (
                <div>
                    <HamburgerMenu />
                </div>
            ) : (
                <div>
                    <FullMenu/>
                </div>
            )}
        </div>
    )
}

export default NavBar;