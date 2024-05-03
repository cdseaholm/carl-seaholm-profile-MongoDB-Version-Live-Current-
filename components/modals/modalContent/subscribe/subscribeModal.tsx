'use client'

import { useAlertContext } from "@/app/context/alert/alertcontext";
import { useModalContext } from "@/app/context/modal/modalContext";
import { useStateContext } from "@/app/context/state/StateContext";

export default function ModalSubscribe() {

    const { setModalOpen } = useModalContext();
    const { setShowAlert, setAlertMessage } = useAlertContext();
    const { urlToUse } = useStateContext();

    const handleSub = async (event: React.FormEvent<HTMLFormElement>) => {
        
        console.log('handleSubmit function called');
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const sub = await fetch(`${urlToUse}/api/createsub`, {
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
        
        console.log('tryLogin', sub);
    
        if (sub.status === 400 || sub.status === 401 || sub.status === 500) {
            setShowAlert(true);
            setAlertMessage(sub.message);
            console.log(sub.message);
        } else {
            setModalOpen('');
        }
    }

    return (
                    <form id="modalSubscribeForm" className="p-4 md:p-5" onSubmit={handleSub}>
                        <div className="grid gap-4 mb-6 grid-cols-2">
                            <label htmlFor="modalSubEmail" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Email*</label>
                            <input type="email" name="modalSubEmail" id="modalSubEmail" autoComplete='email' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Email" required/>

                            <label htmlFor="modalSubName" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Name</label>
                            <input type="Name" name="modalSubName" id="modalSubName" autoComplete='given-name' className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-xs md:text-sm`} placeholder="Name"/>
                        </div>
                        <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                            Subscribe
                        </button>
                    </form>
    )
}
