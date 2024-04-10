import { useState } from "react";
import React from "react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import HobbiesArray from "@/components/pagecomponents/dashboard/shells/hobbies/hobbies";
import MainDashBoardShell from "./maindashboardshell";

const DashChildShell = () => {

    const [filterOpen, setFilterOpen] = useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const isBreakpoint = useMediaQuery(768);
    const { openAddModal, setOpenAddModal, filterItem, setFilterItem } = useHobbyContext();
    const hobbies = HobbiesArray;
    const categories = Array.from(new Set(hobbies.map((item) => item.category).flat()));
    const titles = Array.from(new Set(hobbies.map((item) => item.title).flat()));

    

    

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className='flex flex-row sticky top-0 z-20 justify-start'>
                  <div className='flex flex-col items-start'>
                    <div className="flex flex-row justify-center text-sm font-medium">
                        Filter: 
                    </div>

                    {/**Drop down filter button */}
                    <button id='dropButton' type="button" onClick={filterOpen ? () => setFilterOpen(false) : () => setFilterOpen(true)} className='cursor-pointer flex flex-row items-center justify-between hover:bg-gray-400 font-medium'>
                      <div className='relative z-20 w-full flex text-black rounded text-sm'>
                        {filterItem === '' ? 'No Filter' : filterItem}
                      </div>
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
                    </button>

                    {/**drop down filter menu */}
                    {filterOpen && 
                      <div ref={dropdownRef} className='absolute flex flex-col right-22 mt-10 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800/70 text-white shadow-lg w-36 cursor-pointer'>
                                <div className="divide-y divide-solid divide-white">
                                  <div>
                                    <div className="text-sm">
                                        Categories:
                                    </div>
                                    {categories.map((item, index) => (
                                        <div key={index} onClick={() => {
                                            setFilterItem(item)
                                            setFilterOpen(false)
                                        }} 
                                        className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                                            {item}
                                        </div>
                                    ))}
                                  </div>
                                  <div>
                                    <div className="text-sm">
                                        Titles:
                                    </div>
                                    {hobbies.length === 0 &&
                                        <div className='block px-4 py-2 text-sm text-white'>
                                            {'Empty'}
                                        </div>
                                    }
                                    {hobbies.length !== 0 && titles.map((item, index) => (
                                        <div key={index} onClick={() => {
                                            setFilterItem(item)
                                            setFilterOpen(false)
                                        }} 
                                        className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                                            {item}
                                        </div>
                                    ))}
                                  </div>
                                </div>
                            
                        </div>
                    }
                  </div>
                </div>
                <div>
                  <MainDashBoardShell filter={filterItem} hobbies={hobbies} />
                </div>
              </div>
        </>
    )

};

export default DashChildShell;