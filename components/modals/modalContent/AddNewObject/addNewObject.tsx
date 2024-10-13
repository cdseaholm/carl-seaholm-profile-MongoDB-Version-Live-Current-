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

export type fieldCreationTypes = {
    id: number;
    name: string;
    type: string;
    value: string;
}

export default function AddNewObject() {

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);
    const [fieldMap, setFieldMap] = useState<fieldCreationTypes[]>([]);

    const handleCreateObject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const title = form['newObjectTitle'].value;
        const entryDefinition = `${title}Entry`;
        let mapToPass = [{ name: 'fieldDefinition', type: 'string', value: entryDefinition, mapPiece: false }] as IField[];
        const fieldNames = fieldMap?.map(field => field.name) as string[];
        if (fieldNames.includes('')) {
            toast.warning('Please make sure to fill out all fields');
            setLoading(false);
            return;
        }
        const fieldTypes = fieldMap?.map(field => field.type) as string[];
        if (fieldTypes.includes('')) { 
            toast.warning('Please make sure to select a type for all fields');
            setLoading(false);
            return;
        }
        const fieldInputs = fieldMap?.map(field => field.value) as string[];

        for (let i = 0; i < fieldMap.length; i++) {
            const oldFields = mapToPass;
            mapToPass = [...oldFields, { name: fieldNames[i], type: fieldTypes[i], value: fieldInputs[i], trackable: false, mapPiece: true }] as IField[];
        }

        if (!title) {
            toast.warning('Please make sure to add a title');
            setLoading(false);
            return;
        }

        const newObject = {
            title: title as string,
            entries: [] as IEntry[],
            fields: mapToPass as IField[],
        } as IUserObject;

        console.log('newObject', newObject);

        const createObject = await CreateCustomObject({ object: newObject });

        console.log('createObject', createObject);
        if (!createObject.created) {
            toast.error(createObject.message);
            setLoading(false);
            return;
        }

        setCreated(true);
        const parent = newObject.title as string;
        setModalParent(parent);
        setLoading(false);
        toast.success('Object created');
        console.log('parent', parent);
    }

    const handleSetField = (newField: fieldCreationTypes) => {
        const newFields = fieldMap.map(field => {
            if (field.id === newField.id) {
                return newField;
            }
            return field;
        });
        setFieldMap(newFields);
    }

    const handleNewField = () => {
        let idCreate = -1;
        do {
            idCreate = Math.random() as number;
        } while (fieldMap.some(field => field.id === idCreate));

        const newField = { id: idCreate, name: '', type: '', value: 'null' } as fieldCreationTypes;
        if (fieldMap.length === 0) {
            setFieldMap([newField]);
            return;
        }
        setFieldMap([...fieldMap, newField]);
    }

    const handleRemoveField = (id: number) => {
        const newFields = fieldMap.filter(field => field.id !== id);
        setFieldMap(newFields);
    }


    return (
        loading ? (
            <Spinner />
        ) : created ? (
            <div className="flex flex-row justify-evenly items-center w-full">
                <button className="p-4 md:p-5 text-center text-green-600 dark:text-green-400" onClick={() => { setModalParent(''); setModalOpen('') }}>
                    Close
                </button>
                <button className="p-4 md:p-5 text-center text-green-600 dark:text-green-400" onClick={() => { setModalOpen('addNewEntryToObject') }}>
                    Add Entry?
                </button>
            </div>
        ) : (
            <form className="p-4 md:p-5" onSubmit={handleCreateObject}>
                <div className="grid gap-4 mb-4 grid-cols-1">

                    <div>
                        <label htmlFor="newObjectTitle" className={`block text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>
                            Title
                        </label>
                        <input type="text" name="newObjectTitle" id="newObjectTitle" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type a name" required />
                    </div>

                    <div className="flex flex-col space-y-2 w-full h-full">
                        <p className={`block text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>
                            Fields
                        </p>
                        {fieldMap.map((field, index) => (
                            <div key={field.id} className="flex flex-row justify-evenly items-center w-full">
                                <FieldCreation field={field} index={index} objectReq={true} entryReq={false} handleSetField={handleSetField} handleRemoveField={handleRemoveField} />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row w-full items-center justify-evenly text-center">
                        <button type="button" className={`text-black items-center hover:bg-gray-400 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-2 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 text-center border border-gray-300 w-1/3`} onClick={() => handleNewField()}>
                            <p className="w-full">+ Add Field</p>
                        </button>

                        <button type="submit" className={`text-white items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/3`}>
                            <p className="w-full">+ Create Object</p>
                        </button>
                    </div>
                </div>
            </form>
        )
    );
};