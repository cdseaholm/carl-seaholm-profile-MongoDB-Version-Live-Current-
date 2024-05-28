'use client'

import { useSession } from "next-auth/react";
import ActionButton from "@/components/buttons/actionbutton";
import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { IRecipe } from "@/models/types/recipe";
import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import Image from 'next/image';
import openInNewTab from "@/components/listeners/OpenInNewTab";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useStore } from "@/context/dataStore";

export default function Recipes() {

    const { data: session } = useSession();
    const recipes = useStore((state) => state.recipes);
    const recipeFilter = useStore((state) => state.recipeFilter);
    const setRecipeFilter = useStore((state) => state.setRecipeFilter);
    const adminID = useStore((state) => state.adminID);
    const setAdminID = useStore((state) => state.setAdminID);
    const id = session?.user?.email;

    useEffect(() => {
        if (adminID) {
            return;
        } else {
            if (id === process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
              setAdminID(true);
            } else {
              setAdminID(false);
            }
        }
        console.log('adminID', adminID);
    }, [adminID, id, setAdminID]);

    const [recipesSorted, setRecipesSorted] = useState<IRecipe[]>([]);
    const isBreakpoint = useMediaQuery(768);

    useEffect(() => {
        let sorted;
        switch (recipeFilter) {
            case 'newDatesFirst':
                sorted = recipes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'oldDatesFirst':
                sorted = recipes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case 'highRatingFirst':
                sorted = recipes.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowRatingFirst':
                sorted = recipes.sort((a, b) => a.rating - b.rating);
                break;
            case 'No Filter':
            case '':
                sorted = recipes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            default:
                sorted = recipes;
                break;
        }
        setRecipesSorted(sorted);
    }, [recipes, recipeFilter]);

    return (
        <MainChild>
                <h1 className="text-center">Recipes</h1>
                <div className={`flex flex-row px-4 ${adminID ? 'justify-between' : 'justify-start'}`}>
                    <select name="modalSessionHobby" id="modalSessionHobby" className="bg-transparent border border-transparent text-gray-900 text-xs rounded-lg block w-1/3 p-2.5 dark:placeholder-gray-400 cursor-pointer" defaultValue='No filter' required onChange={(e) => {
                                console.log('e.target.value', e.target.value);
                                const target = e.target.value;
                                setRecipeFilter(target);
                            } }>
                                <option value='No Filter'>
                                    No filter
                                </option>
                                <optgroup label=" "/>
                                <optgroup label="Filters:">
                                    <option value="newDatesFirst">Newest</option>
                                    <option value="oldDatesFirst">Oldest</option>
                                    <option value="highRatingFirst">Highest Rated</option>
                                    <option value="lowRatingFirst">Lowest Rated</option>
                                </optgroup>
                            </select>
                    {adminID ? (
                        ActionButton({whichModal: 'addrecipe'})
                    ) : <div />}
                </div>
                <div className="flex flex-col justify-start p-2 overflow-auto border border-slate-400 scrollbar-thin scrollbar-webkit" style={{height: '100%', width: '100%'}}>
                    <div className="flex flex-col items-center h-full w-full">
                        {recipesSorted.map((recipe, index) => (
                            <div key={index} className='flex flex-row justify-center p-3 w-full' style={{maxWidth: '800px'}}>
                                <div className='border border-black shadow-lg rounded-md bg-slate-800/50 w-full'>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row relative p-3 justify-between items-start w-full">
                                                {isBreakpoint ? (
                                                <div className={`flex flex-col items-start justify-evenly`}>
                                                    <div className={`text-md md:text-lg font-bold truncate`} style={{whiteSpace: 'normal', overflowX: 'inherit'}}>
                                                        {recipe.name}
                                                    </div>
                                                    <div className={`flex flex-row`}>
                                                        <FiStar />
                                                        <div className={`text-sm md:text-md font-bold font-semibold`}>
                                                            {recipe.rating}/10
                                                        </div>
                                                    </div>
                                                    <div className={`text-xs md:text-sm font-bold text-black`}>
                                                        {recipe.date}
                                                    </div>
                                                </div>
                                                ) : (
                                                    <div className={`flex flex-col items-start justify-evenly`}>
                                                    <div className={`flex flex-row items-center justify-center space-x-5`}>
                                                        <div className={`text-md md:text-lg font-bold truncate`} style={{whiteSpace: 'normal', overflowX: 'inherit'}}>
                                                            {recipe.name}
                                                        </div>
                                                        <div className={`flex flex-row`}>
                                                            <FiStar />
                                                            <div className={`text-sm md:text-md font-bold font-semibold`}>
                                                                {recipe.rating}/10
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`text-xs md:text-sm font-bold text-black`}>
                                                        {recipe.date}
                                                    </div>
                                                </div>
                                                )}
                                            {recipe.image === '' ? <div /> :
                                            <div style={{maxWidth: '20%', height: '20%'}}>
                                                <Image src={`${recipe.image}`} alt={`${recipe.name} photo`} width={100} height={100} layout="responsive" onClick={() => openInNewTab(`${recipe.image}`)} className="cursor-pointer"/>
                                            </div>
                                            }
                                        </div>
                                        <DetailsAccordianPage
                                            details={[recipe.notes, recipe.link]} 
                                            detailsIndex={index} 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </MainChild>
    )
}