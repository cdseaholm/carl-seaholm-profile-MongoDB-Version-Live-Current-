'use client'

import { signOut } from 'next-auth/react';
import React from 'react';
import { useAlertStore } from '@/context/alertStore';
import { useModalStore } from '@/context/modalStore';
import { da } from 'date-fns/locale';
import { useStateStore } from '@/context/stateStore';

export default function AlertModal() {
  

    const alertParent = useAlertStore((state) => state.alertParent);
    const setAlertParent = useAlertStore((state) => state.setAlertParent);
    const showAlert = useAlertStore((state) => state.showAlert);
    const setShowAlert = useAlertStore((state) => state.setShowAlert);
    const alertMessage = useAlertStore((state) => state.alertMessage);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const resetAlert = useAlertStore((state) => state.resetAlert);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const setDashToShow = useStateStore((state) => state.setDashToShow);

    const handleFirstButton = () => {
        if (alertParent === 'calendar') {
            setModalParent('calendar');
            setModalOpen('logsession');
        }
        resetAlert();
    }

    const handleSecondButton = () => {
        if (alertParent === 'logout') {
            signOut();
        } else if (alertParent === 'calendar') {
            setDashToShow('calendar');
        }
        resetAlert();
    }

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${showAlert ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-100 max-h-full backdrop-blur-sm`}>
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
                    <div className='flex flex-col font-bold w-full'>
                        <div className='flex flex-row justify-center items-center text-center w-full'>
                            {alertMessage}
                        </div>
                        <div className="flex flex-row justify-between px-5 py-5">
                            <button className={`text-black inline-flex items-center ring-gray-700 hover:ring-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:ring-gray-600 dark:hover:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-500`} onClick={handleFirstButton}>
                                {alertParent === 'calendar' ? 'Add Hobbies' : 'Cancel'}
                            </button>
                            <button type="button" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={handleSecondButton}>
                                {alertParent === 'logout' ? 'Continue' : 
                                 alertParent === 'calendar' ? 'View Hobbies Already Added' :
                                 'Okay'}
                            </button>
                        </div>
                </div>
            </div>
        </div> 
    </div>
    )
}