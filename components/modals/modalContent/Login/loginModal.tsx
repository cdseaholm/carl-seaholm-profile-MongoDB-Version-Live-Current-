'use client'

import { useAlertContext } from "@/app/context/alert/alertcontext";
import { useModalContext } from "@/app/context/modal/modalContext";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

export default function ModalLogin() {

    const { setModalOpen } = useModalContext();
    const { setShowAlert, showAlert, setAlertMessage } = useAlertContext();
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

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
                redirect: false
            });
            
            console.log('res', res);
            
            if (res && res.error) {
                console.log('Error logging in:', res.error);
                setShowAlert(true);
                setAlertMessage('Invalid email or password');
                return;
            }
            
            setModalOpen('');
            if (pathname === '/dashboard') {
                router.refresh();
            } else {
                router.replace("/dashboard");
            }
            
        } catch (error) {
            setShowAlert(true);
            setAlertMessage('An error occurred. Please try again.');
            console.log('Error logging in', error);
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
                        <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                            Sign In
                        </button>
                        <div className="flex flex-row justify-around my-4 p-2 text-sm space-x-1">
                            {/**<p className="text-black">
                                Don&apos;t have an account yet? 
                            </p>
                            <div className="text-sky-700 cursor-pointer" onClick={swapAuthDesire}>
                                Create an account here
                            </div>*/}
                            <p className="text-black">
                                Looking for a way to Follow? 
                            </p>
                            <div className="text-sky-700 cursor-pointer" onClick={handleOpenSub}>
                                Subscribe here
                            </div>
                        </div>
                    </form>
    )
}