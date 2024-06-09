
import { ITask } from "@/models/types/task";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useStore } from "@/context/dataStore";
import { useStateStore } from "@/context/stateStore";
import { useModalStore } from "@/context/modalStore";
import { useTaskStore } from "@/context/taskStore";

export default function AddTask () {

    const {data: session} = useSession();
    const urlToUse = useStateStore((state) => state.urlToUse);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const [loading, setLoading] = useState(false);
    const setTasks = useTaskStore((state) => state.setTasks);
    const tasks = useTaskStore((state) => state.tasks);

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form['taskCreateTitle'].value;
        const time = form['taskCreateTime'].value;
        const description = form['taskCreateDescription'].value;
        const date = new Date().toLocaleDateString();
        const user = session?.user?.email;
        if (!title) {
            console.log('Please make sure to add a title');
            return;
        } 
        if (session === null || session === undefined) {
            console.log('Please log in to create a task');
            return;
        } else if (session.user === null || session.user === undefined) {
            console.log('Please log in to create a task');
            return;
        } else if (session.user.email === null || session.user.email === undefined) {
            console.log('Please log in to create a task');
            return;
        }
        const newTask = {
            title,
            time,
            description,
            user_email: session.user.email,
        } as ITask;

        const response = await fetch(`${urlToUse}/api/createtask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
            console.log('Failed to create task');
            return;
        }
        if (response.ok) {
            const res = await response.json();
            console.log('Task created', res);
            console.log('Task created', res.task);
            setTasks([...tasks, res.task]);
            setModalOpen('');
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        )
    } else {
        return (
            <form className="p-4 md:p-5" onSubmit={handleCreateTask}>
                <div className="grid gap-4 mb-4 grid-cols-1">
                    <label htmlFor="taskCreateTitle" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Task Name</label>
                    <input type="text" name="taskCreateTitle" id="taskCreateTitle" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type a name" required/>

                    <label htmlFor="taskCreateTime" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Time</label>
                    <input id="taskCreateTime" name="taskCreateTime" type='time' autoComplete="off" className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}/>

                    <label htmlFor="taskCreateDescription" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Description</label>
                    <textarea id="taskCreateDescription" name="taskCreateDescription" autoComplete="off" rows={4} className={`block p-2.5 w-full text-xs md:text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Write description here"/>
                    
                    <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/3`}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add Task
                    </button>
                </div>
            </form>
        );
    }
};