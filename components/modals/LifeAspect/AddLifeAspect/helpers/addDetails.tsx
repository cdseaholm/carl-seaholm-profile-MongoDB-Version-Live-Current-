'use client'

import { FiX } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { useLifeAspectStore } from "@/context/lifeAspectStore";
import { useState } from "react";
import { Detail } from "@/models/types/detail";

export default function AddDetails() {

    const [detailName, setDetailName] = useState<string>('');
    const [detailType, setDetailType] = useState<string>('text');
    const lifeAspectDetails = useLifeAspectStore((state) => state.lifeAspectDetails);
    const setAddLifeAspectDetailBool = useLifeAspectStore((state) => state.setAddLifeAspectDetailBool);
    const setLifeAspectDetails = useLifeAspectStore((state) => state.setLifeAspectDetails);
    const addLifeAspectDetailBool = useLifeAspectStore((state) => state.addLifeAspectDetailBool);

    const handleAddDetail = async () => {

        if (!detailName === null || !detailName === undefined || detailName === '') {
            console.log('Please make sure to add a title');
            return;
        }

        const newDetail = {
            title: detailName,
            type: detailType,
            typeCategory: detailType === 'categoryWithin' ? true : false,
            children: detailType === 'categoryWithin' ? [] : null 
        } as Detail;

        if (newDetail !== null || newDetail !== undefined) {
            setLifeAspectDetails([...lifeAspectDetails, newDetail]);
        }

        console.log('New Detail', newDetail);
        console.log('Life Aspect Details', lifeAspectDetails);
        
        setAddLifeAspectDetailBool(false);
    }

    return (
        <>
            {!addLifeAspectDetailBool ? (
                <div className="flex flex-row justify-start w-full">    
                    <button type="button" name="addDetailButton" id="addDetailButton" className={`text-black inline-flex items-center hover:bg-stone-300 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 text-center flex-shrink`} onClick={() => {
                        setAddLifeAspectDetailBool(true);
                    }}>
                        <svg className="me-1 -ms-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add a Detail
                    </button>
                </div>
            ) : (
                <div className="flex flex-col span-2 space-x-2">
                    <div className="flex flex-row span-2 space-x-2 w-full">
                        <button type="button" name="closeDetailButton" id="closeDetailButton" className={`text-white inline-flex items-center bg-transparent hover:bg-red-300 font-medium rounded-lg text-base my-2 px-1 text-center`} onClick={() => {
                            setAddLifeAspectDetailBool(false);
                        }}>
                            <FiX color="black" />
                        </button>
                        <button type="button" id='addDetailButton' name="addDetailButton" className={`text-white inline-flex items-center bg-transparent hover:bg-green-300 font-medium rounded-lg text-base my-2 px-1 text-center`} onClick={() => handleAddDetail()}>
                            <FiCheck color="black" />
                        </button>
                        <input type="text" id="addDetailLabel" name="addDetailLabel" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 flex-grow`} placeholder="Type a name" required onChange={(e) => setDetailName(e.target.value)} />
                        <select name="createCustomType" id="createCustomType" className={`block p-2.5 text-xs md:text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} onChange={(e) => setDetailType(e.target.value)}>
                            <option className="text-ellipsis" value="text">Text</option>
                            <option className="text-ellipsis" value="number">Number</option>
                            <option className="text-ellipsis" value="date">Date</option>
                            <option className="text-ellipsis" value="time">Time</option>
                            <option className="text-ellipsis" value="textarea">Textarea</option>
                            <option className="text-ellipsis" value='categoryWithin'>Category</option>
                        </select>
                    </div>
                </div>
            )}
        </>
    )
}