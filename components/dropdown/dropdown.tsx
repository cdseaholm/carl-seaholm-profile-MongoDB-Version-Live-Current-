'use client'

import React from 'react';

export const DropdownPage = ({itemsToFilter, nameTitle}: { itemsToFilter: Array<any>; setName: (name: string) => void; nameTitle: string;}) => {
  const [dropName, setDropName] = React.useState('Timeline');
  const { show, toggle } = useToggle();

  return (
    <Dropdown toggle={toggle} show={show}>
      <span className="absolute right-12 mr-2 z-10 flex justify-between w-40 bg-green-950/70 text-white rounded px-2 pl-3 py-2">
          <span>{nameTitle}</span>
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
      <DropdownMenu>
        {itemsToFilter.map((item, index) => (
          <a key={index} onClick={() => setDropName(item)} className="block px-4 py-2 text-sm text-white hover:bg-slate-800">
            {item}
          </a>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

/* Logic*/

function useToggle() {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const toggle = React.useCallback(() => {
    setShow((prevState) => !prevState)
  }, []);

  // close dropdown when you click outside
  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      if (show) {
        toggle();
      }
    };
    window.addEventListener('mouseup', handleOutsideClick);
    return () => window.removeEventListener('mouseup', handleOutsideClick);
  }, [show, ref, toggle]);

  // close dropdown when you click on "ESC" key
  React.useEffect(() => {
    const handleEscape = (event: { key: string; }) => {
      if (!show) return;

      if (event.key === 'Escape') {
        setShow(false);
      }
    };
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);

  return {
    show,
    toggle,
    ref,
  };
}

const style = {
  menu: `absolute right-4 z-30 py-2 px-1 text-left border border-gray-300 rounded-sm mt-9 mb-0 bg-clip-padding bg-slate-800/70 text-white shadow-lg w-40 cursor-pointer`,
};

function Dropdown({ children, show, toggle }: { children: React.ReactNode; show: boolean; toggle: () => void; }) {

  const dropdownToggle = React.Children.toArray(children)[0];
  const dropdownMenu = React.Children.toArray(children)[1];
  

  return (
    <button
      className="focus:outline-none z-30"
      onClick={toggle}
      type="button"
      id="options-menu"
      aria-expanded="true"
      aria-haspopup="true"
    >
      {dropdownToggle}
      {show && <>{dropdownMenu}</>}
    </button>
  );
}

function DropdownToggle({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-30">
      <div
        className={style.menu}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
}