'use client'

import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useModalContext } from "@/app/context/modal/modalContext";
import { IHobby } from "@/models/types/hobby";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ntc from 'ntcjs';
import { useRouter } from "next/navigation";
import { useStateContext } from "@/app/context/state/StateContext";

export default function ModalHobby() {

    const { categoryPassed, setRefreshKey, categories, refreshKey } = useHobbyContext();
    const [madeCats, setMadeCats] = useState('');
    const [goalChild, setGoalChild] = useState('Goal Value');
    const [goalType, setGoalType] = useState('text');
    const [catCreate, setCatCreate] = useState(false);
    const [goalPlaceHolder, setGoalPlaceHolder] = useState('Pick a Goal Type First');
    const [colorName, setColorName] = useState('');
    const { colorChoice, setColorChoice, setModalOpen } = useModalContext();
    const { data: session } = useSession();
    const [localCategories, setLocalCategories] = useState<string[]>([]);
    const { urlToUse, setLoading } = useStateContext();
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

    const handleColorUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColorChoice(e.target.value);
        setColorName(ntc.name(e.target.value)[1]);
    };

    useEffect(() => {
        const getHobbies =  async () => {
          try {
            setLoading(true);
            const response = await fetch(`${urlToUse}/api/${userID}/gethobbies`, {
              next: {
                revalidate: 3600
              }
            });
      
            if (!response.ok) {
              console.log('No hobbies found');
              setLoading(false);
              return;
            }
            if (response.ok) {
              const res = await response.json();
              const hobs = res.hobbies;
              if (hobs.length === 0) {
                console.log('No hobbies found');
                setLoading(false);
                return;
              }
              setLocalCategories(hobs.map((hobby: IHobby) => hobby.categories).flat())
            }
          } catch (error) {
            console.error('Error fetching hobbies', error);
            return;
          } finally {
            console.log('refreshed Key', refreshKey);
            setLoading(false);
            return;
          }
        }
        
        getHobbies();
      }, [refreshKey, urlToUse, userID, setLoading, setLocalCategories]);

    useEffect(() => {
        if (colorName === '') {
            setColorName(colorChoice !== null ? ntc.name(colorChoice)[1] : '');
        }
    }, [colorChoice, colorName, setColorName]);


    const HandleCreateHobby = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit function called');
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            if (session === null || session === undefined) {
                console.log('User not logged in');
                return;
            }
                console.log('User to pass:', session.user?.email);
                console.log('Form data:', Object.fromEntries(formData));
                const titleToUse = formData.get('modalHobbyTitle');
                const colorToUse = formData.get('modalHobbyColor');
                const categoryToUse = catCreate === true ? formData.get('modalHobbyCategory') : formData.get('modalHobbyCreate');
                const goalToUse = `${goalType}-${formData.get('modalHobbyGoalValue')}`;
                const descriptionToUse = formData.get('modalHobbyDescription');
                const emailToUse = session.user?.email;


            const res = await fetch(`${urlToUse}/api/createhobby`, {
                method: 'POST',
                body: JSON.stringify({
                    title: titleToUse,
                    color: colorToUse,
                    categories: categoryToUse,
                    dates: [],
                    descriptions: [descriptionToUse],
                    goals: [goalToUse],
                    minutesXsessions: [],
                    user_email: emailToUse
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
                });
        
            if (res.ok) {
                console.log('Hobby created');
                setRefreshKey(prevKey => prevKey + 1);
                setModalOpen('');
            } else {
                console.log('Error creating hobby');
            }
        } catch (error) {
            console.log('Error creating hobby:', error ? error : 'No error');
        }
      
    };

    const handleCategoryCreate = () => {
        setCatCreate(!catCreate);
    };
    
    const changeGoalChild = (goalValueSelected: string) => {
        if (goalValueSelected === '0') {
            setGoalChild('Goal Value');
            setGoalType('text');
            setGoalPlaceHolder('Pick a Goal Type First');
        } else if (goalValueSelected === '1') {
            setGoalChild('Time');
            setGoalType('datetime-local');
            setGoalPlaceHolder('By May-05');
        } else if (goalValueSelected === '2') {
            setGoalChild('Sessions Completed');
            setGoalType('number');
            setGoalPlaceHolder('20 sessions');
        } else if (goalValueSelected === '3') {
            setGoalChild('Distance');
            setGoalType('number');
            setGoalPlaceHolder('200 miles');
        } else if (goalValueSelected === '4') {
            setGoalChild('Financial');
            setGoalType('number');
            setGoalPlaceHolder('$2999');
        } else if (goalValueSelected === '5') {
            setGoalChild('Create your own');
            setGoalType('text');
            setGoalPlaceHolder('Type a Goal Here');
        }
    };

    return (

                    <form className="p-4 md:p-5" onSubmit={HandleCreateHobby}>
                        <div className="grid gap-4 mb-4 grid-cols-1">
                            <div className="flex flex-row justify-between space-x-1">
                                <div>
                                    <label htmlFor="modalHobbyTitle" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Name this Tracker</label>
                                    <input type="text" name="modalHobbyTitle" id="modalHobbyTitle" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type a name" required/>
                                </div>
                                <div>
                                    <label htmlFor="modalHobbyColor" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Tracker Color</label>
                                    <div className={`flex flex-row justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} style={{height: '38px', width: '183px'}}>
                                        <div className={`text-xs md:text-sm`}>{colorName}</div>
                                        <input type="color" name="modalHobbyColor" id="modalHobbyColor" autoComplete='off' className="flex h-full cursor-pointer" onChange={handleColorUpdate} />
                                    </div>
                                </div>

                            </div>  
                            <div>
                                <div className={`flex flex-row justify-between items-center`}>
                                    <label htmlFor={catCreate ? 'modalHobbyCreate' : 'modalHobbyCategory'} className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Category</label>
                                        <div className={`text-xs md:text-sm cursor-pointer text-blue-700 hover:text-blue-400`} onClick={handleCategoryCreate}>
                                            {catCreate ? 'Select Existing Category' : 'Create New Category'}
                                        </div>
                                    </div>
                                    {!catCreate &&
                                    <select id="modalHobbyCategory" name="modalHobbyCategory" className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500`} defaultValue={categoryPassed ? categoryPassed : 'Select a category'}>
                                        <option>Select a category</option>
                                        {categoryPassed &&
                                            <option value={categoryPassed}>{categoryPassed}</option>
                                        }
                                        {categories?.filter(item => item !== "").map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                        ))}
                                            
                                    </select>
                                    }
                                    {catCreate &&
                                        <input type="text" name="modalHobbyCreate" id="modalHobbyCreate" className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type Category name"/>
                                    }
                            </div>
                            <div className="flex flex-row justify-between space-x-1">
                                <div>
                                    <label htmlFor="modalHobbyGoalType" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Goal Type</label>
                                    <select id="modalHobbyGoalType" name="modalHobbyGoalType" autoComplete="off" defaultValue={'Select Goal Type'} onChange={(e) => changeGoalChild(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}>
                                        <option value="0">Select Goal Type</option>
                                        <option value="1">Time</option>
                                        <option value="2">Sessions Completed</option>
                                        <option value="3">Distance</option>
                                        <option value="4">Financial</option>
                                        <option value="5">Write in your own goal</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='modalHobbyGoalValue' className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>{goalChild}</label>
                                    <input type='text' name='modalHobbyGoalValue' id='modalHobbyGoalValue' autoComplete="off" className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder={goalPlaceHolder}/>
                                    </div>
                                </div>

                            <div>
                                <label htmlFor="modalHobbyDescription" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Description</label>
                                <textarea id="modalHobbyDescription" name="modalHobbyDescription" autoComplete="off" rows={4} className={`block p-2.5 w-full text-xs md:text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Write description here"></textarea>                
                            </div>
                                <div className="flex flex-row justify-between space-x-1">
                                    <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                        Add new Tracker
                                    </button>
                                    <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white pr-5`} data-modal-toggle="crud-modal" onClick={() => setModalOpen('logsession')}>Log a session</button>
                                </div>
                            </div>
                    </form>
    )
}