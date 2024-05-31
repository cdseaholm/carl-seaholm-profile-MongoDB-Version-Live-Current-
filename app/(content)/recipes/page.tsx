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
import { getRecipes } from "@/app/context/functions/getRecipes";
import { useStateStore } from "@/context/stateStore";
import { Spinner } from "@/components/misc/Spinner";
import { set } from "mongoose";

export default function Recipes() {

    //context
    const { data: session, status } = useSession();
    const recipes = useStore((state) => state.recipes);
    const recipeFilter = useStore((state) => state.recipeFilter);
    const setRecipeFilter = useStore((state) => state.setRecipeFilter);
    const setRecipes = useStore((state) => state.setRecipes);

    //state
    const [recipesSorted, setRecipesSorted] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    //variables
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const urlToUse = process.env.NEXT_PUBLIC_API_URL + '/recipes';
    const adminIDBool = status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const isBreakpoint = useMediaQuery(768);

    //functions
    const switchRecipes = async () => {
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
    }

    const handleFilterRecipes = async (e: any) => {
        setLoading(true);
        try { 
            console.log('e.target.value', e.target.value);
            const target = e.target.value;
            setRecipeFilter(target);
        } catch (error) {
            console.error('Error filtering recipes', error);
        } finally {
            await switchRecipes();
        }
        setLoading(false);
    }

    useEffect(() => {
        const initializeRecipes = async () => {
            const recipesToSet = await getRecipes(urlToUse, userID ?? '');
            setRecipes(recipesToSet);
        }
        initializeRecipes();
        setLoading(false);
    }, [recipes, setRecipes, setLoading, urlToUse, userID]);

    return (
        loading ? (
            <Spinner />
        ):(
            <MainChild>
                    <h1 className="text-center">Recipes</h1>
                    <div className={`flex flex-row px-4 ${adminIDBool ? 'justify-between' : 'justify-start'}`}>
                        <select name="modalSessionHobby" id="modalSessionHobby" className="bg-transparent border border-transparent text-gray-900 text-xs rounded-lg block w-1/3 p-2.5 dark:placeholder-gray-400 cursor-pointer" defaultValue='No filter' required onChange={(e) => {
                                    handleFilterRecipes(e);
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
                        {adminIDBool ? (
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
    )
}