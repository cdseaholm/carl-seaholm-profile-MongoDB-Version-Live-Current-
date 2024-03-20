import React from 'react';

export const DropdownPage = ({itemsToFilter, setName, name, filterNoTrack, toTrackCategories}: { itemsToFilter: Array<any>; setName: (setName: string) => void; name: string; filterNoTrack: boolean; toTrackCategories: Array<any>;}) => {
    const { show, toggle } = useToggle();
    var passingItems = itemsToFilter.map((item) => item.name);
    var passingCategories = toTrackCategories.map((item) => item.name);
    const itemsToPass = filterNoTrack ? passingCategories : passingItems;

   
    return (
      <Dropdown show={show} toggle={toggle}>
        <span className="flex justify-between w-40 bg-green-950/70 text-white rounded px-2 pl-3 py-2">
        <div className="pr-2 text-white text-sm w-6/8 align-">{name}</div>
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
            <DropdownItems setName={setName}>
                {itemsToPass}
            </DropdownItems>
        </DropdownMenu>
      </Dropdown>
    );
};

/* Logic*/

function useToggle() {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const toggle = React.useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

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
  menu: `z-30 py-2 px-1 text-left border border-gray-300 rounded-sm mt-0 mb-0 bg-clip-padding bg-slate-800/70 text-white shadow-lg w-40 cursor-pointer`,
};

function Dropdown({ children, show, toggle }: { children: React.ReactNode; show: boolean; toggle: () => void }) {
    const childrenArray = React.Children.toArray(children);
    const dropdownToggle = childrenArray[0] as React.ReactNode;
    const dropdownMenu = React.cloneElement(childrenArray[1] as React.ReactElement, { show, toggle });
  
    return (
      <>
        <button
          className="focus:outline-none"
          onClick={toggle}
          type="button"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {dropdownToggle}
        </button>
        {show && <>{dropdownMenu}</>}
      </>
    );
  }

function DropdownMenu({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
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

function DropdownItems({ children, setName }: { children: React.ReactNode; setName: (child: string) => void; }) {
    return (
        <>
            {React.Children.map(children, (child, index) => (
                <div className='py-2 text-sm' key={index} onClick={() => { 
                    setName(child as string);
                }}>
                    {child}
                </div>
            ))}
        </>
    );
  }