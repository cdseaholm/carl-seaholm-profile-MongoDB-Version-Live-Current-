import React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';


export const SideMenuAccordian = ({ toggle }: { toggle: () => void; }) => {
  const pathname  = usePathname();
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

  return (
    <>
      
      <div className="block text-slate-200 hover:text-slate-400 text-xs px-10 rounded-lg px-3 py-5 cursor-pointer">
          <Link onClick={toggle} href={"/dashboard"} className={`${pathname === "/dashboard" ? "underline" : ""}`}>
          Dashboard
        </Link>
      </div>
      <div className="block text-slate-200 hover:text-slate-400 text-xs px-10 rounded-lg px-3 py-5 cursor-pointer">
          <Link onClick={toggle} href={"/blog"} className={`${pathname === "/blog" ? "underline" : ""}`}>
          Blog
        </Link>
      </div>
      <Accordion defaultPanel={defaultPanel}>
        <AccordionItem toggle="panel-1" className="text-slate-200 hover:text-slate-400 text-xs px-10 rounded-lg px-3 py-5">
          Projects - Soon
        </AccordionItem>
        {/*
        <AccordionPanel id="panel-1">
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/projects/npapps"} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/projects/npapps" ? "underline" : ""}`}>
            - New Progress Applications
          </Link>
        </div>
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/projects/npwebapps"} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/projects/npwebapps" ? "underline" : ""}`}>
            - Web Applications
          </Link>
        </div>
        <div className="px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/projects/writing"} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/projects/writing" ? "underline" : ""}`}>
            - Writing Projects
          </Link>
        </div>
        </AccordionPanel>
        */}
        <AccordionItem toggle="panel-2" className="text-slate-200 hover:text-slate-400 text-xs px-10 rounded-lg px-3 py-5">
          Services - Soon
        </AccordionItem>
        {/*
        <AccordionPanel id="panel-2">
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/services/bugs"} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/services/bugs" ? "underline" : ""}`}>
            - Bug Fixes
          </Link>
        </div>
        <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/services/fullsite"} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/services/fullsite" ? "underline" : ""}`}>
            - Single Page Creation
          </Link>
        </div>
        <div className="px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/services/singlepage"} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/services/singlepage" ? "underline" : ""}`}>
            - Full Site/App Creation
          </Link>
        </div>
        </AccordionPanel>
        */}
        <AccordionItem toggle="panel-3" className="text-slate-200 hover:text-slate-400 text-xs px-10 rounded-lg px-3 py-5">
          About
        </AccordionItem>
        <AccordionPanel id="panel-3">
          <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={'' /* "/about/overview" */} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/about/overview" ? "underline" : ""}`}>
            - Overview - Soon
            </Link>
          </div>
          <div className="mb-4 px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={"/about/professional"} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/about/professional" ? "underline" : ""}`}>
            - Professional
            </Link>
          </div>
          <div className="px-2 py-1 cursor-pointer">
            <Link onClick={toggle} href={'' /* "/about/personal" */} className={`px-10 rounded-lg px-3 py-5 text-slate-200 text-xs hover:text-slate-400 ${pathname === "/about/personal" ? "underline" : ""}`}>
            - Personal - Soon
            </Link>
          </div>
        </AccordionPanel>
      </Accordion>
      <div className="block text-slate-200 hover:text-slate-400 text-xs px-10 rounded-lg px-3 py-5 cursor-pointer">
        <Link onClick={toggle} href={"/contact"} className={`${pathname === "/contact" ? "underline" : ""}`}>
          Contact
        </Link>
      </div>
    </>
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
  item: `block focus:outline-none`,
  panel: `overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-gray-600`,
};

function AccordionItem({ toggle, children, className }: { toggle: string; children: React.ReactNode; className?: string }) {
  const { selected, toggleItem } = useAccordion() as { selected: string; toggleItem: (id: string) => () => void };
  return (
    <div
      role="button"
      onClick={toggleItem(toggle)}
      className={`${style.item} ${className}`}
    >
      {children}
      <span className="float-right">
        {selected === toggle ? <AngleUpIcon /> : <AngleDownIcon />}
      </span>
    </div>
  );
}

function AccordionPanel({ children, id }: { children: React.ReactNode; id: string }) {
  const { selected } = useAccordion() as { selected: string };
  const ref = React.useRef<HTMLDivElement>(null);
  const inlineStyle =
    selected === id ? { height: ref.current?.scrollHeight } : { height: 0 };

  return (
    <div ref={ref} id={id} className={style.panel} style={inlineStyle}>
      {children}
    </div>
  );
}

const AngleUpIcon = () => (
  <svg
    fill="white"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1 h-4"
  >
    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
  </svg>
);

const AngleDownIcon = () => (
  <svg
    stroke="currentColor"
    fill="white"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1 h-4"
  >
    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>
);