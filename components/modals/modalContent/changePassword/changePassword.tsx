'use client'

import { useModalStore } from "@/context/modalStore";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ChangePassword() {

    //context
    const setModalOpen = useModalStore((state) => state.setModalOpen);

    const { data: session } = useSession();

    //state
    const [signInError, setSignInError] = useState<string>('');

    //variables
    const pathName = usePathname();
    const router = useRouter();

    //functions
    const handleOpenSub = () => {
        setModalOpen('subscribe');
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('handleSubmit function called');
        try {
            
            if (session?.user !== null && session?.user !== undefined) {
                alert('You are already logged in');
                return;
            }

            const res = await signIn('credentials', {
                email: event.currentTarget['modalLoginEmail'].value,
                password: event.currentTarget['modalLoginPassword'].value,
                redirect: false,
            });
            
            if (res && res.error) {
                console.log('Error logging in:', res.error);
                setSignInError('Email or password is incorrect');
                return;
            }
            
            setModalOpen('');
            router.replace(pathName);
            
        } catch (error) {
            console.log('Error logging in', error);
            setSignInError('Email or password is incorrect');
        }
    }

    return (
        <form id="loginForm" className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-6 grid-cols-2">
                <label htmlFor="modalLoginEmail" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Email</label>
                <input type="email" name="modalLoginEmail" id="modalLoginEmail" autoComplete='email' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Email" required/>

                <label htmlFor="modalLoginPassword" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Password</label>
                <input type="password" name="modalLoginPassword" id="modalLoginPassword" autoComplete='current-password' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Password" required/>
            </div>
            <div className="flex flex-row justify-between px-5 items-center">
                <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                    Sign In
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
            <div className="flex flex-col justify-around items-center space-y-1 pt-5">
                <div className="text-sky-700 cursor-pointer text-sm hover:text-gray-700" onClick={() => setModalOpen('forgotpassword')}>
                    Forgot password?
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