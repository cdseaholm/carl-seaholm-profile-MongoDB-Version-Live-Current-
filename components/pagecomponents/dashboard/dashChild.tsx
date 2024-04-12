import { ActualUser } from "@/types/user";
import { Hobby } from "@/types/hobby";
import { useState } from "react";
import React from "react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import ModalHobby from "@/components/modals/hobbyModal/hobbymodal";
import MobileModalHobby from "@/components/modals/hobbyModal/mobileHobbyModal";
import MainDashBoard from "./mainDashBoard";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";

const DashChild = ({user, categories, titles, hobbies, updateHobbies, adminID}: {user: ActualUser | null; categories: string[]; titles: string[]; hobbies: Hobby[]; updateHobbies: any; adminID: boolean;}) => {

    const [filterOpen, setFilterOpen] = useState(false);
    const divRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const isBreakpoint = useMediaQuery(768);
    const { categoryPassed, openAddModal, setOpenAddModal, filterItem, setFilterItem } = useHobbyContext();

    

    React.useEffect(() => {
        const handleOutsideClick = (event: { target: any; }) => {
          if ((!dropdownRef.current || !dropdownRef.current.contains(event.target as HTMLDivElement)) && 
              (!divRef.current || !divRef.current.contains(event.target as HTMLElement))) {
              if (filterOpen) {
                  setFilterOpen(false);
              }
          }
      };
        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [setFilterOpen, divRef, dropdownRef, filterOpen]);

    const CreateHobbyHandle= async (event: React.FormEvent<HTMLFormElement>) => {
      console.log('handleSubmit function called');
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const userToPass = user ? user : null;

      // createHobby = await CreateHobby({ formData, user: userToPass, categoryPassed });
  
      //if (createHobby) {
      //    console.log('Hobby created');
      //    setOpenAddModal(false);
      //    updateHobbies();
      //} else {
      //    console.log('Error creating hobby');
      //}
      
    };

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className={`flex flex-row sticky top-0 z-20 ${user && adminID === true ? 'justify-between' : 'justify-start'}`}>
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
                                    {hobbies.length === 0 || titles.length === 0 &&
                                        <div className='block px-4 py-2 text-sm text-white'>
                                            {'Empty'}
                                        </div>
                                    }
                                    {hobbies.length !== 0 && categories.map((item, index) => (
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
                  {user !== null && adminID === true &&
                      <>
                          {isBreakpoint &&
                              <button className="block text-black font-medium rounded-lg text-sm mx-3 my-2 px-3 py-1.5 text-center hover:bg-gray-400" type="button" onClick={() => setOpenAddModal(true)}>
                                  +
                              </button>
                          }
                          {!isBreakpoint &&
                              <button className="block text-black font-medium rounded-lg text-sm mx-3 my-2 px-3 py-1.5 text-center hover:bg-gray-400" type="button" onClick={() => setOpenAddModal(true)}>
                                  + Add New Tracker
                              </button>
                          }
                      </>
                  }
                </div>
                {isBreakpoint &&
                  <MobileModalHobby show={openAddModal} categories={categories} hobbies={hobbies} createHobby={CreateHobbyHandle}/>
                }
                {!isBreakpoint &&
                  <ModalHobby show={openAddModal} categories={categories} hobbies={hobbies} createHobby={CreateHobbyHandle} />
                }
                <div>
                  <MainDashBoard filter={filterItem} hobbies={hobbies} user={user} adminID={adminID} />
                </div>
              </div>
        </>
    )

};

export default DashChild;