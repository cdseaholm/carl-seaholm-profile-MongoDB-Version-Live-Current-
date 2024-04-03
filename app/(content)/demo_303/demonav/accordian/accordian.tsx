import React from 'react';
import Link from 'next/link';

export const SideMenuAccordian = ({ toggle }: { toggle: () => void; }) => {
  const classesOpenMats = ['Free Class', 'Introduction to Jiu Jitsu (FREE)', 'Beginner Jiu Jitsu (Level 1)', 'Intermediate Jiu Jitsu (Level 2)', 'Advanced Jiu Jitsu', 'NOGI Jiu Jitsu', 'Randori', 'Open Mat', 'Little Heroes Jiu Jitsu (4-6)', 'Jids Jiu Jitsu (7/12)', 'Teens Jiu Jitsu Classes (13-17)', 'Family Class Jiu Jitsu', 'Parents Jiu Jitsu Class', 'Wrestling', 'Kickboxing']

  const news = ['Belt Promotions', 'More News']

  const specialOffer = ['Grand Opening Special', 'Arvada Jiu Jitsu Special', 'Boulder Jiu Jitsu Special', 'Broomfield Jiu Jitsu Special', 'Superior Jiu Jitsu Special', 'Westminster Jiu Jitsu Special', 'Denver Jiu Jitsu Special', 'Northglenn Jiu Jitsu Special', 'Thornton Jiu Jitsu Special', '13 Year Anniverary Special', 'College Student Special']

  const about = ['Testminonials', 'More About Us']

  const more = ['Contact Us', 'Shop', 'Forum']

  return (
    <>
      <Accordion defaultPanel={''}>
        <AccordionItem toggle="panel-1" className="text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5">
          Classes and Open Mats
        </AccordionItem>
        <AccordionPanel id="panel-1">
          {classesOpenMats.map((item, index) => (
            <div key={index} className="mb-4 px-2 py-1 cursor-pointer">
              <Link onClick={toggle} href={''} className={`px-10 rounded-lg px-3 py-5 text-black text-sm hover:text-slate-200`}>
                - {item}
              </Link>
            </div>
          ))}
        </AccordionPanel>
        <AccordionItem toggle="panel-2" className="text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5">
          News
        </AccordionItem>
        <AccordionPanel id="panel-2">
        {news.map((item, index) => (
            <div key={index} className="mb-4 px-2 py-1 cursor-pointer">
              <Link onClick={toggle} href={''} className={`px-10 rounded-lg px-3 py-5 text-black text-sm hover:text-slate-200`}>
                - {item}
              </Link>
            </div>
          ))}
        </AccordionPanel>
        <AccordionItem toggle="panel-3" className="text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5">
          Special Offers
        </AccordionItem>
        <AccordionPanel id={`panel-3`}>
        {specialOffer.map((item, index) => (
            <div key={index} className="mb-4 px-2 py-1 cursor-pointer">
              <Link onClick={toggle} href={''} className={`px-10 rounded-lg px-3 py-5 text-black text-sm hover:text-slate-200`}>
                - {item}
              </Link>
            </div>
          
        ))}
        </AccordionPanel>
        <div className="block text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5 cursor-pointer">
          <Link onClick={toggle} href={""}>
            MBUNA
          </Link>
        </div>
        <div className="block text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5 cursor-pointer">
          <Link onClick={toggle} href={""}>
            Blog
          </Link>
        </div>
        <AccordionItem toggle="panel-4" className="text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5">
          About
        </AccordionItem>
        <AccordionPanel id="panel-4">
          {about.map((item, index) => (
            <div key={index} className="mb-4 px-2 py-1 cursor-pointer">
              <Link onClick={toggle} href={''} className={`px-10 rounded-lg px-3 py-5 text-black text-sm hover:text-slate-200`}>
                - {item}
              </Link>
            </div>
          ))}
          <div className="block text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5 cursor-pointer">
            <Link onClick={toggle} href={""}>
              Community
            </Link>
          </div>
          <div className="block text-black hover:text-slate-200 text-md px-10 rounded-lg px-3 py-5 cursor-pointer">
            <Link onClick={toggle} href={""}>
              303 Team
            </Link>
          </div>
        </AccordionPanel>
        <AccordionPanel id="panel-3">
          {more.map((item, index) => (
            <div key={index} className="mb-4 px-2 py-1 cursor-pointer">
              <Link onClick={toggle} href={''} className={`px-10 rounded-lg px-3 py-5 text-black text-sm hover:text-slate-200`}>
                - {item}
              </Link>
            </div>
          ))}
        </AccordionPanel>
      </Accordion>
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
    fill="black"
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
    fill="black"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1 h-4"
  >
    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>
);