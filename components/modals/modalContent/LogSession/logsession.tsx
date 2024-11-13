'use client'

import { useState } from "react";

function formatDate(dateString: string) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    return new Date(dateString).toLocaleDateString('en-GB', options).split('/').reverse().join('-');
}

export default function LogSessionModal({ daySelected, handleCreate, hobbyTitles, modalParent, handleModalOpen }: { daySelected: string, handleCreate: (event: React.FormEvent<HTMLFormElement>) => void, hobbyTitles: string[], modalParent: string, handleModalOpen: (title: string) => void }) {

    const [sessions, setSessions] = useState([{ hobby: '', time: '' }]);

    const addSession = () => {
        setSessions([...sessions, { hobby: '', time: '' }]);
    };

    const handleSessionChange = (index: number, field: string, value: string) => {
        const newSessions = [...sessions];
        if (newSessions[index]) {
            if (field === 'hobby' || field === 'time') {
                newSessions[index][field] = value;
            }
        }
        setSessions(newSessions);
    };

    return (
        <div style={{maxHeight: '80dvh', overflowY: 'auto'}}>
            <form className="p-4 md:p-5" onSubmit={handleCreate}>
                <div className="grid gap-4 mb-4 grid-cols-1">
                    <div>
                        <label htmlFor="modalSessionDate" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Session Date</label>
                        <input type="date" name="modalSessionDate" id="modalSessionDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='01/01/2024' required defaultValue={modalParent === 'calendar' ? formatDate(daySelected) : ''} />
                    </div>
                    {sessions.map((_, index) => (
                        <div key={index}>
                            <div>
                                <label htmlFor={`modalSessionHobby-${index}`} className="block my-2 text-sm font-medium text-gray-900 dark:text-white">{index + 1}. Hobby Session</label>
                                <select name={`modalSessionHobby-${index}`} id={`modalSessionHobby-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue='No Session Chosen' required onChange={(e) => handleSessionChange(index, 'hobby', e.target.value)}>
                                    <option value='No Session Chosen'>
                                        No Session Chosen
                                    </option>
                                    <optgroup label=" " />
                                    <optgroup label="Filter by Title:">
                                        {hobbyTitles.map((title, index) => {
                                            return (
                                                <option key={index} value={title}>{title}</option>
                                            )
                                        })}
                                    </optgroup>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={`modalSessionTime-${index}`} className="block my-2 text-sm font-medium text-gray-900 dark:text-white">{index + 1}. Total Session Time</label>
                                <input type='number' name={`modalSessionTime-${index}`} id={`modalSessionTime-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="90 minutes" required onChange={(e) => handleSessionChange(index, 'time', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <div>
                        <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white pr-5`} data-modal-toggle="crud-modal" onClick={addSession}>
                            Add another to this day
                        </button>
                    </div>
                    <div className="flex flex-row justify-between space-x-1 items-center">
                        <div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add New Session
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white pr-5`} data-modal-toggle="crud-modal" onClick={() => handleModalOpen('addhobby')}>
                                Create new Tracker
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}