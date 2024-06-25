'use client'

import SideNavHeader from '@/components/nav/header/header';
import { usePathname } from 'next/navigation';


const NavBar = () => {
    const pathName = usePathname();

    return (
        <header className={`flex flex-row items-center w-full px-5 py-3`} style={{border: 'box-border'}}>
          {pathName !== 'demo' &&
          <SideNavHeader/>
          }
        </header>
    )
}

export default NavBar;