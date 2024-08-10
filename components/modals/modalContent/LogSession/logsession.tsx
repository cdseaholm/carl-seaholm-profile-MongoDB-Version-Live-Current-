'use client'

import { getHobbies } from "@/app/context/functions/getHobbies";
import { useStore } from "@/context/dataStore";
import { useHobbyStore } from "@/context/hobbyStore";
import { useModalStore } from "@/context/modalStore";
import { useStateStore } from "@/context/stateStore";
import { useSession } from "next-auth/react";
import { useState } from "react";

function formatDate(dateString: string) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    return new Date(dateString).toLocaleDateString('en-GB', options).split('/').reverse().join('-');
}

export default function LogSessionModal({daySelected}: {daySelected: string}) {

    const { data: session } = useSession();
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const urlToUse = useStateStore((state) => state.urlToUse);
    const [seshHobby, setSeshHobby] = useState('');
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setRefreshKey = useHobbyStore((state) => state.setRefreshKey);
    const setHobbies = useStore((state) => state.setHobbies);
    const modalParent = useModalStore((state) => state.modalParent);
    const localHobbies = useStore((state) => state.hobbies);

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
            console.log('id', seshHobby, 'date', date, 'time', time, 'user', session.user.email);

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
                setModalOpen('');
                setRefreshKey(prevKey => prevKey + 1);
                if (userID !== undefined && userID !== null && userID !== '') {
                    const hobs = await getHobbies(urlToUse, userID);
                    setHobbies(hobs);
                } else {
                    console.log('No user ID');
                }
            } else {
                console.log('updateSession', res);
            }
        } catch (error) { 
            console.log('updateSession', error);
        }
    }

    return (
    <form className="p-4 md:p-5" onSubmit={handleCreate}>
                <div className="grid gap-4 mb-4 grid-cols-1">
                    <div>
                        <label htmlFor="modalSessionDate" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Session Date</label>
                        <input type="date" name="modalSessionDate" id="modalSessionDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='01/01/2024' required defaultValue={modalParent === 'calendar' ? formatDate(daySelected) : ''} />
                    </div>
                    <div>
                        <label htmlFor="modalSessionHobby" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Hobby Session</label>
                        <select name="modalSessionHobby" id="modalSessionHobby" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue='No Session Chosen' required onChange={(e) => {
                            const target = e.target.value;
                            setSeshHobby(target);
                        } }>
                            <option value='No Session Chosen'>
                                No Session Chosen
                            </option>
                            <optgroup label=" "/>
                            <optgroup label="Filter by Title:">
                            {localHobbies && localHobbies.length > 0 && localHobbies.map((hobby, index) => (
                                <option key={index} value={hobby._id}>
                                    {hobby.title}
                                </option>
                            ))}
                            </optgroup>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="modalSessionTime" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Total Session Time</label>
                        <input type='number' name="modalSessionTime" id="modalSessionTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="90 minutes" required />
                    </div>
                    <div className="flex flex-row justify-between space-x-1 items-center">
                        <div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add New Session
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white pr-5`} data-modal-toggle="crud-modal" onClick={() => setModalOpen('addhobby')}>
                                Create new Tracker
                            </button>
                        </div>
                    </div>
                </div>
            </form>
    )
}