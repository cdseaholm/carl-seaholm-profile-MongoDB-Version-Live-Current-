'use client'

import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useModalStore } from "@/context/modalStore";
import { IEntry } from "@/models/types/objectEntry";
import { IUserObject } from "@/models/types/userObject";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { RecipeCard } from "./recipeCard";
import { IUser } from "@/models/types/user";

export default function Recipes({ userInfo }: { userInfo: IUser }) {

    //context
    const { data: session, status } = useSession();
    const [recipes, setRecipes] = useState<IUserObject[]>([]);
    const [recipeFilter, setRecipeFilter] = useState<string>('');
    const setModalOpen = useModalStore((state) => state.setModalOpen);

    //state
    const [recipesSorted, setRecipesSorted] = useState<IUserObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    //variables
    const adminIDBool = status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const recipesToPass = recipeFilter === '' ? recipes : recipesSorted;

    useEffect(() => {
        const initializeRecipes = async () => {
            try {
                if (userInfo && userInfo.userObjects) {
                    const recipesToSet = userInfo.userObjects.filter((userObject: IUserObject) => userObject.title === 'recipes');
                    setRecipes(recipesToSet);
                }
            } catch (error) {
                console.error('Error initializing recipes', error);
            }
        }
        initializeRecipes();
        setLoading(false);
    }, [userInfo]);


    //functions
    const switchRecipes = async () => {
        let sorted;
        switch (recipeFilter) {
            case 'newDatesFirst':
                sorted = recipes.sort((a, b) => {
                    const bDate = b.entries.find((entry) => entry.date === 'date')?.date as string;
                    const aDate = a.entries.find((entry) => entry.date === 'date')?.date as string;
                    return new Date(bDate).getTime() - new Date(aDate).getTime();
                });
                break;
            case 'oldDatesFirst':
                sorted = recipes.sort((a, b) => {
                    const bDate = b.entries.find((entry) => entry.date === 'date')?.date as string;
                    const aDate = a.entries.find((entry) => entry.date === 'date')?.date as string;
                    return new Date(aDate).getTime() - new Date(bDate).getTime();
                });
                break;
            case 'highRatingFirst':
                sorted = recipes.sort((a, b) => {
                    const getRating = (recipe: IUserObject) => {
                        const entries = recipe.entries as IEntry[];
                        if (!entries) return 0;
                        const ratingEntry = entries.find((entry) =>
                            entry.fields.some((field) => field.name === 'rating')
                        );
                        if (!ratingEntry) return 0;
                        const ratingField = ratingEntry.fields.find((field) => field.name === 'rating');
                        return ratingField ? ratingField.value : 0;
                    };

                    const aRating = getRating(a);
                    const bRating = getRating(b);

                    return bRating - aRating;
                });
                break;
            case 'lowRatingFirst':
                sorted = recipes.sort((a, b) => {
                    const getRating = (recipe: IUserObject) => {
                        const entries = recipe.entries as IEntry[];
                        if (!entries) return 0;
                        const ratingEntry = entries.find((entry) =>
                            entry.fields.some((field) => field.name === 'rating')
                        );
                        if (!ratingEntry) return 0;
                        const ratingField = ratingEntry.fields.find((field) => field.name === 'rating');
                        return ratingField ? ratingField.value : 0;
                    };

                    const aRating = getRating(a);
                    const bRating = getRating(b);

                    return aRating - bRating;
                });
                break;
            case 'No Filter':
            case '':
                sorted = recipes.sort((a, b) => {
                    const bDate = b.entries.find((entry) => entry.date === 'date')?.date as string;
                    const aDate = a.entries.find((entry) => entry.date === 'date')?.date as string;
                    if (bDate && aDate) {
                        return new Date(bDate).getTime() - new Date(aDate).getTime();
                    } else {
                        return 0;
                    }
                });
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

    return (
        loading ? (
            <Spinner />
        ) : (
            <MainChild>
                <h1 className="text-center">Recipes</h1>
                <div className={`flex flex-row px-4 ${adminIDBool ? 'justify-between' : 'justify-start'}`}>
                    <select name="modalSessionHobby" id="modalSessionHobby" className="bg-transparent border border-transparent text-gray-900 text-xs rounded-lg block w-1/3 p-2.5 dark:placeholder-gray-400 cursor-pointer" defaultValue='No filter' required onChange={(e) => {
                        handleFilterRecipes(e);
                    }}>
                        <option value='No Filter'>
                            No filter
                        </option>
                        <optgroup label=" " />
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
                <div className="flex flex-col justify-start p-2 overflow-auto border border-slate-400 scrollbar-thin scrollbar-webkit" style={{ height: '100%', width: '100%' }}>
                    <div className="flex flex-col items-center h-full w-full">
                        <RecipeCard recipesSorted={recipesToPass} />
                    </div>
                </div>
            </MainChild>
        )
    )
}