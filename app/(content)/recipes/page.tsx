'use client'

import { useSession } from "next-auth/react";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { IRecipe } from "@/models/types/recipe";
import { useEffect, useState } from "react";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useStore } from "@/context/dataStore";
import { getRecipes } from "@/app/context/functions/getRecipes";
import { Spinner } from "@/components/misc/Spinner";
import { useModalStore } from "@/context/modalStore";
import { useStateStore } from "@/context/stateStore";
import { RecipeCard } from "@/components/pagecomponents/recipes/recipeCard";

export default function Recipes() {

    //context
    const { data: session, status } = useSession();
    const recipes = useStore((state) => state.recipes);
    const recipeFilter = useStore((state) => state.recipeFilter);
    const setRecipeFilter = useStore((state) => state.setRecipeFilter);
    const setRecipes = useStore((state) => state.setRecipes);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const urlToUse = useStateStore((state) => state.urlToUse);

    //state
    const [recipesSorted, setRecipesSorted] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    //variables
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminIDBool = status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const isBreakpoint = useMediaQuery(768);
    const recipesToPass = recipeFilter === '' ? recipes : recipesSorted;
    

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
            if (urlToUse === '' || urlToUse === null || urlToUse === undefined || userID === '' || userID === null || userID === undefined) {
                console.error('Error in getting data, urlToUse or userID is not set');
                console.log('urlToUse:', urlToUse);
                console.log('userID:', userID);
                return;
            } else { 
                const recipesToSet = await getRecipes(urlToUse, userID);
                setRecipes(recipesToSet);
                console.log('recipesToSet:', recipesToSet);
            }
        }
        initializeRecipes();
        setLoading(false);
    }, [setLoading, setRecipes, urlToUse, userID, status, session, setRecipeFilter]);

    return (
        loading ? (
            <Spinner />
        ):(
            <MainChild>
                <h1 className="text-center">Recipes</h1>
                <div className={`flex flex-row px-4 ${adminIDBool ? 'justify-between' : 'justify-start'}`}>
                    <select name="modalSessionHobby" id="modalSessionHobby" className="bg-transparent border border-transparent text-gray-900 text-xs rounded-lg block w-1/3 p-2.5 dark:placeholder-gray-400 cursor-pointer" defaultValue='No filter' required onChange={(e) => {
                        handleFilterRecipes(e);
                    }}>
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
                        <div className="justify-center items-center cursor-pointer" onClick={() => setModalOpen('addrecipe')}>
                            <button className="text-xl">
                                +
                            </button>
                        </div>
                    ) : <div />}
                </div>
                <div className="flex flex-col justify-start p-2 overflow-auto border border-slate-400 scrollbar-thin scrollbar-webkit" style={{height: '100%', width: '100%'}}>
                    <div className="flex flex-col items-center h-full w-full">
                        <RecipeCard recipesSorted={recipesToPass} />
                    </div>
                </div>
            </MainChild>
        )
    )
}