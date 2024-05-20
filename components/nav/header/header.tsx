
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import React from "react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import Sidenav from "../sideNav/SideNav";
import { SideMenuAccordian } from "../../dropdowns/SideMenuAccordian";
import SocialButton from "@/components/buttons/socialButton";
import Image from 'next/image'


const SideNavHeader = () => {
    const isBreakpoint = useMediaQuery(768);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const toggle = () => {
      setOpen((prevState) => !prevState);
    };
    const [isHovered, setIsHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    
  
    const imageClick = useCallback(() => {
      setIsHovered(prevHovered => !prevHovered);
      setClicked(prevClicked => !prevClicked);
    }, []);
  
    const imageRef = React.useRef<HTMLDivElement>(null);

    const style = {
      profilepicture: {
        large: `absolute z-40 top-0 right-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
        small: `absolute z-40 top-0 right-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
      },
    };
  
    React.useEffect(() => {
      const handleOutsideClick = (event: { target: any; }) => {
        if (!imageRef.current || !imageRef.current.contains(event.target as HTMLDivElement)) {
          if (!clicked) return;
          imageClick();
        }
      };
      window.addEventListener('mousedown', handleOutsideClick);
      return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [clicked, isHovered, imageRef, imageClick]);
  
    return (
      <>
        {pathname !== '/'  && pathname !== '/demo_303' &&
        <div className={`flex flex-row ${isBreakpoint ? 'justify-start' : 'justify-between'} items-center pb-2 w-full`}>
        {isBreakpoint &&
        <>
            <button 
              type='button'
              aria-disabled={open}
              disabled={open}
              onClick={toggle}
              className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`}
            >
              Menu
            </button>
            <div className={`mx-5 my-1 ${open ? 'text-transparent' : 'text-black'}`}>
              |
            </div>
            <div>
              <Link className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`} href='/'>
                Home
              </Link>
            </div>
          {pathname === '/about/professional' &&
            <div ref={imageRef} className={`mt-3 ml-5 ${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
              <Image
                onClick={imageClick}
                priority
                src="/images/carlseaholmimage.jpg"
                className={`z-30 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`}
                height={clicked ? 200 : 60}
                width={clicked ? 200 : 60}
                alt="Carl Seaholm Profile Photo"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          }
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
                className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`}
              >
                Menu
              </button>
              <>
              <div className={`mx-5 my-1 ${open ? 'text-transparent' : 'text-black'}`}>|</div>
              <div>
                <Link className={`text-black font-medium ${open ? 'text-transparent' : 'text-black'}`} href='/'>
                  Home
                </Link>
              </div>
              </>
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