'use client'

import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ModalLogin from "../modalContent/Login/loginModal";
import SignupModal from "../modalContent/signup/signupModal";
import ModalSubscribe from "../modalContent/subscribe/subscribeModal";
import LogSessionModal from "../modalContent/LogSession/logsession";
import ModalHobby from "../modalContent/AddHobbyTracker/hobbymodal";
import ActionsModal from "../modalContent/Actions/actionsmodal";
import EditUser from "../modalContent/EditUser/editUser";
import CalendarModal from "../modalContent/Calendar/calendarmodal";
import AddRecipes from "../modalContent/Recipes/Add";
import AddTask from "../modalContent/AddTask/addtaskmodal";
import { useModalStore } from "@/context/modalStore";
import { useStateStore } from "@/context/stateStore";


export default function MainModal() {

    const [selectedOption, setSelectedOption] = useState<string>('');
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const modalOpen = useModalStore((state) => state.modalOpen);
    const loading = useStateStore((state) => state.loading);
    const modalParent = useModalStore((state) => state.modalParent);
    const setLoading = useStateStore((state) => state.setLoading);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const secondActionNeeded = modalParent === 'calendar' || modalParent === 'actions' ? true : false;

    const modalTitleProp = 
        modalOpen === 'login' ? 'Login' : 
        modalOpen === 'signup' ? 'Sign Up' : 
        modalOpen === 'subscribe' ? 'Subscribe' : 
        modalOpen === 'logsession' ? 'Log Session' : 
        modalOpen === 'addhobby' ? 'Add Hobby Tracker' : 
        modalOpen === 'actions' ? 'Actions' : 
        modalOpen === 'dashdropdown' ? 'Menu' : 
        modalOpen === 'edituser' ? 'Edit User' :
        modalOpen === 'calendar' ? 'Calendar' :
        modalOpen === 'addrecipe' ? 'Add Recipe' :
        modalOpen === 'addtask' ? 'Add Task' :
        '';

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };
    
    const handleBack = () => {
        if (modalParent === 'actions') {
            setModalOpen('actions');
        } else if (modalParent === 'calendar') {
            setModalOpen('calendar');
        } else {
            setModalOpen('');
        }
        setModalParent('');
    };

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${modalOpen !== '' ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full max-h-full backdrop-blur-sm`}>
            <div className={`relative p-4 ${modalOpen === 'calendar' ? '' : 'w-full max-w-md'} max-h-full`} style={{width: `${modalOpen === 'calendar' ? '95%' : ''}`}}>
                <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}>
                    <div className={`flex items-center justify-between space-x-4 p-2 border-b rounded-t border-gray-400 w-full`}>
                        {secondActionNeeded &&
                            <button onClick={() => handleBack()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <FiArrowLeft className="w-5 h-5" />
                            </button>
                        }
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white`}>
                            {modalOpen !== 'actions' && modalTitleProp}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => {setModalOpen(''); setModalParent('')}}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-10 h-10 border-2 border-t-primary-500 rounded-full animate-spin"/>
                        </div>
                    ) : (
                        <>
                        {modalOpen !== '' &&
                        <>
                        {modalOpen === 'login' && <ModalLogin />}
                        {modalOpen === 'signup' && <SignupModal />}
                        {modalOpen === 'subscribe' && <ModalSubscribe />}
                        {modalOpen === 'logsession' && <LogSessionModal />}
                        {modalOpen === 'addhobby' && <ModalHobby />}
                        {modalOpen === 'actions' && <ActionsModal />}
                        {modalOpen === 'edituser' && <EditUser />}
                        {modalOpen === 'calendar' &&
                            <div style={{height: '85%'}}> 
                                <CalendarModal />
                            </div>
                        }
                        {modalOpen === 'addrecipe' && <AddRecipes />}
                        {modalOpen === 'addtask' &&
                        <AddTask />
                        }
                        </>
                        }
                        </>
                    )}
                    </div>
                </div>
            </div>
    )
}