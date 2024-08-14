'use client'

import { FiMinusCircle } from "react-icons/fi";
import { fieldCreationTypes } from "../AddNewObject/addNewObject";

export function FieldCreation({ field, index, objectReq, entryReq, handleSetField, handleRemoveField }: { field: fieldCreationTypes, index: number, objectReq: boolean, entryReq: boolean, handleSetField: (newField: fieldCreationTypes) => void, handleRemoveField: (id: number) => void }) {

    const types = [
        '',
        'string',
        'number',
        'boolean',
        'date',
        'array',
        'object',
        'image'
    ];

    return (
        <div key={index} className="flex flex-row justify-evenly items-center w-full space-x-1">
            <button type="button" className="bg-transparent text-black text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-8 h-8 p-1.5 dark:bg-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500" onClick={() => handleRemoveField(field.id)}>
                <FiMinusCircle />
            </button>
            <input type="text" name={`fieldTitle${field.id}`} id={`fieldTitle${field.id}`} autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Field Name" required onChange={(e) => {
                handleSetField({ id: field.id, name: e.target.value, type: field.type, value: field.value });
            }}  defaultValue={field.name}/>

            {objectReq ? (
                <select name={`fieldType${field.id}`} id={`fieldType${field.id}`} className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} required defaultValue={field.type} onChange={(e) => {
                    handleSetField({ id: field.id, name: field.name, type: e.target.value, value: field.value });
                }}>
                    {types.map((type, index) => (
                        <option key={index} value={type}>{type === '' ? 'Select a type' : type}</option>
                    ))}
                </select>
            ) : entryReq ? (
                <div className="flex flex-row justify-evenly items-center space-x-2">
                    <select name={`fieldType${field.id}`} id={`fieldType${field.id}`} className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} required defaultValue={field.type} onChange={(e) => {
                        handleSetField({ id: field.id, name: field.name, type: e.target.value, value: field.value });
                    }}>
                        {types.map((type, index) => (
                            <option key={index} value={type}>{type === '' ? 'Select a type' : type}</option>
                        ))}
                    </select>
                    {field.type !== '' ? (

                        <input type={field.type} name={`fieldValue${field.id}`} id={`fieldValue${field.id}`} autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Value" required onChange={(e) => {
                            handleSetField({ id: field.id, name: field.name, type: field.type, value: e.target.value });
                        }} />
                    ) : (
                        <p>Choose a type, then you may enter a value</p>
                    )}
                </div>
            ) : (
                <input type={field.type} name={`fieldValue${field.id}`} id={`fieldValue${field.id}`} autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Value" required onChange={(e) => {
                    handleSetField({ id: field.id, name: field.name, type: field.type, value: e.target.value });
                }} />
            )}
        </div>

    );
}