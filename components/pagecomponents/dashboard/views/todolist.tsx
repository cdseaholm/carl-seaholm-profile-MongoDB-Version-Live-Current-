'use client'

import { ITask } from "@/models/types/task";
import { Checkbox } from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { useStore } from '@/context/dataStore';
import { useStateStore } from "@/context/stateStore";
import { useModalStore } from "@/context/modalStore";
import { Spinner } from "@/components/misc/Spinner";


export default function ToDoList ({adminID}: {adminID: boolean}) {
    
    //context
    const tasks = useStore((state) => state.tasks);
    const urlToUse = useStateStore((state) => state.urlToUse);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const modalOpen = useModalStore((state) => state.modalOpen);
    
    //state
    const [dateToUse, setDateToUse] = useState(new Date().toLocaleDateString());
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    //variables
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const completedHead = document.getElementById('completedHead');

    //functions
    useEffect(() => {
        const getTasks = async () => {
            setLoading(true);
            if (tasks === undefined || tasks === null) {
                console.error('Tasks undefined or null');
                setLoading(false);
                return;
            }
            try {
                const tasksFiltered = tasks.filter((task: ITask) => {
                    return task.date === dateToUse;
                });
                setFilteredTasks(tasksFiltered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks', error);
                setLoading(false);
                return;
            }
        }
        getTasks();
    }, [modalOpen, dateToUse, urlToUse, userID, tasks, setLoading, setFilteredTasks, setDateToUse, completedHead, adminID]);

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

    const handleCheckboxClick = async (id: string, index: number) => {
        if (!adminID) return;
        try {
            const taskToUpdate = filteredTasks.find(task => task._id === id);
            if (!taskToUpdate) return;
    
            const updatedCompleted = [...taskToUpdate.completed];
            updatedCompleted[index] = !updatedCompleted[index];
    
            const updatedTasks = await fetch(`${urlToUse}/api/${userID}/edittask/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: updatedCompleted
                })
            });
            if (!updatedTasks.ok) {
                console.log('Failed to update task');
                return;
            }
            if (updatedTasks.ok) {
                const res = await updatedTasks.json();
                console.log('Task updated', res);
            }
        } catch (error) {
            console.error('Error updating task', error);
            return;
        }
        setFilteredTasks(prevTasks =>
            prevTasks.map(task =>
                task._id === id ? { ...task, completed: task.completed.map((comp, i) => i === index ? !comp : comp) } : task
            )
        );
    };
    
    
    return (
        loading ? (
            <Spinner />
        ):(
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
                        {filteredTasks.length === 0 ? (
                            <h1 className={`text-sm md:text-base font-semibold text-center w-full`}>No tasks found</h1>
                        ) : (
                            <div className={`flex flex-col w-full px-3 items-start justify-start`}>
                                <div className={`flex flex-row w-full items-center justify-start`}>
                                    <div className={`flex flex-row justify-between`} style={{width: '55%'}}>
                                        <h1 className={`text-xs md:text-sm font-semibold underline text-center`}id={`completedHead`} style={{width: '20%'}}>Completed</h1>
                                        <h1 className={`text-xs md:text-sm font-semibold underline text-center`} style={{width: '40%'}}>Title</h1>
                                        <h1 className={`text-xs md:text-sm font-semibold underline text-center`} style={{width: '40%'}}>Time</h1>
                                    </div>
                                    <div className={`flex flex-row`} style={{width: '45%'}}>
                                        <h1 className={`text-xs md:text-sm font-semibold underline text-center`}>Description</h1>
                                    </div>
                                </div>
                                {filteredTasks.map((task: ITask, index: number) => (
                                    task.title.map((title, i) => (
                                        <div className={`flex flex-row w-full items-start justify-start pt-5`} key={i}>
                                            <React.Fragment key={i}>
                                                <div className={`flex flex-row justify-between items-start`} style={{width: '55%'}}>
                                                    <div className={`flex flex-col items-center justify-start`} style={{width: '25%'}}>
                                                        <Checkbox onClick={() => handleCheckboxClick(task._id, i)} isSelected={task.completed[i] ? true : false} className={`${adminID ? 'cursor-pointer' : 'cursor-default'}`} id={`checkbox${i}`} name={`checkbox${i}`} aria-labelledby={`checkbox${i}`} isDisabled={adminID ? false : true}/>
                                                    </div>

                                                    <h1 className={`text-xs md:text-sm font-semibold ${task.completed[i] ? 'line-through' : ''}`} id={`title${i}`} style={{width: '30%'}}>
                                                        {title}
                                                    </h1>
                                                    <h1 className={`text-xs md:text-sm font-semibold ${task.completed[i] ? 'line-through' : ''}`} id={`time${i}`} style={{width: '25%'}}>
                                                        {task.time[i]}
                                                    </h1>
                                                </div>
                                                <div className={`flex flex-row`} style={{width: '45%'}}>
                                                    <h1 className={`text-xs md:text-sm font-semibold`} id={`description${i}`}>
                                                        {task.description[i]}
                                                    </h1>
                                                </div>
                                            </React.Fragment>
                                        </div>
                                    ))
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    );
}