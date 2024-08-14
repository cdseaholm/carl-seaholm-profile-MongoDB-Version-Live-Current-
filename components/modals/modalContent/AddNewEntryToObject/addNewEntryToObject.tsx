'use client'

import { useModalStore } from "@/context/modalStore";
import { toast } from "sonner";
import { useStore } from "@/context/dataStore";
import { IEntry } from "@/models/types/objectEntry";
import { CreateCustomEntry } from "@/utils/customFields/create";
import { IField } from "@/models/types/field";
import { Spinner } from "@/components/misc/Spinner";
import { useEffect, useState } from "react";
import { FieldCreation } from "../Helpers/fieldCreation";
import { IUserObject } from "@/models/types/userObject";
import { fieldCreationTypes } from "../AddNewObject/addNewObject";

export default function AddNewEntryToObject() {

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const modalParent = useModalStore((state) => state.modalParent);
    const userObjects = useStore((state) => state.userObjects);
    console.log('userObjects', userObjects);
    const [objectToUse, setObjectToUse] = useState<IUserObject | null>(modalParent !== '' ? userObjects.find((object) => object.title === modalParent) as IUserObject : null);

    const [fieldMap, setFieldMap] = useState<fieldCreationTypes[]>([]);
    const [extraFields, setExtraFields] = useState<fieldCreationTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [created, setCreated] = useState(false);
    const [selectedObject, setSelectedObject] = useState('Select an object');

    useEffect(() => {
        if (modalParent !== '') {
            console.log('modalParent', modalParent);
            const newFieldMap = userObjects.find((object) => object.title === modalParent)?.fields.map((field) => {
                let idCreate = -1;
                do {
                    idCreate = Math.random() as number;
                } while (fieldMap.some(field => field.id === idCreate) || extraFields.some(field => field.id === idCreate));

                return { id: idCreate, name: field.name, type: field.type, value: '' } as fieldCreationTypes
            });
            setSelectedObject(modalParent === '' ? 'Select an object' : modalParent);
            setFieldMap(newFieldMap || []);
        }
        setLoading(false);
    }, [modalParent, userObjects]);

    const handleCreateEntry = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (objectToUse === null) {
            toast.error('Make sure to pick an object');
            setLoading(false);
            return;
        }
        const form = e.currentTarget;
        const objectTitle = objectToUse.title;
        const title = form['entryTitle'].value;
        const date = form['entryDate'].value;
        const entryName = { name: `${objectToUse.fields.find(field => field.name === `fieldDefinition`)?.value}`, type: 'string', value: `${title}Entry`, mapPiece: false } as IField;
        const entryFields = [
            entryName,
            ...fieldMap.map((field) => {
                return { name: field.name, type: field.type, value: field.value, mapPiece: true } as IField;
            }),
            ...extraFields.map((field) => {
                return { name: field.name, type: field.type, value: field.value, mapPiece: true } as IField;
            })
        ];
        if (entryFields.map(field => field.name).includes('')) {
            toast.warning('Please make sure to fill out all fields');
            setLoading(false);
            return;
        }
        if (entryFields.map(field => field.type).includes('')) {
            toast.warning('Please make sure to select a type for all fields');
            setLoading(false);
            return;
        }

        if (!title) {
            toast.warning('Please make sure to add a title');
            setLoading(false);
            return;
        }

        const newEntry = {
            fields: entryFields as IField[],
            date: date
        } as IEntry;

        const createEntry = await CreateCustomEntry({ entry: newEntry, objectTitle: objectTitle });

        if (!createEntry.created) {
            toast.error(createEntry.message);
            setLoading(false);
            return;
        }
        if (createEntry.created) {
            toast.success('Task created');
            setCreated(true);
            setLoading(false);
        }
    }

    const handleSetField = (newField: fieldCreationTypes) => {
        const newFields = fieldMap.map(field => {
            if (field.id === newField.id) {
                return newField;
            }
            return field;
        });
        setFieldMap(newFields);
    };

    const handleSetExtraField = (newField: fieldCreationTypes) => {
        const newFields = extraFields.map(field => {
            if (field.id === newField.id) {
                return newField;
            }
            return field;
        });
        setExtraFields(newFields);
    };

    const handleNewField = () => {
        let idCreate = -1;
        do {
            idCreate = Math.random() as number;
        } while (fieldMap.some(field => field.id === idCreate) || extraFields.some(field => field.id === idCreate));

        const newField = { id: idCreate, name: '', type: '', value: 'null' } as fieldCreationTypes;
        setExtraFields([...extraFields, newField]);
    }

    const handleRemoveField = (id: number) => {
        const newFields = fieldMap.filter(field => field.id !== id);
        setFieldMap(newFields);
    }

    const handleRemoveExtraField = (id: number) => {
        const newFields = extraFields.filter(field => field.id !== id);
        setExtraFields(newFields);
    }


    return (
        loading ? (
            <Spinner />
        ) : created ? (
            <div className="flex flex-col">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">Task created</h3>
                <div className="flex flex-row justify-evenly items-center mt-4">
                    <button onClick={() => { setCreated(false) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add another task
                    </button>
                    <button onClick={() => { setModalParent(''); setModalOpen('') }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Close
                    </button>
                </div>
            </div>
        ) : (
            <form className="p-4 md:p-5" onSubmit={handleCreateEntry}>
                <div className="grid gap-4 mb-4 grid-cols-1">
                    <label htmlFor="entryParent" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Object to place Entry into</label>
                    <select
                        name="entryParent"
                        id="entryParent"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                        required
                        onChange={(e) => { setSelectedObject(e.target.value); setObjectToUse(userObjects.find(obj => obj.title === e.target.value) as IUserObject) }}
                        value={selectedObject}
                    >
                        <option key={0} value="" disabled>Select an object</option>
                        {userObjects.map((object) => (
                            <option key={object.title} value={object.title}>{object.title}</option>
                        ))}
                    </select>

                    <label htmlFor="entryTitle" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Task Name</label>
                    <input type="text" name="entryTitle" id="entryTitle" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type a name" required />

                    <label htmlFor="entryDate" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Date</label>
                    <input type="date" name="entryDate" id="entryDate" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} required />

                    {fieldMap.map((field, index) => {
                        return (
                            <div key={field.id} className="flex flex-row justify-evenly items-center w-full">
                                <FieldCreation field={field} index={index} objectReq={true} entryReq={false} handleSetField={handleSetField} handleRemoveField={handleRemoveField} />
                            </div>
                        )
                    })}

                    {extraFields.map((field, index) => (
                        <div key={field.id} className="flex flex-row justify-evenly items-center w-full">
                            <FieldCreation field={field} index={index} objectReq={true} entryReq={false} handleSetField={handleSetExtraField} handleRemoveField={handleRemoveExtraField} />
                        </div>
                    ))}

                    <button type="button" className={`text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-1/3`} onClick={() => handleNewField()}>
                        Add Field ONLY to this Entry
                    </button>

                    <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/3`}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add Entry
                    </button>
                </div>
            </form>
        )
    );

};