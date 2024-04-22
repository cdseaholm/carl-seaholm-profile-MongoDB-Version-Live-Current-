
import { useState } from "react";
import React from "react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import ModalHobby from "@/components/modals/hobbyModal/hobbymodal";
import MainDashBoard from "./mainDashBoard";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { IHobby } from "@/models/types/hobby";
import { useSession } from "next-auth/react";

const DashChild = ({categories, titles, hobbies, adminID}: { categories: string[] | null; titles: string[] | null; hobbies: IHobby[] | null; adminID: boolean;}) => {

    const { openAddModal, setOpenAddModal, filterItem, setFilterItem, setOpenLogSessionModal } = useHobbyContext();
    const { data: session } = useSession();

    const handleDesireToEdit = () => {
      console.log('Edit button clicked');
    }

    const handleDesireToLog = () => {
      setOpenLogSessionModal(true)
    }

    return (
            <div className="p-4">
                <div className={`flex flex-row top-0 z-20 items-center justify-between`}>
                  <select id='filterDropdown' name="filterDropdown" className={`block text-black font-medium rounded-lg text-xs text-left bg-transparent border-transparent hover:bg-gray-400 w-1/4 cursor-pointer`}  
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
                        className={`block text-black font-medium rounded-lg text-xs text-left bg-transparent border-transparent hover:bg-gray-400 w-1/4 cursor-pointer`} 
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
                          + Add New Tracker
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
                <ModalHobby show={openAddModal} categories={categories} hobbies={hobbies} />
                <div className="flex flex-row justify-center items-center" >
                  <MainDashBoard filter={filterItem} hobbies={hobbies} adminID={adminID} />
                </div>
              </div>
    )

};

export default DashChild;