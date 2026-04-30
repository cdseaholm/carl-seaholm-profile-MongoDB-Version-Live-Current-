import React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from '@mantine/core';
import { ChevronRightIcon } from '@heroicons/react/20/solid';


export const SideMenuAccordian = ({ toggleMenu }: { toggleMenu: () => void }) => {

  //const accordianWidth = width > 1024 ? '80%' : width > 640 ? '100%' : '90%';

  const pathname = usePathname();

  const itemManifest = [
    // {
    //   name: "Projects", toggle: "panel-1", subItems: [
    //     { name: "New Progress Applications", href: "/projects/npapps" },
    //     { name: "Web Applications", href: "/projects/npwebapps" },
    //     { name: "Writing Projects", href: "/projects/writing" },
    //   ]
    // },
    // {
    //   name: "Services", toggle: "panel-2", subItems: [
    //     { name: "Bug Fixes", href: "/services/bugs" },
    //     { name: "Single Page Creation", href: "/services/singlepage" },
    //     { name: "Full Site/App Creation", href: "/services/fullsite" },
    //   ]
    // },
    {
      name: "About", toggle: "panel-3", subItems: [
        { name: "Professional", href: "/about/professional" },
        { name: "Personal", href: "/about/personal" },
      ]
    },
  ]

  const basicTextClass = `flex flex-row justify-start items-center w-full md:w-[90%] lg:w-4/5 block text-slate-200 hover:text-slate-400 text-sm sm:text-base px-4 sm:px-8 rounded-md cursor-pointer text-center`;
  const subTextClass = `flex flex-row cursor-pointer justify-center items-center text-slate-200 w-full h-content text-sm sm:text-base py-2 px-4 sm:px-8 hover:text-slate-400 my-2`

  return (
    <div className='flex flex-col justify-center h-content w-full items-center space-y-8 md:space-y-12 py-4'>
      <Link onClick={toggleMenu} href={"/dashboard"} className={`${pathname === "/dashboard" ? "underline bg-white/10" : "bg-white/10 hover:bg-white/30"} ${basicTextClass} h-[3.5dvh]`}>
        <p className={`max-md:text-sm text-center w-full`}>Dashboard</p>
      </Link> 
      <Link onClick={toggleMenu} href={"/blog"} className={`${pathname === "/blog" ? "underline bg-white/10" : "bg-white/10 hover:bg-white/30"} ${basicTextClass} h-[3.5dvh]`}>
        <p className={`max-md:text-sm text-center w-full`}>Blog</p>
      </Link>
      {itemManifest.map((item, id) => (
        <Menu key={id} width={'100%'} transitionProps={{ transition: 'pop-top-left', duration: 150 }} withinPortal={true} position='right' zIndex={1000} closeOnItemClick={true}>
          <Menu.Target >
            <div className={`${pathname.includes(item.toggle.split("-")[1]) ? "underline bg-white/10" : "bg-white/10 hover:bg-white/30"} flex flex-row justify-center items-center w-full md:w-[90%] lg:w-4/5 block text-slate-200 hover:text-slate-400 text-sm sm:text-base pl-4 pr-2 sm:pl-8 sm:pr-4 rounded-md cursor-pointer text-center h-[3.5dvh]`}>
              <p className={`max-md:text-sm text-center w-full`}>{item.name}</p>
              <ChevronRightIcon width={22} />
            </div>
          </Menu.Target>
          <Menu.Dropdown className='bg-slate-400/40 border-slate-200/20 w-[50%] flex flex-col justify-start items-center py-2 rounded-md' w={'auto'} >
            {item.subItems.map((subItem, subId) => (
              <Menu.Item key={subId} onClick={toggleMenu} component={Link} href={subItem.href} className={`${pathname === subItem.href ? "underline bg-white/10" : "bg-white/10 hover:bg-white/30"} ${subTextClass}`} >
                {subItem.name}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      ))}
      {/* Removing until model is sorted out
        <div className="mb-4 px-2 py-1 cursor-pointer">
          <Link onClick={toggle} href={"/recipes"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/recipes" ? "underline bg-white/10" : "bg-white/10 hover:bg-white/30"}`}>
            - Recipe Ratings
          </Link>
        </div>
          </AccordionPanel>
        </div> */}
      <Link onClick={toggleMenu} href={"/contact"} className={`${pathname === "/contact" ? "underline bg-white/10" : "bg-white/10 hover:bg-white/30"} ${basicTextClass} h-[3.5dvh]`}>
        <p className={`max-md:text-sm text-center w-full`}>Contact</p>
      </Link>

    </div>
  );
};