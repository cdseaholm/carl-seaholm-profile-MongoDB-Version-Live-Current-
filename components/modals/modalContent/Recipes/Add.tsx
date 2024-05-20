'use client'

import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useModalContext } from "@/app/context/modal/modalContext";
import { useStateContext } from "@/app/context/state/StateContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import useHeightMediaQuery from "@/components/listeners/HeightSettings";

export default function AddRecipes() {
    const {data: session} = useSession();
    const { urlToUse } = useStateContext();
    const { setModalOpen } = useModalContext();
    const { setRefreshKey, refreshKey } = useHobbyContext();

    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [photo, setPhoto] = useState('');
    const [link, setLink] = useState('');
    const router = useRouter();
    const tooSmall = useHeightMediaQuery(560);


    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleLogSession function called');
        event.preventDefault();
        if (session === null || session === undefined || session.user === null || session.user === undefined) {
            console.log('You must be logged in to log a session');
            return;
        }
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get('createRecipeName');
            if (name === null || name === undefined || name === '') {
                console.log('Name is required');
                return;
            }

            const date = formData.get('createRecipeDate');
            if (date === null || date === undefined) {
                console.log('Date is required');
                return;
            }

            const rating = formData.get('createRecipeRating');
            if (rating === null || rating === undefined) {
                console.log('Rating is required');
                return;
            }
            const notes = formData.get('createRecipeNotes');

            const image = photo;

            setLoading(true);

            const res = await fetch(`${urlToUse}/api/createrecipe`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    date: date,
                    rating: rating,
                    notes: notes,
                    user: session.user.email,
                    image: image,
                    link: link
                }),
            
            });
            if (res.ok) {
                console.log('CreateRecipe', res);
                setLoading(false);
                setModalOpen('');
                setRefreshKey(prevKey => prevKey + 1);
                router.refresh();
            } else {
                setLoading(false);
                console.log('CreateRecipe', res);
            }
        } catch (error) { 
            setLoading(false);
            console.log('CreateRecipe', error);
        }
    }

    useEffect(() => {
        console.log(refreshKey);
    }, [refreshKey]);

return (
    <form className="p-4 md:p-5" onSubmit={handleCreate}>
        <div className="grid gap-4 mb-4 grid-cols-1">
            <div>
                <label htmlFor="createRecipeName" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Name</label>
                        <input type="name" name="createRecipeName" id="createRecipeName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" required />
            </div>
            <div className={`flex flex-row justify-between items-center`}>
                <div className="flex flex-col items-start justify-center">
                        <label htmlFor="createRecipeLink" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
                        <input type="text" name="createRecipeLink" id="createRecipeLink" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Link" />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <label htmlFor="createRecipeDate" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Date Made</label>
                    <input type="date" name="createRecipeDate" id="createRecipeDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="mm/dd/yyyy" required />
                </div>
            </div>
            <div>
                <label htmlFor="createRecipeRating" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                <input type="number" name="createRecipeRating" id="createRecipeRating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="*/10" required />
            </div>
            <div>
                <label htmlFor="createRecipeNotes" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Description</label>
                <textarea id="createRecipeNotes" name="createRecipeNotes" autoComplete="off" rows={4} className={`block p-2.5 w-full text-xs md:text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Write Notes here"></textarea>                
            </div>
            <div>
                <label htmlFor="createRecipeImage" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
                <div className="flex flex-row justify-start text-xs">
                    {tooSmall &&
                        <input type="file" accept="image/*" capture name="createRecipeImage" id="createRecipeImage" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    }
                    {!tooSmall &&
                    <>
                    {uploaded ? 
                        <p className="text-lime-600 font-bold">Image Uploaded</p> :
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res: any) => {
                                console.log('image res', res);
                                const photoKey = res[0].url;
                                console.log('photo', photoKey);
                                setPhoto(photoKey);
                                setUploaded(true);
                            }}
                            onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                            }}
                        />
                    }
                    </>
                    }
                </div>
            </div>
            <div className="flex flex-row justify-end space-x-1 items-center">
                <div>
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Log New Recipe
                    </button>
                </div>
            </div>
        </div>
    </form>
)}