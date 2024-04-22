'use client'

import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useModalContext } from "@/app/context/modal/modalContext";
import e from "cors";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogSessionModal({ show }: { show: boolean; }) {

    const [loading, setLoading] = useState(false);
    const [seshHobby, setSeshHobby] = useState('');
    const { setOpenLogSessionModal, urlToUse, hobbies, setRefreshKey } = useHobbyContext();
    const { data: session } = useSession();
    const { swapDashDesire } = useModalContext();
    const router = useRouter();
    const ADMIN_ID = parseInt(process.env.NEXT_PUBLIC_ADMIN_ID ? process.env.NEXT_PUBLIC_ADMIN_ID : '');

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleLogSession function called');
        event.preventDefault();
        if (session === null || session === undefined || session.user === null || session.user === undefined) {
            console.log('You must be logged in to log a session');
            return;
        }
        try {
            const formData = new FormData(event.currentTarget);
            if (seshHobby === null || seshHobby === undefined || seshHobby === '') {
                console.log('Must pick a Hobby to attribute this Sesh to');
                return;
            }

            const date = formData.get('modalSessionDate');
            if (date === null || date === undefined || date === '') {
                console.log('Date is required');
                return;
            }

            const time = formData.get('modalSessionTime');
            if (time === null || time === undefined || time === '') {
                console.log('Time is required');
                return;
            }
            console.log('id', seshHobby, 'date', date, 'time', time, 'user', session.user.email)

            setLoading(true);

            const res = await fetch(`${urlToUse}/api/logsession`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: seshHobby,
                    date: date,
                    time: time,
                    user: session.user.email,
                }),
            
            });
            if (res.ok) {
                console.log('updateSession', res);
                setLoading(false);
                setOpenLogSessionModal(false);
                setRefreshKey(prevKey => prevKey + 1);
            } else {
                setLoading(false);
                console.log('updateSession', res);
            }
        } catch (error) { 
            setLoading(false);
            console.log('updateSession', error);
        }
    }
    

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${show ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg border border-black shadow-lg">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-10 h-10 border-2 border-t-primary-500 rounded-full animate-spin"/>
                        </div>
                    ) : (
                        <>
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Log a session
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setOpenLogSessionModal(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={handleCreate}>
                            <div className="grid gap-4 mb-4 grid-cols-1">
                                <div>
                                    <label htmlFor="modalSessionDate" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Session Date</label>
                                    <input type="date" name="modalSessionDate" id="modalSessionDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="01/01/2024" required/>
                                </div>
                                <div>
                                    <label htmlFor="modalSessionHobby" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Hobby Session</label>
                                    <select name="modalSessionHobby" id="modalSessionHobby" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue='No Session Chosen' required onChange={(e) => {
                                        console.log('e.target.value', e.target.value)
                                        const target = e.target.value;
                                        setSeshHobby(target);
                                    } 



                                    }>
                                        <option value='No Session Chosen'>
                                            No Session Chosen
                                        </option>
                                        {hobbies && hobbies.map((hobby, index) =>
                                            <option key={index} value={hobby._id}>
                                                {hobby.title}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="modalSessionTime" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Total Session Time</label>
                                    <input type='number' name="modalSessionTime" id="modalSessionTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="90 minutes" required/>
                                </div>
                                <div className="flex flex-row justify-between space-x-1 items-center">
                                    <div>
                                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                        Add New Session
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white pr-5`} data-modal-toggle="crud-modal" onClick={swapDashDesire}>Create new Tracker</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                    )}
                </div>
            </div>
        </div> 
    )
}