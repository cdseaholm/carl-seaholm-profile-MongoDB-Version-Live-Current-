'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HamburgerMenu = () => {
  const [menuState, setMenuState] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => {
    setMenuState(false);
  };

  return (
    <nav className="relative flex justify-center flex-wrap p-3 space-x-4">
        <div className='absolute left-5 '>
            Carl Seaholm
        </div>
      <div onClick={() => setMenuState(!menuState)}>Menu</div>
      <div className={`absolute w-30 top-10 border-1 border-slate-700 ${menuState ? 'block' : 'hidden'}`} style={{background: 'white'}}>
      {menuState && 
            [
                ["Home", "/"],
                ["Blog", "/blog"],
                ["Projects", "/projects"],
                ["Services", "/services"],
            ].map(([name, route], index) => (
                <div key={index} className="hover:scale-125">
                    <Link href={route} onClick={closeMenu} className={`px-10 rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-slate-900 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </div>
    </nav>
  );
};

export default HamburgerMenu;