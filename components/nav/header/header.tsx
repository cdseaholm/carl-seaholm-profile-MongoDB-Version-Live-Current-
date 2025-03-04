'use client'

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import Sidenav from "../sideNav/SideNav";
import { SideMenuAccordian } from "../../dropdowns/SideMenuAccordian";
import SocialButton from "@/components/buttons/socialButton";
import { useStateStore } from "@/context/stateStore";
import { FiMenu } from "react-icons/fi";


const SideNavHeader = () => {

  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768;
  const [open, setOpen] = useState(false);
  const [pageSelected, setPageSelected] = useState('');
  const pathname = usePathname();
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (pathname === '/dashboard') {
      setPageSelected('Dashboard');
    } else if (pathname === '/blog') {
      setPageSelected('Blog');
    } else if (pathname === '/projects') {
      setPageSelected('Projects');
    } else if (pathname === '/services') {
      setPageSelected('Services');
    } else if (pathname === '/about') {
      setPageSelected('About');
    } else if (pathname === '/about/professional') {
      setPageSelected('Professional')
    }  else if (pathname === '/about/personal') {
      setPageSelected('Personal')
    }  else if (pathname === '/recipes') {
      setPageSelected('Recipe Ratings')
    }
  }, [pathname]);

  return (
    <>
      {pathname !== '/' &&
        <div className={`flex flex-row ${isBreakpoint ? 'justify-start' : 'justify-between'} items-center w-full`}>
          {isBreakpoint &&
            <div className={`flex flex-row items-center space-x-3`}>
              <button
                type='button'
                aria-disabled={open}
                disabled={open}
                onClick={toggle}
                className={`text-black text-sm md:text-base font-medium ${open ? 'text-transparent' : 'text-black'}`}
              >
                <FiMenu size={20} />
              </button>
              <p>
                {`-`}
              </p>
              <p>
                {pageSelected}
              </p>
            </div>
          }
          {!isBreakpoint &&
            <>
              <div className={`flex flex-row items-center space-x-3`}>
                <button
                  type='button'
                  aria-disabled={open}
                  disabled={open}
                  onClick={toggle}
                  className={`text-black text-sm md:text-base font-medium ${open ? 'text-transparent' : 'text-black'}`}
                >
                  <FiMenu size={25} />
                </button>
                <p>
                  {`-`}
                </p>
                <p>
                  {pageSelected}
                </p>
              </div>
              <div className='flex items-center'>
                <SocialButton networkName='github' parent={true} />
                <p className='mx-3'>|</p>
                <SocialButton networkName='linkedin' parent={true} />
              </div>
            </>
          }

          <Sidenav open={open} toggle={toggle}>
            {open ? (
              <SideMenuAccordian toggle={toggle} />
            ) : null}
          </Sidenav>
        </div>
      }
    </>
  );
};


export default SideNavHeader;