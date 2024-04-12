'use client'

import { useModalContext } from '@/app/context/modal/modalContext';
import { useSession } from '@/app/context/session/SessionContext';
import useMediaQuery from '@/components/listeners/WidthSettings';
import React from 'react'

export default function AlertModal() {
  
    const isBreakpoint = useMediaQuery(768);
    const textSize = isBreakpoint ? 'text-xs' : 'text-sm';
    const { showAlert, setShowAlert, alertParent, alertMessage, setAlertParent } = useModalContext();
    const { setUser } = useSession();
    const logoutAlert = alertParent === 'logout' ? true : false;

    const handleAlertAccept = () => {
        if (alertParent === 'logout') {
            setUser(null);
            setAlertParent('');
            setShowAlert(false);
        } else {
            setShowAlert(false);
        }
    }

    return (
        <>
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${showAlert ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-gray-400 rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                        <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setShowAlert(false)}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className='flex flex-col items-center justify-center font-bold'>
                        {alertMessage}
                    </div>
                        <div className="flex flex-row justify-between px-5 py-5">
                            <button className={`text-black inline-flex items-center ring-gray-700 hover:ring-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg ${textSize} px-3 py-1.5 text-center dark:ring-gray-600 dark:hover:ring-gray-700 dark:focus:ring-gray-700`} onClick={() => setShowAlert(false)}>
                                Cancel
                            </button>
                            <button type="button" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ${textSize} px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={handleAlertAccept}>
                                {logoutAlert ? 'Continue' : 'Okay'}
                            </button>
                        </div>
                </div>
            </div>
        </div> 
        </>
    )
}