'use client'

import { useSession } from "next-auth/react";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useStateContext } from "@/app/context/state/StateContext";
import ActionButton from "@/components/buttons/actionbutton";
import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian";
import { Spinner } from "@/components/misc/Spinner";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { IRecipe } from "@/models/types/recipe";
import { useEffect, useState } from "react";

export default function Recipes() {

    const { data: session } = useSession();
    var sesh = session;
    if (session === null || session === undefined) {
        sesh = null;
    }
    const adminID = sesh?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

    const { urlToUse } = useStateContext();
    const { refreshKey } = useHobbyContext();

    const [loading, setLoading] = useState(false);
    const [localRecipes, setLocalRecipes] = useState<IRecipe[]>([]);
    const [recipeFilter, setRecipeFilter] = useState<string>('');
    const [recipesSorted, setRecipesSorted] = useState<IRecipe[]>([]);

    useEffect(() => {
        const getRecipes = async () => {
            setLoading(true);
            try {
                const recipesFetched = await fetch(`${urlToUse}/api/${userID}/getrecipes`, {
                    next: {
                        revalidate: 3600
                    }
                });
                if (!recipesFetched.ok) {
                    return;
                }
                if (recipesFetched.ok) {
                    const res = await recipesFetched.json();
                    console.log('res', res);
                    const recs = res.recipes;
                    if (recs.length === 0) {
                        console.log('No recipes found');
                        return;
                    }
                    setLocalRecipes(recs);
                }
            } catch (error) {
                console.error('Error fetching recipes', error);
                setLoading(false);
                return;
            } finally {
                setLoading(false);
                console.log('refreshed Key', refreshKey);
                return;
            }
        }
        getRecipes();
    }, [refreshKey, urlToUse, userID]);

    useEffect(() => {
        if (recipeFilter === 'newDatesFirst') {
            const sorted = localRecipes.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setRecipesSorted(sorted);
        } else if (recipeFilter === 'oldDatesFirst') {
            const sorted = localRecipes.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            setRecipesSorted(sorted);
        } else if (recipeFilter === 'highRatingFirst') {
            const sorted = localRecipes.sort((a, b) => {
                return a.rating - b.rating;
            });
            setRecipesSorted(sorted);
        } else if (recipeFilter === 'lowRatingFirst') {
            const sorted = localRecipes.sort((a, b) => {
                return b.rating - a.rating;
            });
            setRecipesSorted(sorted);
        } else if (recipeFilter === 'No Filter' || recipeFilter === '') {
            const sorted = localRecipes.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setRecipesSorted(sorted);
        } else {
            setRecipesSorted(localRecipes);
        }
    }, [localRecipes, recipeFilter]);

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
                {loading ? (
                    Spinner()
                ) : (
                    <div className="flex flex-col h-full w-full">
                        {recipesSorted.map((recipe, index) => (
                            <div key={index} className='flex flex-row justify-center p-4'>
                                <div className='border border-black shadow-lg rounded-md bg-slate-800/50 w-full'>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row relative p-5 justify-between items-start">
                                            <div className={`text-md md:text-lg font-bold w-1/2 truncate`} style={{whiteSpace: 'normal', overflowX: 'inherit'}}>{recipe.name}</div>
                                            <div className={`text-sm md:text-md font-bold font-semibold`}>{recipe.rating}/10</div>
                                            <div className={`text-xs md:text-sm font-bold text-black`}>{recipe.date}
                                        </div>
                                        {/**<div>
                                                <Image src={recipe.logo} width={100} height={100} alt={recipe.logoAlt}/>
                                        </div>*/}
                                    </div>
                                    <DetailsAccordianPage 
                                        details={[recipe.notes]} 
                                        detailsIndex={index} 
                                    />
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
        </MainChild>
    )
}