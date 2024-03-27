import React from 'react';

export function DropdownPage({ menuStyle, dropdownStyle, itemsToFilter, onSelect, contextName}: { menuStyle: string; dropdownStyle: string; itemsToFilter: Array<any>; onSelect: (item: string) => void; contextName: string }) {
  const [item, setItem] = React.useState('');
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const setChoosen = (item: string) => {
    setItem(item);
    onSelect(item);
    setShow(false);
  };
  
  const toggle = React.useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

  // close dropdown when you click outside
  React.useEffect(() => {
    const handleOutsideClick = (event: {target: any}) => {
      if (!ref.current || !ref.current.contains(event.target as HTMLDivElement)) {
        if (!show) return;
        toggle();
      }
    };
    window.addEventListener('mouseup', handleOutsideClick);
    return () => window.removeEventListener('mouseup', handleOutsideClick);
  }, [show, ref, toggle]);


  return (
    <Dropdown toggle={toggle}>
      <DropdownToggle> 
      <span className={`${dropdownStyle} ${show == true ? 'bg-green-500/20' : 'bg-green-500/0'}`}>
        {contextName}
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
      </DropdownToggle>
      {show &&
      <DropdownMenu id={'menupanel'} menuStyle={menuStyle} toggle={toggle} ref={ref}>
        {itemsToFilter.map((item, index) => (
          <div ref={ref} key={index} onClick={() => setChoosen(item)} className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
            {item}
          </div>
        ))}
      </DropdownMenu>
      }
    </Dropdown>
  );
};

/* Logic*/

function Dropdown({ children, toggle }: { children: React.ReactNode; toggle: () => void;}) {

  return (
    <button
      onClick={toggle}
      className="focus:outline-none z-30"
      type="button"
      id="options-menu"
      aria-expanded="true"
      aria-haspopup="true"
    >
      {children}
    </button>
  );
}

function DropdownToggle({ children }: { children: React.ReactNode;}) {
  return <>{children}</>
}

function DropdownMenu({ children, menuStyle, ref }: { children: React.ReactNode; id: string; menuStyle: string; toggle: () => void; ref: React.RefObject<HTMLDivElement>;}) {

  return (
        <div
          ref={ref}
          className={menuStyle}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {children}
        </div>
  );
}