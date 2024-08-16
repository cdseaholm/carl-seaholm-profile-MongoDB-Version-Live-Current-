'use client'

import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import Sidenav from "../sideNav/SideNav";
import { SideMenuAccordian } from "../../dropdowns/SideMenuAccordian";
import SocialButton from "@/components/buttons/socialButton";
import { FiMenu } from "react-icons/fi";
import { useStateStore } from "@/context/stateStore";


const SideNavHeader = () => {

  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      {pathname !== '/' &&
        <div className={`flex flex-row ${isBreakpoint ? 'justify-start' : 'justify-between'} items-center w-full`}>
          {isBreakpoint &&
            <>
              <button
                type='button'
                aria-disabled={open}
                disabled={open}
                onClick={toggle}
                className={`text-black text-sm md:text-base font-medium ${open ? 'text-transparent' : 'text-black'}`}
              >
                <FiMenu size={20} />
              </button>
            </>
          }
          {!isBreakpoint &&
            <>
              <div className={`flex flex-row items-center`}>
                <button
                  type='button'
                  aria-disabled={open}
                  disabled={open}
                  onClick={toggle}
                  className={`text-black text-sm md:text-base font-medium ${open ? 'text-transparent' : 'text-black'}`}
                >
                  <FiMenu size={25} />
                </button>
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