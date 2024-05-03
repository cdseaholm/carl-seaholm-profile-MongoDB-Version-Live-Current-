'use client'

import { useAlertContext } from "@/app/context/alert/alertcontext";
import { useModalContext } from "@/app/context/modal/modalContext";
import { useSession } from "next-auth/react";

const EditUser = () => {
    //states
    const { setAlertMessage } = useAlertContext();
    const { data: session } = useSession();
    const userObj = session?.user; 


    //functions
    const changeUser = () => {
        fetch(`/api`, {
            method: 'PUT',
            body: JSON.stringify(userObj)
        })
    }

    const editUser = async (event: React.FormEvent<HTMLFormElement>) => {
        //in future, user would be passed as prop, GET for now
        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData);
        fetch(`/api`, {
            method: 'GET'
        })
    }

    const handleReset = () => {
        console.log('reset password');
    }

    {/**const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit function called');
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (user) {
            setAlertMessage('You are already logged in');
            return;
        }
    
        const tryLogin = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).catch(e => {
            console.error('Fetch error:', e);
        });
        
        console.log('tryLogin', tryLogin);
    
        if (tryLogin.error) {
            setAlertMessage(tryLogin.error);
            console.log(tryLogin.error);
        } else {
            setUser(tryLogin.user);
            setModalOpen(false);
            if (pathname === '/dashboard') {
                router.refresh();
            } else {
                router.replace("/dashboard");
            }
        }
    }*/}


    return (
                    <form className="p-4 md:p-5" onSubmit={editUser}>
                        <div className="grid gap-4 mb-6 grid-cols-2">
                            <label htmlFor="modalEditEmail" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Email</label>
                            <input type="email" name="modalEditEmail" id="modalEditEmail" autoComplete='email' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder={userObj?.name ? userObj.name : 'Email'} required/>

                            <label htmlFor="modalEditName" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Name</label>
                            <input type="text" name="modalEditName" id="modalEditName" autoComplete='name' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder={userObj?.name ? userObj.name : 'Name'} required/>
                            
                            {/**<label htmlFor="modalEditblogsub" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Subscribe to Blog?</label>
                            
                            <div className="flex flex-row justify-end">
                                <input type="checkbox" name="modalEditblogsub" id="modalEditblogsub" className={`bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-1/8 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} defaultChecked={userObj.blogsub === true ? true : false}/>
                            </div>*/}
                        </div>
                        <div className="flex flex-row justify-center">
                            <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Save Edit
                            </button>
                        </div>
                        <div className="flex flex-row justify-around">
                            <p>Forgot Password?</p>
                            <button className="pl-2" onClick={handleReset}>Reset Password</button>
                        </div>
                    </form>
    )
}

export default EditUser;
