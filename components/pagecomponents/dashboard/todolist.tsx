'use client'

import React, { useEffect } from "react";
import { useState } from "react";
import ToDoComp from "../../../app/actions/dashActions/todocomp";
import { useStateStore } from "@/context/stateStore";
import { ITask } from "@/models/types/task";
import { IUserObject } from "@/models/types/userObject";
import { IEntry } from "@/models/types/objectEntry";


export default function ToDoList({ adminID, setModalOpen, handleDateDecrease, handleDateIncrease, dateToUse, entriesOTD }: { adminID: boolean, setModalOpen: (title: string) => void, handleDateDecrease: () => void, handleDateIncrease: () => void, dateToUse: string, entriesOTD: any }) {

    const urlToUse = useStateStore((state) => state.urlToUse);
    const [filteredTasks, setFilteredTasks] = useState<IEntry[]>([]);
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const [loading, setLoading] = useState<boolean>(true);
    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
    const smallBreakpoint = useStateStore((state) => state.widthQuery) < 580 ? true : false;
    const tasks = entriesOTD.find((field: IUserObject) => field.title === 'tasks');
    const setTaskDetailsToShow = useStateStore((state) => state.setTaskDetailToShow);

    useEffect(() => {
        const getTasks = async () => {
            setLoading(true);
            if (!tasks) {
                setLoading(false);
                return;
            }
            try {
                if (!tasks) {
                    console.error('No tasks found for date');
                    setLoading(false);
                    return;
                }
                const sortedTasks = tasks.filter((task: ITask) => {
                    return task.date === dateToUse ? -1 : 1;
                });
                setFilteredTasks(sortedTasks);
                console.log('Tasks sorted', sortedTasks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks', error);
                setLoading(false);
                return;
            }
        }
        getTasks();
    }, [dateToUse, tasks, setLoading, adminID]);


    const handleCheckboxClick = async (passedTask: IEntry) => {

        if (!adminID) return;
        try {
            const updatedTask = await fetch(`${urlToUse}/api/${userID}/edittask/${passedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: passedTask.fields.find((entry) => entry.name === 'completed')?.value
                })
            });
            if (!updatedTask.ok) {
                console.log('Failed to update task');
                return;
            }
            if (updatedTask.ok) {
                const res = await updatedTask.json();
                console.log('Task updated', res);
            }
        } catch (error) {
            console.error('Error updating task', error);
            return;
        }
        const completedTask = passedTask.fields.find((entry) => entry.name === 'completed')?.value;
        setFilteredTasks(prevTasks =>
            prevTasks.map(task =>
                task._id === passedTask._id ? { ...task, completed: completedTask } : task
            )
        );
    };

    const handleDetailSelect = (passedTask: IEntry) => {
        if (passedTask === null || passedTask === undefined) return;
        setTaskDetailsToShow(passedTask);
        console.log('Task details to show', passedTask);
    };

    return (

        <div className="p-2 flex flex-col w-full h-full justify-start items-center" style={{ fontSize: '10px' }}>
            <div className={`flex flex-row justify-evenly w-1/2 self-center`}>
                <button className="text-base" onClick={handleDateDecrease}>
                    <p className="hover:bg-gray-400">{'<'}</p>
                </button>
                <div>
                    <h1 className={`text-base md:text-lg font-bold text-center underline`}>
                        To-Do List
                    </h1>
                    <h1 className={`text-sm md:text-base font-semibold text-center`}>
                        {dateToUse}
                    </h1>
                </div>
                <button className="text-base" onClick={handleDateIncrease}>
                    <p className="hover:bg-gray-400">{'>'}</p>
                </button>
            </div>
            <ToDoComp adminID={adminID} loading={loading} filteredTasks={filteredTasks} smallBreakpoint={smallBreakpoint} isBreakpoint={isBreakpoint} handleCheckboxClick={handleCheckboxClick} handleDetailSelect={handleDetailSelect} />
            {adminID &&
                <div className={`flex flex-row justify-center items-center`}>
                    <button className="bg-transparent hover:bg-neutral-500 text-black font-bold py-2 px-4 rounded text-sm md:text-base" onClick={() => { setModalOpen('addtask') }}>
                        Add New Task
                    </button>
                </div>
            }
        </div>
    );
}