'use client'

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {

    const { data: session } = useSession();
	const router = useRouter();

    const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('formData', Object.fromEntries(formData));
        
        if (session?.user) {
            console.log('You are already logged in');
            return;
        }

        try {
            const res = await fetch('/api/registerStatic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
        
            if (res.ok) {
                const approvedRes = await signIn('credentials', {
                    email: event.currentTarget['registerEmail'].value,
                    password: event.currentTarget['registerPassword'].value,
                    redirect: false
                });
                if (approvedRes && approvedRes.ok) {
                    router.replace('/dashboard');
                } else {
                    console.log('Error logging in:', approvedRes ? approvedRes : 'No response')
                    return;
                }
            } else {
                console.log('Error creating account:', res ? res : 'No response')
                return;
            }
        } catch (error) {
            console.log('Error creating account:', error ? error : 'No error')
        }

    };

	return (
		<>
			<h3 className={`md:text-lg font-semibold text-gray-900 dark:text-white`}>
                Sign Up
            </h3>
                <form className="p-4 md:p-5" onSubmit={handleSignUpSubmit}>
                    <div className="grid gap-4 mb-6 grid-cols-2">
						<label htmlFor="registerEmail" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Email*</label>
							<div className="flex flex-row">
							<input type="email" name="registerEmail" id="registerEmail" autoComplete='email' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Email" required/>
							</div>

							<label htmlFor="registerPassword" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Password*</label>
							<input type="password" name="registerPassword" id="registerPassword" autoComplete='current-password' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Password" required/>

							<label htmlFor="registerName" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Name</label>
							<input type="text" name="registerName" id="registerName" autoComplete='given-name' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Name" required/>
							
							<label htmlFor="registerBlogsub" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Subscribe to Blog?</label>
							<div className="flex flex-row justify-end">
								<input type="checkbox" name="registerBlogsub" id="registerBlogsub" className={`bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-1/8 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`}/>
							</div>
						</div>
						<div className="flex flex-row justify-center">
							<button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
								<svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
								Sign Up
							</button>
						</div>
						<div className="flex flex-row justify-around my-4 p-2 text-sm space-x-1">
							<p className="text-black">
								Already have an account yet? 
							</p>
							<div className="text-sky-700 cursor-pointer" onClick={() => console.log('used to be swapAuthDesire')}>
								Sign in here
							</div>
						</div>
                    </form>
		</>
	);
}