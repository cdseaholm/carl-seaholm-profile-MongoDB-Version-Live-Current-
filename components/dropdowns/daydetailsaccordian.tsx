'use client'

import { useStateStore } from '@/context/stateStore';
import React from 'react';

export const DayDetailsAccordian = ({title, categories, goals, descriptions, detailsIndex}: {title: string, categories: string[], goals: string[], descriptions: string[], detailsIndex: number}) => {

  return (
    <Accordion>
        <AccordionItem toggle={`panel-${detailsIndex}`}>
            <div className={`flex flex-row justify-between items-center font-semibold w-full text-sm`}>
                {title}
                <AccordionTitle />
            </div>
        </AccordionItem>
        <AccordionPanel id={`panel-${detailsIndex}`}>
            {categories.map((category, index) => (
                <p key={index} className='p-2'>
                    -{category}
                </p>
            ))}
            {goals.map((goal, index) => (
                <p key={index} className='p-2'>
                    -{goal}
                </p>
            ))}
            <p>Descriptions:</p>
            {descriptions.map((description, index) => (
                <p key={index} className='p-2'>
                    -{description}
                </p>
            ))}
        </AccordionPanel>
    </Accordion>
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

//custom hook to consume all accordion values
const useAccordion = () => React.useContext(Context);

function AccordionItem({ toggle, children, className }: { toggle: string; children: React.ReactNode; className?: string; }) {
    const { selected, toggleItem } = useAccordion() as { selected: string; toggleItem: (id: string) => () => void };
    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
    return (
        <>
      <div
        role="button"
        onClick={toggleItem(toggle)}
        className={`flex block focus:outline-none my-2 p-3 items-center justify-start ${selected ? 'border-b' : ''} ${className}`}
      >
        {children}
        <span className="float-right">
          {selected === toggle ? <AngleUpIcon /> : <AngleDownIcon />}
        </span>
      </div>
      <div className='flex items-center justify-center'>
        <div>
        </div>
        {isBreakpoint &&
          <div>
            <div />
          </div>
        }
      </div>
      </>
    );
  }
  
  function AccordionPanel({ children, id }: { children: React.ReactNode; id: string }) {
    const { selected } = useAccordion() as { selected: string };
    const ref = React.useRef<HTMLDivElement>(null);
    const inlineStyle =
      selected === id ? { height: ref.current?.scrollHeight } : { height: 0 };
  
    return (
      <div ref={ref} id={id} className={`overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-black bg-slate-300 rounded-md`} style={inlineStyle}>
        {children}
      </div>
    );
  }

const AccordionTitle = () => {
    const { selected } = useAccordion() as { selected: string };
    return (
        <div className='text-sm font-semibold pr-5'>
            {selected === `panel-1` ? 'Hide Details' : 'Show Details'}
        </div>
    );
};

const AngleUpIcon = () => (
    <svg
      fill="black"
      strokeWidth="0"
      viewBox="0 0 320 512"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4"
    >
      <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
    </svg>
  );

const AngleDownIcon = () => (
  <svg
    fill="black"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4"
  >
    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>
);