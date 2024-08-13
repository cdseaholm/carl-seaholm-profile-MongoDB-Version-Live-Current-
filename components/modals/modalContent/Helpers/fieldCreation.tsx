'use client'

import { useState, useEffect } from "react";

export 
function FieldCreation({ fieldMap, setFieldNames, setFieldInputs, setFieldTypes, fieldTypes, fieldInputs, fieldNames, objectReq, entryReq }: { fieldMap: number, setFieldNames: (e: string[]) => void, setFieldInputs: (e: any) => void, setFieldTypes: (e: string[]) => void, fieldTypes: string[], fieldInputs: any, fieldNames: string[], objectReq: boolean, entryReq: boolean }) {
    const [fieldPieces, setFieldPieces] = useState<any>([]);


    useEffect(() => {
        const newFieldPieces = Array.from({length: fieldMap}, (_, i) => {
            let fieldTypeSet = false;
            return (
            <div key={i} className="flex flex-row justify-evenly items-center w-full">
        
            <div key={i} className="flex flex-row justify-evenly items-center w-full">
                <input type="text" name={`fieldTitle${i}`} id={`fieldTitle${i}`} autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Field Name" required onChange={(e) => setFieldNames([...fieldNames, e.target.value])} />

                {objectReq ? (
                    <select name={`fieldType${i}`} id={`fieldType${i}`} className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} required onChange={(e) => {setFieldTypes([...fieldTypes, e.target.value]); fieldTypeSet = true}}>
                        <option key={0} value="" disabled selected>Select a type</option>
                        <option key={1} value="string">String</option>
                        <option key={2} value="number">Number</option>
                        <option key={3} value="boolean">Checkbox</option>
                        <option key={4} value="date">Date</option>
                        <option key={5} value="array">List</option>
                        <option key={6} value="object">Object</option>
                        <option key={7} value="image">Image</option>
                    </select>
                ): entryReq ? (
                    <>
                        <select name={`fieldType${i}`} id={`fieldType${i}`} className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} required onChange={(e) => {setFieldTypes([...fieldTypes, e.target.value]); fieldTypeSet = true}}>
                            <option key={0} value="" disabled selected>Select a type</option>
                            <option key={1} value="string">String</option>
                            <option key={2} value="number">Number</option>
                            <option key={3} value="boolean">Checkbox</option>
                            <option key={4} value="date">Date</option>
                            <option key={5} value="array">List</option>
                            <option key={6} value="object">Object</option>
                            <option key={7} value="image">Image</option>
                        </select>
                        {fieldTypeSet ? (
                            
                            <input type={fieldInputs[i]} name={`fieldValue${i}`} id={`fieldValue${i}`} autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Value" required onChange={(e) => setFieldInputs([...fieldInputs, e.target.value])} />
                        ):(
                            <p>Choose a type, then you may enter a value</p>
                        )}
                    </>
                ):(
                    <input type={fieldInputs[i]} name={`fieldValue${i}`} id={`fieldValue${i}`} autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Value" required onChange={(e) => setFieldInputs([...fieldInputs, e.target.value])} />
                )}
            </div>
        </div>
        )});
        setFieldPieces(newFieldPieces);
    }, [fieldMap]);

    return fieldPieces;
}