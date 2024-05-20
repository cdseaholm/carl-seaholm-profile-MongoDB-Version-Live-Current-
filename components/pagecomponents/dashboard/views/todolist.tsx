'use client'

import { useModalContext } from "@/app/context/modal/modalContext";
import { useStateContext } from "@/app/context/state/StateContext";
import { ITask } from "@/models/types/task";
import { Checkbox } from "@nextui-org/react";
import { get } from "http";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";

const ToDoList = () => {
    
    const {data: session} = useSession();
    const { urlToUse } = useStateContext();
    const { setModalOpen, modalOpen } = useModalContext();
    const [dateToUse, setDateToUse] = useState(new Date().toLocaleDateString());
    const [localTasks, setLocalTasks] = useState<ITask[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;


    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetch(`${urlToUse}/api/${userID}/gettasks`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    console.log('No tasks found');
                    return;
                }
                if (response.ok) {
                    const res = await response.json();
                    const tasksToUse = res.tasks.map((task: ITask) => {
                        console.log('Task date:', task.date);
                        return {
                            title: task.title,
                            time: task.time,
                            description: task.description,
                            date: task.date,
                            user_email: task.user_email,
                            _id: task._id,
                            createdAt: task.createdAt,
                            updatedAt: task.updatedAt,
                            completed: task.completed
                        }
                    });
                    setLocalTasks(tasksToUse);
                    console.log(res);
    
                    const tasksFiltered = tasksToUse.filter((task: ITask) => {
                        console.log('Comparing dates:', task.date, dateToUse);
                        return task.date === dateToUse;
                    });
                    setFilteredTasks(tasksFiltered);
                }
            } catch (error) {
                console.error('Error fetching tasks', error);
                return;
            }
        }
        getTasks();
    }, [modalOpen, dateToUse, urlToUse, userID]);

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

    const handleCheckboxClick = async (id: string, currentCompleted: boolean) => {
        if (!adminID) return;
        try {
            const updatedTasks = await fetch(`${urlToUse}/api/${userID}/edittask/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !currentCompleted
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
                task._id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };
    
    
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
                        {filteredTasks.length === 0 ? (
                            <h1 className={`text-sm md:text-base font-semibold text-center w-full`}>No tasks found</h1>
                        ) : (
                            <div className={`grid grid-cols-4 gap-4 px-16`}>
                                <h1 className={`text-xs md:text-sm font-semibold underline`}>Completed</h1>
                                <h1 className={`text-xs md:text-sm font-semibold underline`}>Title</h1>
                                <h1 className={`text-xs md:text-sm font-semibold underline`}>Time</h1>
                                <h1 className={`text-xs md:text-sm font-semibold underline`}>Description</h1>
                                {filteredTasks.map((task: ITask, index: number) => (
                                    <React.Fragment key={index}>
                                        <Checkbox onClick={() => handleCheckboxClick(task._id, task.completed)} isSelected={task.completed ? true : false} className={`${adminID ? 'cursor-pointer' : 'cursor-default'}`}/>
                                        <h1 className={`text-xs md:text-sm font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h1>
                                        <h1 className={`text-xs md:text-sm font-semibold ${task.completed ? 'line-through' : ''}`}>{task.time}</h1>
                                        <h1 className={`text-xs md:text-sm font-semibold`}>{task.description}</h1>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                </div>
            </div>
    );
}

export default ToDoList;