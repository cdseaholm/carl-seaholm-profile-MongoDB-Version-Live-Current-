'use client'

import { useSession } from "@/app/SessionContext";
import useMediaQuery from "@/components/listeners/WidthSettings";
import login from "@/lib/auth/login/login";
import { Hobby } from "@/types/hobby";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ModalLogin({ children, attemptLogin }: { show: boolean; children: React.ReactNode; attemptLogin: any;}) {

    const isBreakpoint = useMediaQuery(768);
    const textSize = isBreakpoint ? 'text-xs' : 'text-sm';

    const [show, setModalOpen] = useState(false);
    const { setSession, setUser, user, session } = useSession();
    const router = useRouter();

    const handleSubmit = () => async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit function called');
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (user || user && session) {
            alert('You are already logged in');
            return;
        }
        const loggedin = await login({ formData });

        if (typeof loggedin === 'string') {
            alert(loggedin);
            console.log(loggedin);
        } else if (typeof loggedin === 'string' && loggedin === 'Password is incorrect') {
            console.log('incorrectPW', loggedin);
            alert('Password is incorrect');
        } else {
            setSession(loggedin.session);
            setUser(loggedin.user);
            router.push("/dashboard");
        }
    };

    return (
        <>
        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${show ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className={`${isBreakpoint ? '' : 'text-lg'} font-semibold text-gray-900 dark:text-white`}>
                            Sign in
                        </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setModalOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                    </div>
                    <form className="p-4 md:p-5" onSubmit={attemptLogin}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                                <label htmlFor="name" className={`block my-2 ${textSize} font-medium text-gray-900 dark:text-white`}>Name this Tracker</label>
                                <input type="text" name="name" id="name" className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${textSize}`} placeholder="Type a name" required/>
                            <div className="col-span-2 sm:col-span-1">
                                <div className="flex flex-row justify-between">
                                    <label htmlFor="category" className={`block my-2 ${textSize} font-medium text-gray-900 dark:text-white`}>Category</label>
                                    </div>
                            </div>
                            <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ${textSize} px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add new Tracker
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
        </>
    )
}