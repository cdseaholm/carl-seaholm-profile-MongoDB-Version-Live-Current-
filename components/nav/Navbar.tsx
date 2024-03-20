'use client'

import { SocialIcon } from 'react-social-icons';
import openInNewTab from '../listeners/OpenInNewTab';
import SidenavPage from './SideNav';
import useMediaQuery from '../listeners/WidthSettings';
import { usePathname } from 'next/navigation';


const NavBar = () => {
    const pathName = usePathname();
    const isBreakpoint = useMediaQuery(768);
    const iconStyle = {
      height: 30,
      width: 30,
      margin: 5,
    }
    return (
        <div className={`flex ${isBreakpoint ? 'justify-start' : 'justify-between'}`}>
          
          <SidenavPage/>
          
            {!isBreakpoint && pathName !== '/' && 
              <div className='flex items-center justify-end ml-5 mt-5 px-6 pt-2'>
                <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
                  <SocialIcon style={iconStyle} network='github'/>
                </div>
                <p>|</p>
                <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
                  <SocialIcon style={iconStyle} network='linkedin' />
                </div>
              </div>
            }
        </div>
    )
}

export default NavBar;