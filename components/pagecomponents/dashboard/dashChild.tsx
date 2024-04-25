

import React, { useState } from "react";
import ModalHobby from "@/components/modals/hobbyModal/hobbymodal";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { IHobby } from "@/models/types/hobby";
import { useSession } from "next-auth/react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { FiMenu } from "react-icons/fi";
import { useModalContext } from "@/app/context/modal/modalContext";
import StatsView from "./trackers/statsView";
import CalView from "./trackers/calView";

const DashChild = ({categories, titles, hobbies, adminID}: { categories: string[] | null; titles: string[] | null; hobbies: IHobby[] | null; adminID: boolean;}) => {

    const isBreakpoint = useMediaQuery(768);
    const { openAddModal, setOpenAddModal, filterItem, setFilterItem, setOpenLogSessionModal } = useHobbyContext();
    const { data: session } = useSession();
    const { setOpenDashboardMobileDropdown, calDash, setCalDash } = useModalContext();
    
    const handleDesireToEdit = () => {
      console.log('Edit button clicked');
    }

    const handleDesireToLog = () => {
      setOpenLogSessionModal(true)
    }

    return (
            <div className="p-4">
                {!isBreakpoint &&
                  <div className={`flex flex-col md:flex-row top-0 z-20 items-start md:items-center justify-between`}>
                    <select id='filterDropdown' name="filterDropdown" className={`block text-black font-medium rounded-lg w-2/5 md:w-1/4 text-xs text-left bg-transparent border-transparent hover:bg-gray-400 cursor-pointer`}  
                      defaultValue='No Filter'  
                      onChange={(e) => {
                        const target = e.target as HTMLSelectElement;
                        setFilterItem(target.value);
                      }}
                    >
                      <option id="No Filter" value="No Filter">
                        No Filter
                      </option>
                      <optgroup label=" "/>
                      <optgroup label="Filter by Category:">
                        {categories && categories.length > 0 && categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label=" "/>
                      <optgroup label="Filter by Title:">
                        {titles && titles.length > 0 && titles.map((title, index) => (
                          <option key={index} value={title}>
                            {title}
                          </option>
                        ))}
                      </optgroup>
                    </select>

                    {session?.user !== null && adminID === true &&
                        <select id="actionsDropdown" name="actionsDropdown"
                          className={`block text-black font-medium rounded-lg w-2/5 md:w-1/4 text-xs text-left bg-transparent border-transparent hover:bg-gray-400 cursor-pointer`} 
                          defaultValue='+'
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            e.target.value = '+'; // Reset the select value to '+'
                            switch(selectedValue) {
                              case 'add':
                                setOpenAddModal(true);
                                break;
                              case 'log':
                                handleDesireToLog();
                                break;
                              case 'edit':
                                handleDesireToEdit();
                                break;
                              default:
                                break;
                            }
                          }}
                        >
                          <option id="+" value="+">
                            Actions
                          </option>
                          <option id="add" value='add'>
                            + New Tracker
                          </option>
                          <option id="log" value='log'>
                            Log Session
                          </option>
                          <option id="edit" value='edit'>
                            Edit
                          </option>
                        </select>
                    } 
                  </div>
                }
                {isBreakpoint &&
                    <FiMenu className="flex flex-row justify-start m-2" onClick={() => setOpenDashboardMobileDropdown(true)} />
                }
                <ModalHobby show={openAddModal} categories={categories} hobbies={hobbies} />
                {calDash &&
                  <div className="flex flex-row justify-center items-center" >
                  <CalView filter={filterItem} hobbies={hobbies} />
                </div>
                }
                {!calDash &&
                  <StatsView hobbies={hobbies} daysThisMonth={30} />
                }
              </div>
    )

};

export default DashChild;