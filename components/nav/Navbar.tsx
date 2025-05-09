'use client'

import SideNavHeader from '@/components/nav/header/header';

const NavBar = () => {

    return (
        <header className={`flex flex-row items-center w-full px-7 py-4`} style={{border: 'box-border'}}>
          <SideNavHeader/>
        </header>
    )
}

export default NavBar;