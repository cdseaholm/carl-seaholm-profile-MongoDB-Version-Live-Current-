'use client'

import React from "react";
import SocialButton from "@/components/buttons/socialButton";
import { FiMenu } from "react-icons/fi";
import { useWindowSizes } from "@/context/width-height-store";
import { useDisclosure } from "@mantine/hooks";
import NavDrawer from "../drawer/drawer";
import { FormatRouteName } from "@/lib/routes/route";


const Header = ({ pathname }: { pathname: string }) => {

  const isBreakpoint = useWindowSizes().width < 768;
  const [opened, { open, close }] = useDisclosure(false);
  const pageSelected = FormatRouteName(pathname);
  const toggleMenu = () => {
    opened ? close() : open();
  };

  return (
    <>
      {pathname !== '/' &&
        <div className={`flex flex-row ${isBreakpoint ? 'justify-start' : 'justify-between'} items-center w-full`}>
          {isBreakpoint &&
            <div className={`flex flex-row items-center space-x-3`}>
              <button
                type='button'
                aria-disabled={opened}
                disabled={opened}
                onClick={toggleMenu}
                className={`text-black text-sm md:text-base font-medium ${opened ? 'text-transparent' : 'text-black'}`}
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
                  aria-disabled={opened}
                  disabled={opened}
                  onClick={toggleMenu}
                  className={`text-black text-sm md:text-base font-medium ${opened ? 'text-transparent' : 'text-black'}`}
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

          <NavDrawer open={opened} toggleMenu={toggleMenu}/>
        </div>
      }
    </>
  );
};


export default Header;