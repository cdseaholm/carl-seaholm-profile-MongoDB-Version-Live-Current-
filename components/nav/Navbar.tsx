'use client'

import SideNavHeader from '@/components/nav/sideNav/header';
import { usePathname } from 'next/navigation';


const NavBar = () => {
    const pathName = usePathname();

    return (
        <div className={`flex flex-row h-24 items-center w-full px-10`} style={{height: '8vh'}}>
          {pathName !== 'demo' &&
          <SideNavHeader/>
          }
        </div>
    )
}

export default NavBar;