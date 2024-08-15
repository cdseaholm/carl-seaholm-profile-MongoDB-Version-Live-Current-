'use client'

import { signOut } from 'next-auth/react';
import React from 'react';
import { useAlertStore } from '@/context/alertStore';
import { useModalStore } from '@/context/modalStore';
import { FiArrowLeft } from "react-icons/fi";
import { useHobbyStore } from '@/context/hobbyStore';

export default function AlertModal() {
  
    //context
    const alertParent = useAlertStore((state) => state.alertParent);
    const showAlert = useAlertStore((state) => state.showAlert);
    const setShowAlert = useAlertStore((state) => state.setShowAlert);
    const alertMessage = useAlertStore((state) => state.alertMessage);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const resetAlert = useAlertStore((state) => state.resetAlert);
    const setDashToShow = useHobbyStore((state) => state.setDashToShow);
    const selectedDay = useModalStore((state) => state.daySelected);

    //variables

    //functions
    const handleFirstButton = () => {
        if (alertParent === 'calendar') {
            setModalOpen('logsession');
        }
        resetAlert();
    }

    const handleSecondButtonCalendar = async () => {
        setDashToShow('calendar');
        resetAlert();
    }

    const handleSecondButtonLogout = async () => {
        try {
          await signOut();
        } catch (error) {
          console.error('Error signing out:', error);
        } finally {
          resetAlert();
        }
    }

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden={!showAlert} className={`${showAlert ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-100 max-h-full backdrop-blur-sm`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-gray-400 rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                        {alertParent === 'calendar' ?
                        (<button>
                            <FiArrowLeft className="text-white" onClick={() => {resetAlert(); setModalOpen('calendar')}}/>
                        </button>) : null}
                        <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setShowAlert(false)}>
                            <svg className="w-3 h-3" aria-hidden={!showAlert} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
                            <button className={`text-black inline-flex items-center font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center hover:bg-gray-500`} onClick={handleFirstButton}>
                                {alertParent === 'calendar' ? `Log session on ${selectedDay}` : 'Cancel'}
                            </button>
                            <button type="button" className={`text-black inline-flex items-center hover:bg-gray-500 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center`} onClick={alertParent === 'calendar' ? handleSecondButtonCalendar : handleSecondButtonLogout}>
                                {alertParent === 'logout' ? 'Continue' : 
                                 alertParent === 'calendar' ? `View Hobbies on ${selectedDay}` :
                                 'Okay'}
                            </button>
                        </div>
                </div>
            </div>
        </div> 
    </div>
    )
}