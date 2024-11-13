'use client'

import { useModalStore } from "@/context/modalStore";
import { CheckAdminBool } from "@/utils/helpers/adminBool";
import SendTempPW from "@/utils/userHelpers/temppw";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ForgotPassword() {

    //context
    const setModalOpen = useModalStore((state) => state.setModalOpen);

    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const [adminBool, setAdminBool] = useState<boolean>(false);

    //state
    const [signInError, setSignInError] = useState<string>('');

    //functions
    const handleOpenSub = () => {
        setModalOpen('subscribe');
    }

    useEffect(() => {
        const getBool = async () => {
            const adminBool = await CheckAdminBool(email);
            setAdminBool(adminBool);
        }
        getBool();
    }, [email, setAdminBool]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handleSubmit function called');
        try {
            
            if (session?.user !== null && session?.user !== undefined) {
                alert('You are already logged in');
                return;
            }

            const email = event.currentTarget['modalChangePEmail'].value;

            if (!adminBool) {
                setSignInError('Not authorized');
                return;
            }

            await SendTempPW(email);
            
            setModalOpen('');
            
        } catch (error) {
            console.log('Error logging in', error);
            setSignInError('Email or password is incorrect');
        }
    }

    return (
        <form id="loginForm" className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-6 grid-cols-2">
                <label htmlFor="modalChangePEmail" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Email</label>
                <input type="email" name="modalChangePEmail" id="modalChangePEmail" autoComplete='email' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Email" required/>

            </div>
            <div className="flex flex-row justify-between px-5 items-center">
                <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                    Send Temp Password
                </button>
                <div>
                {
                    signInError ? 
                        <p className="text-red-500 text-xs md:text-sm">
                            {signInError}
                        </p>
                    : 
                        ' '
                }
                </div>
            </div>
            <div className="flex flex-row justify-around items-center space-y-1 pt-5">
                <div className="text-sky-700 cursor-pointer text-sm hover:text-gray-700" onClick={() => setModalOpen('login')}>
                    Back to login
                </div>
                {/*<div className="text-sky-700 cursor-pointer text-sm hover:text-gray-700" onClick={() => {console.log('createClicked')}}>
                    Create an account here
                </div>**/}
                <div className="text-sky-700 cursor-pointer text-sm hover:text-gray-700" onClick={handleOpenSub}>
                    Subscribe here
                </div>
            </div>
        </form>
    )
}