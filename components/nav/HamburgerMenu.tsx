'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HamburgerMenu = () => {
  const [menuState, setMenuState] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => {
    setMenuState(false);
  };

  return (
    <nav className="flex justify-center">
      <div onClick={() => setMenuState(!menuState)}>Menu</div>
      <div className={`absolute
      m-5 w-30 space-y-2 top-10 border-1 border-slate-700 bg-transparent backdrop-blur-md ${menuState ? 'block' : 'hidden'} ${menuState ? 'cursor-pointer' : ''} z-10`}>
      {menuState && 
            [
                ["Home", "/"],
                ["Blog", "/blog"],
                ["Projects", "/projects"],
                ["Services", "/services"],
            ].map(([name, route], index) => (
                <div key={index} className="px-2 py-1 text-xl cursor-pointer">
                    <Link onClick={closeMenu} href={route} className={`px-10 rounded-lg px-3 py-5 text-slate-900 font-small hover:text-slate-900 hover:scale-125 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </div>
    </nav>
  );
};

export default HamburgerMenu;