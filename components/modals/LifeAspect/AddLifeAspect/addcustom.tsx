
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useStateStore } from "@/context/stateStore";
import { Spinner } from "@/components/misc/Spinner";
import { Detail } from "@/models/types/detail";
import AddDetails from "./helpers/addDetails";
import { useLifeAspectStore } from "@/context/lifeAspectStore";

export default function AddLifeAspect() {

    const lifeAspectDetails = useLifeAspectStore((state) => state.lifeAspectDetails);
    const setLifeAspectDetails = useLifeAspectStore((state) => state.setLifeAspectDetails);
    const {data: session} = useSession();
    const setOpenLifeAspectModal = useLifeAspectStore((state) => state.setOpenLifeAspectModal);
    const urlToUse = useStateStore((state) => state.urlToUse);
    const [loading, setLoading] = useState(false);
    const [childrenAmount, setChildrenAmount] = useState<Number[]>([]); //use index as position for each child

    const handleCreateLifeAspect = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        const form = e.currentTarget;
        const title = form['createCustomTitle'].value;
        const details = lifeAspectDetails;
        const user = session?.user?.email;

        if (!title) {
            console.log('Please make sure to add a title');
            return;
        }

        if (session === null || session === undefined) {
            console.log('Please log in to create a task');
            return;
        } else if (session.user === null || session.user === undefined) {
            console.log('Please log in to create a task');
            return;
        }

        const newLifeAspect = {
            title,
            details,
            user_email: session.user.email,
        } as any; //add type

        const response = await fetch(`${urlToUse}/api/createlifeaspect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLifeAspect),
        });

        if (!response.ok) {
            console.log('Failed to create task');
            return;
        }

        if (response.ok) {
            const res = await response.json();
            console.log('Task created', res);
            console.log('Task created', res.task);
            setOpenLifeAspectModal('');
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <Spinner />
            </div>
        )
    } else {
        return (
            <form className="flex flex-col h-full p-4 md:p-5 gap-4" onSubmit={handleCreateLifeAspect}>
                    <div className="flex-none">
                        <label htmlFor="createCustomTitle" className={`block text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Name</label>
                        <input type="text" name="createCustomTitle" id="createCustomTitle" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type a name" required/>
                    </div>
                    <div className="flex-grow overflow-auto scrollbar-thin scrollbar-webkit bg-gray-200 rounded-md px-2 space-y-2 py-4" style={{maxHeight: '40vh'}}>
                        {lifeAspectDetails.length === null || lifeAspectDetails.length === 0 ? (
                            <p className="text-xs md:text-sm text-gray-900 dark:text-white text-center"> ~ No Details of this Life Aspect Yet ~</p>
                        ) : (
                            lifeAspectDetails.map((field: Detail, index: number) => {
                                const title = field.title;
                                const type = field.type;
                                const htmlFor = `${title}input-${index}`;
                                return !field.typeCategory ? (
                                    <div key={`${field.title}${index}`} className="flex flex-col">
                                        <label htmlFor={htmlFor} className={`block text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>
                                            {title}
                                        </label>
                                        <div className="flex flex-row space-x-2">
                                            <input
                                                type={type}
                                                name={`${field.title}input-${index}`}
                                                id={`${field.title}input-${index}`}
                                                autoComplete='off'
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                                placeholder={field.title}
                                                required
                                            />
                                            <button type="button" name="removeDetailButton" id="removeDetailButton" className={`text-white inline-flex items-center bg-transparent hover:bg-red-300 font-medium rounded-lg text-base my-2 px-1 text-center`} onClick={() => {
                                                const newDetails = lifeAspectDetails.filter((detail, i) => i !== index);
                                                setLifeAspectDetails(newDetails);
                                            }}>
                                                <FiTrash2 color="black" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col" key={`${field.title}${index}`}>
                                        <div className="flex flex-row space-x-2 justify-between">
                                            <label htmlFor={field.title + index} className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>
                                                {`${childrenAmount[index] !== undefined && childrenAmount[index] !== null ? childrenAmount[index].toString() : '0'} Amount of Fields in This Category`}
                                            </label>
                                            <button type="button" name="removeDetailButton" id="removeDetailButton" className={`text-white inline-flex items-center bg-transparent hover:bg-red-300 font-medium rounded-lg text-base my-2 px-1 text-center`} onClick={() => {
                                                    const newDetails = lifeAspectDetails.filter((detail, i) => i !== index);
                                                    setLifeAspectDetails(newDetails);
                                                }}>
                                                    <FiTrash2 color="black" />
                                            </button>
                                        </div>
                                        <div className="text-xs">
                                            <AddDetails parent={`${field.title}${index}`} />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div className="border-b border-t border-gray-300 w-full">
                            <AddDetails parent="" />
                        </div>
                    </div>
                    <div className="flex-none">
                        <div className="flex flex-row justify-end w-full"> 
                            <button type="submit" id="submitLifeAspectButton" name="submitLifeAspectButton" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                                <svg className="me-1 -ms-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Create Life Aspect
                            </button>
                        </div>
                    </div>
            </form>
        );
    }
};