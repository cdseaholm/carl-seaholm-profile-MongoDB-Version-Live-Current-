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
    <nav className="flex justify-center">
      <div onClick={() => setMenuState(!menuState)}>Menu</div>
      <div className={`absolute w-30 top-10 border-1 border-slate-700 bg-black ${menuState ? 'block' : 'hidden'}`}>
      {menuState && 
            [
                ["Home", "/"],
                ["Blog", "/blog"],
                ["Projects", "/projects"],
                ["Services", "/services"],
            ].map(([name, route], index) => (
                <div key={index} className="hover:scale-125">
                    <Link href={route} className={`px-10 rounded-lg px-3 py-2 text-slate-200 font-medium hover:text-slate-900 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </div>
    </nav>
  );
};

export default HamburgerMenu;