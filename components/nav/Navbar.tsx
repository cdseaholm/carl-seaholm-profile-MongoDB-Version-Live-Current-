'use client'

import SideNavHeader from '@/components/nav/header/header';
import { usePathname } from 'next/navigation';


const NavBar = () => {
    const pathName = usePathname();

    return (
        <div className={`flex flex-row h-24 items-center w-full px-5`} style={{border: 'box-border'}}>
          {pathName !== 'demo' &&
          <SideNavHeader/>
          }
        </div>
    )
}

export default NavBar;