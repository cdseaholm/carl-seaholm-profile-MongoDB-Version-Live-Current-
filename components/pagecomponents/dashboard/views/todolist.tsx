'use client'

import { ITask } from "@/models/types/task";
import { Checkbox } from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { useStore } from '@/context/dataStore';
import { useStateStore } from "@/context/stateStore";
import { useModalStore } from "@/context/modalStore";
import { Spinner } from "@/components/misc/Spinner";
import ToDoComp from "../helpers/todocomp";


export default function ToDoList ({adminID}: {adminID: boolean}) {
    
    //context
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const modalOpen = useModalStore((state) => state.modalOpen);
    
    //state
    const [dateToUse, setDateToUse] = useState(new Date().toLocaleDateString());


    const handleDateIncrease = () => { 
        const date = new Date(dateToUse);
        date.setDate(date.getDate() + 1);
        setDateToUse(date.toLocaleDateString());
    }

    const handleDateDescrease = () => {
        const date = new Date(dateToUse);
        date.setDate(date.getDate() - 1);
        setDateToUse(date.toLocaleDateString());
    }
    
    
    return (
    
        <div className="p-2 flex flex-col w-full h-full justify-start" style={{flexGrow: 1, fontSize: '10px', overflow: 'auto'}}>
            {adminID && 
                <div className={`flex flex-row justify-end items-center`}>
                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => {setModalOpen('addtask')}}>
                        Add New Task
                    </button>
                </div>
            }
            <div className={`flex flex-col justify-start w-full h-full`}>
                <div className={`flex flex-row justify-evenly w-1/2 pb-5 self-center`}>
                    <button className="text-base" onClick={handleDateDescrease}>
                        <p className="hover:bg-gray-400">{'<'}</p>
                    </button>
                    <div>
                        <h1 className={`text-base md:text-lg font-bold text-center underline`}>
                            To-Do List</h1>
                        <h1 className={`text-sm md:text-base font-semibold text-center`}>       
                            {dateToUse}
                        </h1>
                    </div>
                    <button className="text-base" onClick={handleDateIncrease}>
                        <p className="hover:bg-gray-400">{'>'}</p>
                    </button>
                </div>
                <ToDoComp adminID={adminID} dateToUse={dateToUse}/>
            </div>
        </div> 
    );
}