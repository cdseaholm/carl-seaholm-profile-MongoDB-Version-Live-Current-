import { ActualUser } from "@/types/user";
import { Hobby } from "@/types/hobby";
import { useState } from "react";
import React from "react";
import useMediaQuery from "@/components/listeners/WidthSettings";

const DashChild = ({user, categories, titles, hobbies}: {user: ActualUser | null; categories: string[]; titles: string[]; hobbies: Hobby[];}) => {

    const [item, setItem] = useState('');
    const [open, setOpen] = useState(false);
    const divRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const isBreakpoint = useMediaQuery(768);
    

    React.useEffect(() => {
        const handleOutsideClick = (event: { target: any; }) => {
          if ((!dropdownRef.current || !dropdownRef.current.contains(event.target as HTMLDivElement)) && 
              (!divRef.current || !divRef.current.contains(event.target as HTMLElement))) {
              if (open) {
                  setOpen(false);
              }
          }
      };
        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [setOpen, divRef, dropdownRef, open]);

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className={`flex flex-row sticky top-0 z-40 ${user && user.email === 'cdseaholm@gmail.com' ? 'justify-between' : 'justify-start'}`}>
                  <div className='flex flex-col'>
                    <div className="flex flex-row justify-center">
                        Filter: 
                    </div>
                    <div ref={divRef} className='flex flex-row justify-center w-full'>
                      <button id='dropButton' onClick={open ? () => setOpen(false) : () => setOpen(true)} className='cursor-pointer'>
                        <div className='relative flex z-40 flex text-black rounded text-sm'>
                          {item === '' ? 'No Filter Selected' : item}
                        </div>
                      </button>
                      <div className='flex items-center'>
                        <svg
                          className="h-4"
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
                      </div>
                      {open && 
                        <div ref={dropdownRef} className='absolute flex flex-col right-22 mt-5 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800/70 text-white shadow-lg w-32 cursor-pointer'>
                            {categories && titles &&
                                <>
                                    <div>
                                        Categories:
                                    </div>
                                    {categories.map((item, index) => (
                                        <div key={index} onClick={() => {
                                            setItem(item)
                                            setOpen(false)
                                        }} 
                                        className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                                            {item}
                                        </div>
                                    ))}
                                    <div>
                                        Titles:
                                    </div>
                                    {titles.map((item, index) => (
                                        <div key={index} onClick={() => {
                                            setItem(item)
                                            setOpen(false)
                                        }} 
                                        className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                                            {item}
                                        </div>
                                    ))}
                                </>
                            }
                            {hobbies.length === 0 &&
                                <div className='block px-4 py-2 text-sm text-white'>
                                    {'Empty'}
                                </div>
                            }
                        </div>
                    }
                    </div>
                  </div>
                  {user && user.email === 'cdseaholm@gmail.com' &&
                    <>
                        {isBreakpoint &&
                            <div className="flex flex-row justify-end cursor-pointer text-sm">
                                +
                            </div>
                        }
                        {!isBreakpoint &&
                            <div className="flex flex-row justify-end cursor-pointer text-sm">
                                + Add New Tracker
                            </div>
                        }
                    </>
                  }
                </div>
                  
                  <div>
                    {hobbies.map((hobby, index) => (
                      <div key={index} className="flex flex-row justify-between">
                        <div>{hobby.title}</div>
                        <div>{hobby.category}</div>
                      </div>
                    ))}
                </div>
              </div>
        </>
    )

};

export default DashChild;