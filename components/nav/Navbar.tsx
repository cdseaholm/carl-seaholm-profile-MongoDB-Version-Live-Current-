'use client'

import SidenavPage from './SideNav';
import useMediaQuery from '../listeners/WidthSettings';
import { usePathname } from 'next/navigation';
import SidenavMobile from './SideNavMobile';


const NavBar = () => {
    const pathName = usePathname();
    const isBreakpoint = useMediaQuery(768);
    return (
        <div className={`flex flex-row h-24 items-center w-full px-10`} style={{height: '8vh'}}>
          {!isBreakpoint && pathName !== 'demo' &&
          <SidenavPage/>
          }
          
          {isBreakpoint && pathName !== 'demo' &&
          <SidenavMobile/>
          }

        </div>
    )
}

export default NavBar;