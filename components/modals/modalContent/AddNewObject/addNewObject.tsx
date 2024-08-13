'use client'

import { useModalStore } from "@/context/modalStore";
import { IUserObject } from "@/models/types/userObject";
import { IEntry } from "@/models/types/objectEntry";
import { toast } from "sonner";
import { IField } from "@/models/types/field";
import { useState } from "react";
import { Spinner } from "@/components/misc/Spinner";
import { CreateCustomObject } from "@/utils/customFields/create";
import { FieldCreation } from "../Helpers/fieldCreation";

export default function AddNewObject() {

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);
    const [fieldMap, setFieldMap] = useState(0);
    const [fieldNames, setFieldNames] = useState<string[]>([]);
    const [fieldTypes, setFieldTypes] = useState<string[]>([]);
    const [fieldInputs, setFieldInputs] = useState<any>([]);

    const handleCreateObject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const title = form['newObjectTitle'].value;
        const entryDefinition = `${title}Entry`;
        let mapToPass = [{name: 'fieldDefinition', type: 'string', value: entryDefinition, mapPiece: false}] as IField[];

        for (let i = 0; i < fieldMap; i++) {
            const oldFields = mapToPass;
            mapToPass = [...oldFields, {name: fieldNames[i], type: fieldTypes[i], value: fieldInputs[i], mapPiece: true}] as IField[];
        }

        if (!title) {
            toast.warning('Please make sure to add a title');
            setLoading(false);
            return;
        }

        const newObject = {
            title,
            entries: [] as IEntry[],
            fields: mapToPass as IField[],
        } as IUserObject;

        const createObject = await CreateCustomObject({ object: newObject });

        if (createObject.created) {
            setCreated(true);
            setModalParent(newObject.title);
            setLoading(false);
            toast.success('Object created');
        } else {
            toast.error(createObject.message);
            setLoading(false);
        }
    }


    return (
        loading ? (
            <Spinner />
        ) : created ? (
            <div className="flex flex-row justify-evenly items-center w-full">
                <button className="p-4 md:p-5 text-center text-green-600 dark:text-green-400" onClick={() => {setModalParent(''); setModalOpen('')}}>
                    Close
                </button>
                <button className="p-4 md:p-5 text-center text-green-600 dark:text-green-400" onClick={() => {setModalOpen('addNewEntryToObject')}}>
                    Add Entry?
                </button>
            </div>
        ) : (
            <form className="p-4 md:p-5" onSubmit={handleCreateObject}>
                <div className="grid gap-4 mb-4 grid-cols-1">
                    <label htmlFor="newObjectTitle" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>
                        Title
                    </label>

                    <input type="text" name="newObjectTitle" id="newObjectTitle" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type a name" required />

                    {fieldMap > 0 && (
                        <FieldCreation fieldMap={fieldMap} setFieldInputs={setFieldInputs} setFieldNames={setFieldNames} setFieldTypes={setFieldTypes} fieldInputs={fieldInputs} fieldNames={fieldNames} fieldTypes={fieldTypes} objectReq={true} entryReq={false}/>
                    )}

                    <button type="button" className={`text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-1/3`} onClick={() => setFieldMap(fieldMap + 1)}>
                        Add Field
                    </button>

                    <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/3`}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add Object
                    </button>
                </div>
            </form>
        )
    );
};