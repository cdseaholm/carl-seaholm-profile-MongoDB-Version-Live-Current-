'use client'

import ModalLogin from "../modalContent/Login/loginModal";
import SignupModal from "../modalContent/signup/signupModal";
import ModalSubscribe from "../modalContent/subscribe/subscribeModal";
import ActionsModal from "../modalContent/Actions/actionsmodal";
import EditUser from "../modalContent/EditUser/editUser";
import AddRecipes from "../modalContent/Recipes/Add";
import { useModalStore } from "@/context/modalStore";
import ForgotPassword from "../modalContent/forgotpassword/forgotPassword";
import ChangePassword from "../modalContent/changePassword/changePassword";
import HobbyModalDataInit from "../modalContent/AddHobbyTracker/hobbymodaldatainit";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";


export default function MainModal() {

    //context
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const modalOpen = useModalStore((state) => state.modalOpen);
    const modalParent = useModalStore((state) => state.modalParent);
    const setModalParent = useModalStore((state) => state.setModalParent);

    //variables
    const secondActionNeeded = modalParent === 'actions' ? true : false;

    const modalTitleProp =
        modalOpen === 'login' ? 'Login' :
            modalOpen === 'signup' ? 'Sign Up' :
                modalOpen === 'subscribe' ? 'Subscribe' :
                    modalOpen === 'addhobby' ? 'Add Hobby Tracker' :
                        modalOpen === 'actions' ? 'Actions' :
                            modalOpen === 'dashdropdown' ? 'Menu' :
                                modalOpen === 'edituser' ? 'Edit User' :
                                    modalOpen === 'addrecipe' ? 'Add Recipe' :
                                        modalOpen === 'addtask' ? 'Add Task' :
                                            modalOpen === 'addcustom' ? 'Add Custom' :
                                                modalOpen === 'addNewObject' ? 'Add New Object' :
                                                    modalOpen === 'addNewEntryToObject' ? 'Add New Entry' :
                                                        modalOpen === 'forgotpassword' ? 'Forgot Password' :
                                                            modalOpen === 'changepassword' ? 'Change Password' :
                                                                '';

    const handleBack = () => {
        if (modalParent === 'actions') {
            setModalOpen('actions');
        } else {
            setModalOpen('');
        }
        setModalParent('');
    };

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden={modalOpen !== '' && modalOpen !== 'logsession' ? "false" : "true"} className={`${modalOpen !== '' && modalOpen !== 'logsession' ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full max-h-full backdrop-blur-sm`}>
            <div className={`relative p-4 w-full max-w-md max-h-full`}>
                <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}>
                    <div className={`flex items-center justify-between space-x-4 p-2 border-b rounded-t border-gray-400 w-full`}>
                        {secondActionNeeded &&
                            <button onClick={() => handleBack()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                        }
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white`}>
                            {modalOpen !== 'actions' && modalOpen !== 'logsession' && modalTitleProp}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => { setModalOpen(''); setModalParent('') }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <>
                        {modalOpen !== '' && modalOpen !== 'logsession' &&
                            <>
                                {modalOpen === 'login' && <ModalLogin />}
                                {modalOpen === 'signup' && <SignupModal />}
                                {modalOpen === 'subscribe' && <ModalSubscribe />}
                                {modalOpen === 'addhobby' && <HobbyModalDataInit />}
                                {modalOpen === 'actions' && <ActionsModal />}
                                {modalOpen === 'edituser' && <EditUser />}
                                {modalOpen === 'addrecipe' && <AddRecipes />}
                                {/**{modalOpen === 'addNewObject' && <AddNewObject />} */}
                                {/**{modalOpen === 'addNewEntryToObject' && <AddNewEntryToObject />} */}
                                {modalOpen === 'forgotpassword' && <ForgotPassword />}
                                {modalOpen === 'changepassword' && <ChangePassword />}
                            </>
                        }
                    </>
                </div>
            </div>
        </div>
    )
}