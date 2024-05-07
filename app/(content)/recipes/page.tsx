'use client'

import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useModalContext } from "@/app/context/modal/modalContext";
import { useRecipeContext } from "@/app/context/recipes/recipecontext";
import { useStateContext } from "@/app/context/state/StateContext";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { RecipeBite } from "@/components/pagecomponents/recipes/recipebite";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { IRecipe } from "@/models/types/recipe";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Recipes() {
    const { data: session } = useSession();
    const { setRecipes, recipes } = useRecipeContext();
    const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const { setModalOpen } = useModalContext();
    const { loading, setLoading, urlToUse } = useStateContext();
    const [recipeFilter, setRecipeFilter] = useState<string>('');
    const { refreshKey, setRefreshKey } = useHobbyContext();
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const isBreakpoint = useMediaQuery(768);
    const maxWidth = isBreakpoint ? '40vh' : '70vh';
    const minWidth = isBreakpoint ? '40vh' : '70vh';

    useEffect(() => {
        const getRecipes = async () => {
            try {
                setLoading(true);
                const recipes = await fetch(`${urlToUse}/api/${userID}/getrecipes`, {
                    next: {
                        revalidate: 3600
                    }
                });
                if (!recipes.ok) {
                    console.log(recipes)
                    console.log(`${urlToUse}/api/${userID}/getrecipes`)
                    console.log('No recipes found');
                    setLoading(false);
                    return;
                }
                if (recipes.ok) {
                    const res = await recipes.json();
                    console.log('res', res);
                    const recs = res.recipes;
                    if (recs.length === 0) {
                        console.log('No recipes found');
                        setLoading(false);
                        return;
                    }
                    setRecipes(recs);
                }
            } catch (error) {
                console.error('Error fetching recipes', error);
                return;
            } finally {
                console.log('refreshed Key', refreshKey);
                setLoading(false);
                return;
            }
        }
        getRecipes();
    }, [refreshKey, urlToUse, userID, setLoading, setRecipes]);

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
                                <option value='By Date'>
                                    By Date
                                </option>
                                <option value='By Rating'>
                                    By Rating
                                </option>
                            </optgroup>
                        </select>
                {adminID ? (<div className="justify-center items-center cursor-pointer" onClick={() => setModalOpen('addrecipe')}>
                        <button className="text-xl">
                          +
                        </button>
                      </div>) : <div />}
            </div>
            <div className="p-2" style={{height: '100%', width: '100%'}}>
                <div className="flex flex-col flex-wrap justify-start overflow-auto border border-slate-400 h-full w-full">
                    {recipes.map((item, index) => (
                        <div key={index} className='flex flex-row justify-center p-4'>
                            <div className='border border-black shadow-lg rounded-md m-2 bg-slate-800/50' style={{maxWidth: maxWidth, minWidth: minWidth}}>
                                <RecipeBite recipe={item} index={index}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </MainChild>
    )
}