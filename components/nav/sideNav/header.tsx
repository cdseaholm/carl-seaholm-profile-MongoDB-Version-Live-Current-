import openInNewTab from "@/components/listeners/OpenInNewTab";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { SocialIcon } from "react-social-icons";
import { SideMenuAccordianMobile } from "../menuDrops/SideMenuAccordianMobile";
import React from "react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import Image from "next/image";
import Sidenav from "./SideNav";
import ModalLogin from "@/components/modals/auth/login/loginModal";


const SideNavHeader = () => {
    const isBreakpoint = useMediaQuery(768);
    const [open, setOpen] = useState(false); //make sure no dups
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
  
    const style = {
      profilepicture: {
        large: `absolute z-40 top-0 right-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
        small: `absolute z-40 top-0 right-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
      },
    };
  
    return (
      <>
        {pathname !== '/'  && pathname !== '/demo_303' &&
        <>
        {isBreakpoint &&
        <>
          <div className={`flex flex-row justify-start items-center`}>
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
        <div ref={imageRef} className={`mt-3 ml-5 ${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
        {pathname === '/about/professional' &&
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
        }
        </div>
        </>
        }
        {!isBreakpoint &&
          <div className="flex flex-row justify-between items-center w-full">
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
              <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
                <SocialIcon style={{height: 30, width: 30}} network='github'/>
              </div>
              <p className='mx-3'>|</p>
              <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
                <SocialIcon style={{height: 30, width: 30}} network='linkedin' />
              </div>
            </div>
          </div>
          }

        <Sidenav open={open} toggle={toggle}>
          {open ? (
              <SideMenuAccordianMobile toggle={toggle} />
              ) : null}
        </Sidenav>
        
        </>
        }

      </>
    );
  };

export default SideNavHeader;