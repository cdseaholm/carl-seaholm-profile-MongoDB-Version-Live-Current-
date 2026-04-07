'use client'

import Header from '@/components/nav/header/header';
import { usePathname } from 'next/navigation';

const NavBar = () => {

  const pathname = usePathname().toString();

  return (
    <header className={`flex flex-row items-center w-full px-7 py-4`} style={{ border: 'box-border' }}>
      <Header pathname={pathname} />
    </header>
  )
}

export default NavBar;