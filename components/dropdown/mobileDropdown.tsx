import { set } from 'date-fns';
import React from 'react';

export const MobileDropDown = ({ menuStyle, dropdownStyle, itemsToFilter, setContextName, contextName}: { menuStyle: string; dropdownStyle: string; itemsToFilter: Array<any>; setContextName: (contextName: string) => void; contextName: string }) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const toggle = React.useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

  const setName = (name: string) => {
    setContextName(name);
    setShow(false);
  }

  // close dropdown when you click outside
  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!ref.current || !ref.current.contains(event.target as HTMLDivElement)) {
        if (!show) return;
        toggle();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [toggle, show, ref]);

  return (
    <Dropdown toggle={toggle}>
      <span className={`${dropdownStyle} ${show == true ? 'bg-green-500/20' : 'bg-green-500/0'}`}>
          <div>{contextName}</div>
          <svg
              className="h-5 w-1/8 justify-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
          >
              <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
              />
          </svg>
      </span>
      {show &&
      <DropdownMenu id={'menupanel'} menuStyle={menuStyle}>
        {itemsToFilter.map((item, index) => (
            <div key={index}>
                <div onClick={() => {
                    setName(item);
                }} className="block px-4 py-2 text-xs text-white hover:bg-slate-800">
                    {item}
                </div>
            </div>
        ))}
      </DropdownMenu>
      }
    </Dropdown>
  );
};

/* Logic*/

const Context = React.createContext({});

function Dropdown({ children, toggle }: { children: React.ReactNode; toggle: () => void;}) {

  const dropdownToggle = React.Children.toArray(children)[0];
  const dropdownMenu = React.Children.toArray(children)[1];

  return (
    <Context.Provider value={{ toggle }}>
    <button
      onClick={() => toggle()}
      type="button"
      id="options-menu"
      aria-expanded="true"
      aria-haspopup="true"
    >
      {dropdownToggle}
      <>{dropdownMenu}</>
    </button>
    </Context.Provider>
  );
}

function DropdownMenu({ children, id, menuStyle,  }: { children: React.ReactNode; id: string; menuStyle: string;}) {

  return (
    <div>
      <div
        id={id}
        className={menuStyle}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
}