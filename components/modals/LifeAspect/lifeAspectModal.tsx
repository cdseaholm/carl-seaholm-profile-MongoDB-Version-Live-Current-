'use client'

import { FiArrowLeft } from "react-icons/fi";
import AddLifeAspect from "./AddLifeAspect/addcustom";
import { useLifeAspectStore } from "@/context/lifeAspectStore";


export default function LifeAspectModal() {

    //context
    const lifeAspectName = useLifeAspectStore((state) => state.lifeAspectName);
    const lifeAspectParent = useLifeAspectStore((state) => state.lifeAspectParent);
    const setLifeAspectParent = useLifeAspectStore((state) => state.setLifeAspectParent);
    const setOpenLifeAspectModal = useLifeAspectStore((state) => state.setOpenLifeAspectModal);
    const openLifeAspectModal = useLifeAspectStore((state) => state.openLifeAspectModal);

    //variables
    const secondActionNeeded = lifeAspectParent === 'calendar' || lifeAspectParent === 'actions' ? true : false;
    
    const handleBack = () => {
        setOpenLifeAspectModal('');
    };

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${openLifeAspectModal !== '' ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full max-h-full backdrop-blur-sm`}>
            <div className={`relative p-4 ${openLifeAspectModal === 'addcustom' ? '' : 'w-full max-w-md'} max-h-full flex flex-col`} style={{width: `${openLifeAspectModal === 'addcustom' ? '80%' : ''}`, overflow: 'hidden'}}>
                <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col`} style={{maxHeight: '70vh'}}>
                    <div className={`flex items-center justify-between space-x-4 p-2 border-b rounded-t border-gray-400 w-full`}>
                        {secondActionNeeded &&
                            <button onClick={() => handleBack()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <FiArrowLeft className="w-5 h-5" />
                            </button>
                        }
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white`}>
                            {lifeAspectName}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => {setOpenLifeAspectModal(''); setLifeAspectParent('')}}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                        <div className="flex flex-col h-4/5 overflow-hidden">
                                {openLifeAspectModal !== '' &&
                                <>
                                {openLifeAspectModal === 'addcustom' && <AddLifeAspect />}
                                </>
                                }
                        </div>
                 
                    </div>
                </div>
            </div>
    )
}