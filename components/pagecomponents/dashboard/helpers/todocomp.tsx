'use client'

import useMediaQuery from "@/components/listeners/WidthSettings";
import { Spinner } from "@/components/misc/Spinner";
import { useStateStore } from "@/context/stateStore";
import { useTaskStore } from "@/context/taskStore";
import { ITask, ITaskByDate } from "@/models/types/task";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";

export default function ToDoComp({adminID, dateToUse}: {adminID: boolean, dateToUse: string}) {

    const urlToUse = useStateStore((state) => state.urlToUse);
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const tasksByUser = useTaskStore((state) => state.tasksByUser);
    const [loading, setLoading] = useState<boolean>(true);
    const isBreakpoint = useMediaQuery(768);
    const smallBreakpoint = useMediaQuery(580);
    const taskDetailsToShow = useTaskStore((state) => state.taskDetailsToShow);
    const setTaskDetailsToShow = useTaskStore((state) => state.setTaskDetailsToShow);
    const [editTask, setEditTask] = useState<boolean>(false);
    const [deleteTask, setDeleteTask] = useState<boolean>(false);
    
    useEffect(() => {
        const getTasks = async () => {
            setLoading(true);
            if (!tasksByUser || !tasksByUser.tasksByDate) {
                console.error('tasksByUser or tasksByUser.tasksByDate is undefined');
                setLoading(false);
                return;
            }
            if (tasksByUser === undefined || tasksByUser === null) {
                console.error('Tasks undefined or null');
                setLoading(false);
                return;
            } 
            if (tasksByUser.tasksByDate === undefined || tasksByUser.tasksByDate === null) {
                console.error('tasksByUser.tasksByDate is undefined');
                setLoading(false);
                return;
            }
            try {
                const tasksForDate = tasksByUser.tasksByDate.find((dateTasks: ITaskByDate) => dateTasks.date === dateToUse);
                if (!tasksForDate) {
                    console.error('No tasks found for date');
                    setLoading(false);
                    return;
                }
                const sortedTasks = tasksForDate.tasks.sort((a: ITask, b: ITask) => {
                    if (a.time < b.time) {
                        return -1;
                    }
                    if (a.time > b.time) {
                        return 1;
                    }
                    return 0;
                });
                console.log('Sorted tasks for date', sortedTasks);
                setFilteredTasks(sortedTasks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks', error);
                setLoading(false);
                return;
            }
        }
        getTasks();
    }, [dateToUse, urlToUse, userID, tasksByUser, setLoading, adminID]);


    const handleCheckboxClick = async (passedTask: ITask) => {
        if (!adminID) return;
        try {
            const updatedTask = await fetch(`${urlToUse}/api/${userID}/edittask/${passedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: passedTask.completed
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
        setFilteredTasks(prevTasks =>
            prevTasks.map(task =>
                task._id === passedTask._id ? { ...task, completed: passedTask.completed } : task
            )
        );
    };

    const handleDetailSelect = (passedTask: ITask) => {
        if (passedTask === null || passedTask === undefined) return;
        setTaskDetailsToShow(passedTask);
        console.log('Task details to show', passedTask);
    };
    
  return (
    loading ? (
        <Spinner />
    ) : (
        filteredTasks.length === 0 || tasksByUser === null ? (
            <h1 className={`text-sm md:text-base font-semibold text-center w-full`}>No tasks found</h1>
        ) : (
            <div className={`flex flex-col px-3 items-start justify-start ${smallBreakpoint ? 'mx-2' : isBreakpoint ? 'mx-5' : 'mx-16'} space-y-2`}>
                {filteredTasks.map((task: ITask, i: number) => (
                        <div className={`flex flex-row items-center justify-between w-full bg-stone-300 rounded-md`} key={i}>
                            <div className={`flex flex-grow justify-start items-center p-2 space-x-5`} style={{width: '48%'}}>
                                <input id={`checkboxTask${i}${task._id}`} aria-label={`checkboxTask${i}${task._id}`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded hover:ring-blue-500 hover:ring-blue-600 hover:ring-2 cursor-pointer" onChange={() => handleCheckboxClick(task)} checked={task.completed} title={`${task.completed ? 'Mark Incomplete' : 'Mark Complete'}`} />
                                <p className={`text-sm md:text-base font-semibold text-start overflow-ellipsis overflow-hidden`} id={`titleTask${i}${task._id}`} aria-label={`titleTask${i}${task._id}`}>
                                    {task.title}
                                </p>
                            </div>
                            <div className={`flex flex-row items-start justify-start space-x-5 px-2 border-l border-black`} style={{width: '20%'}}>
                                <p className={`p-1 text-sm md:text-base text-start`} id={`timeTask${i}${task._id}`} aria-label={`timeTask${i}${task._id}`}>
                                {new Date(`1970-01-01T${task.time[i]}:00Z`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-evenly space-x-5 px-2 border-l border-black" style={{width: '32%'}}>
                                <div className="p-2 hover:bg-gray-400 cursor-pointer rounded-md" title="Details" id={`detailsTask${i}${task._id}`} aria-label={`detailsTask${i}${task._id}`} onClick={() => handleDetailSelect(task)}>
                                    <FiMessageSquare className={`text-sm md:text-base`} />
                                </div>
                                {adminID ? (
                                    <>
                                <div className="p-2 hover:bg-gray-400 cursor-pointer rounded-md" title="Edit" id={`editTask${i}${task._id}`} aria-label={`editTask${i}${task._id}`}>
                                    <FiEdit className={`text-sm md:text-base`} />
                                </div>
                                <div className="p-2 hover:bg-gray-400 cursor-pointer rounded-md" title="Delete" id={`deleteTask${i}${task._id}`} aria-label={`deleteTask${i}${task._id}`}>
                                    <FiTrash2 className={`text-sm md:text-base`} />
                                </div>
                                </>
                                ) : null}
                            </div>
                        </div>
                ))}
            </div>
        )
    )
  );
}