import React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import openInNewTab from '../listeners/OpenInNewTab';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';


export const SideMenuAccordian = ({ toggle }: { toggle: () => void; }) => {

  const pathname = usePathname();
  var defaultPanel = "";
  if (pathname === "projects") {
    defaultPanel = "panel-1";
  } else if (pathname === "services") {
    defaultPanel = "panel-2";
  } else if (pathname === "about") {
    defaultPanel = "panel-3";
  } else {
    defaultPanel = "";
  }

  const basicTextClass = `flex flex-row justify-start items-center w-full md:w-[90%] lg:w-4/5 block text-slate-200 hover:text-slate-400 text-sm sm:text-base px-4 sm:px-8 rounded-lg cursor-pointer`;
  const subTextClass = `flex flex-row cursor-pointer justify-center items-center text-slate-200 w-full h-content text-sm sm:text-base py-2 px-4 sm:px-8 hover:text-slate-400 my-2`

  return (
    <div className='flex flex-col justify-between h-content w-full items-center border-b border-gray-200/20 py-6 space-y-12'>
      <Link onClick={toggle} href={"/dashboard"} className={`${pathname === "/dashboard" ? "underline" : ""} ${basicTextClass}`}>
        Dashboard
      </Link>
      <Link onClick={toggle} href={"/blog"} className={`${pathname === "/blog" ? "underline" : ""} ${basicTextClass}`}>
        Blog
      </Link>
      <Accordion defaultPanel={defaultPanel}>
        {/**
         * <AccordionItem toggle="panel-1" className="text-slate-200 hover:text-slate-400 text-xs px-10 rounded-lg">
          Projects
        </AccordionItem>
        <AccordionPanel id="panel-1">
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={""} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/projects/npapps" ? "underline" : ""}`}>
            - New Progress Applications
          </Link>
        </div>
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/projects/npwebapps"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/projects/npwebapps" ? "underline" : ""}`}>
            - Web Applications
          </Link>
        </div>
        <div className="px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/projects/writing"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/projects/writing" ? "underline" : ""}`}>
            - Writing Projects
          </Link>
        </div>
        </AccordionPanel>
         */}
        <div className='flex flex-col justify-center items-center w-full h-content'>
          <AccordionItem toggle="panel-2">
            Services
          </AccordionItem>
          <AccordionPanel id="panel-2">
            <Link onClick={() => openInNewTab('https://www.newprogressco.com/webdevelopment')} href={''} className={subTextClass}>
              Click here to take you to the New Progress Co. website
            </Link>
          </AccordionPanel>
        </div>
        {/*
        <AccordionPanel id="panel-2">
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/services/bugs"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/services/bugs" ? "underline" : ""}`}>
            - Bug Fixes
          </Link>
        </div>
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/services/fullsite"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/services/fullsite" ? "underline" : ""}`}>
            - Single Page Creation
          </Link>
        </div>
        <div className="px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/services/singlepage"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/services/singlepage" ? "underline" : ""}`}>
            - Full Site/App Creation
          </Link>
        </div>
        </AccordionPanel>
        */}
        <div className='flex flex-col justify-center items-center w-full h-content'>
          <AccordionItem toggle="panel-3">
            About
          </AccordionItem>
          <AccordionPanel id="panel-3">
            {/**<div className="mb-4 px-2 py-1 cursor-pointer">
              <Link onClick={toggle} href={'' "/about/overview"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/about/overview" ? "underline" : ""}`}>
              - Overview - Soon
              </Link>
            </div> */}
            <Link onClick={toggle} href={"/about/professional"} className={`${subTextClass} ${pathname === "/about/professional" ? "underline" : ""}`}>
              Professional
            </Link>
            <Link onClick={toggle} href={"/about/personal"} className={`${subTextClass} ${pathname === "/about/personal" ? "underline" : ""}`}>
              Personal
            </Link>
            {/** Removing until model is sorted out
             * <div className="mb-4 px-2 py-1 cursor-pointer">
              <Link onClick={toggle} href={"/recipes"} className={`px-10 rounded-lg text-slate-200 text-xs hover:text-slate-400 ${pathname === "/recipes" ? "underline" : ""}`}>
              - Recipe Ratings
              </Link>
            </div> */}
          </AccordionPanel>
        </div>
      </Accordion>
      <Link onClick={toggle} href={"/contact"} className={`${pathname === "/contact" ? "underline" : ""} ${basicTextClass}`}>
        Contact
      </Link>
    </div>
  );
};

/* Logic */

const Context = React.createContext({});

function Accordion({ children, defaultPanel }: { children: React.ReactNode; defaultPanel?: string }) {
  const [selected, setSelected] = React.useState(defaultPanel || '');

  const toggleItem = React.useCallback(
    (id: string) => () => {
      setSelected((prevState) => (prevState !== id ? id : ''));
    },
    [],
  );

  return (
    <Context.Provider value={{ selected, toggleItem }}>
      {children}
    </Context.Provider>
  );
}

const useAccordion = () => React.useContext(Context);

const style = {
  item: `flex flex-row justify-between items-center w-full md:w-[90%] lg:w-4/5 text-sm sm:text-base px-4 sm:px-8 h-full text-slate-200 hover:text-slate-400 rounded-lg`,
  panel: `overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-gray-600 flex flex-col w-full bg-slate-400/40`,
};

function AccordionItem({ toggle, children }: { toggle: string; children: React.ReactNode }) {
  const { selected, toggleItem } = useAccordion() as { selected: string; toggleItem: (id: string) => () => void };
  return (
    <button
      role="button"
      onClick={toggleItem(toggle)}
      className={`${style.item}`}
    >
      <p>{children}</p>
      {selected === toggle ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
    </button>
  );
}

function AccordionPanel({ children, id }: { children: React.ReactNode; id: string }) {
  const { selected } = useAccordion() as { selected: string };
  const ref = React.useRef<HTMLDivElement>(null);
  const inlineStyle =
    selected === id ? { height: ref.current?.scrollHeight } : { height: 0 };

  return (
    <div ref={ref} id={id} className={`${style.panel} ${selected === id ? 'my-2' : ''}`} style={inlineStyle}>
      {children}
    </div>
  );
}