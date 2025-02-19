'use client'

import { FiTrash } from "react-icons/fi";

export default function LogSessionModal({ formattedDate, handleCreate, hobbyTitles, handleModalOpen, sessions, addSession, handleSessionChange, handleRemoveItem, handleResetSessions }: { formattedDate: string, handleCreate: (event: React.FormEvent<HTMLFormElement>) => void, hobbyTitles: string[], handleModalOpen: (title: string) => void, sessions: { hobby: string, time: string }[], addSession: () => void, handleSessionChange: (index: number, field: string, value: string) => void, handleRemoveItem: (i: number) => void, handleResetSessions: () => void }) {

    const defaultTimes = [
        '5',
        '10',
        '15',
        '20',
        '30',
        '45',
        '60',
        '120',
        '180'
    ]

    return (
        <div style={{ maxHeight: '80dvh', overflowY: 'auto' }}>
            <form className="p-4 md:p-5" onSubmit={handleCreate}>
                <div className="grid gap-2 mb-4 grid-cols-1">
                    <div>
                        <label htmlFor="modalSessionDate" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Session Date</label>
                        <input type="date" name="modalSessionDate" id="modalSessionDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='01/01/2024' required defaultValue={formattedDate ? formattedDate : ''} />
                    </div>
                    {sessions && sessions.map((session, index) => (
                        <div key={index} className="flex flex-row items-start justify-center space-x-2 border-2 box-content border-white/30 p-4 rounded-md">
                            <div className="flex flex-col justify-start space-y-12 items-center">
                                <p className="text-sm font-medium text-gray-900 dark:text-white my-2 pb-12">
                                    {index + 1}.
                                </p>
                                {index === 0 && <FiTrash aria-disabled size={20} color="gray" />}
                                {index > 0 && <FiTrash className="cursor-pointer" size={20} color="white" onClick={() => handleRemoveItem(index)} />}
                            </div>
                            <div className="w-full h-full bg-neutral-200 dark:bg-transparent p-2 rounded-md mx-4 border border-neutral-300">
                                <div>
                                    <label htmlFor={`modalSessionHobby-${index}`} className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Hobby Session</label>
                                    <select name={`modalSessionHobby-${index}`} id={`modalSessionHobby-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" defaultValue={session.hobby || 'No Session Chosen'} required onChange={(e) => handleSessionChange(index, 'hobby', e.target.value)}>
                                        <option value='No Session Chosen'>
                                            No Session Chosen
                                        </option>
                                        <optgroup label=" " />
                                        <optgroup label="Filter by Title:">
                                            {hobbyTitles && hobbyTitles.map((title, idx) => {
                                                return (
                                                    <option key={idx} value={title}>{title}</option>
                                                )
                                            })}
                                        </optgroup>
                                    </select>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-between items-center w-full h-content">
                                        <label htmlFor={`modalSessionTime-${index}`} className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Total Session Time</label>
                                        {defaultTimes.map((time, keyIndex) => {
                                            return (
                                                <button type="button" className="cursor-pointer hover:underline text-sm text-black dark:text-white" onClick={() => handleSessionChange(index, 'time', time)} key={keyIndex}>
                                                    {time}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <input type='number' name={`modalSessionTime-${index}`} id={`modalSessionTime-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="90 minutes" required value={session.time} onChange={(e) => handleSessionChange(index, 'time', e.target.value)} />
                                </div>
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
                                {`Add New ${sessions.length > 1 ? 'Sessions' : 'Session'}`}
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white pr-5`} data-modal-toggle="crud-modal" onClick={() => { handleModalOpen('addhobby'); handleResetSessions() }}>
                                Create new Tracker
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}