'use client'

import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian";
import openInNewTab from "@/components/listeners/OpenInNewTab";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { IRecipe } from "@/models/types/recipe";
import { FiStar } from "react-icons/fi";
import Image from 'next/image';


export const RecipeCard = ({ recipesSorted }: { recipesSorted: IRecipe[]}) => {

    const isBreakpoint = useMediaQuery(768);

    return (
        recipesSorted.map((recipe: IRecipe, index: number) => (
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
                                    <Image 
                                        src={`${recipe.image}`} 
                                        alt={`${recipe.name} photo`} 
                                        width={100} 
                                        height={100} 
                                        onClick={() => openInNewTab(`${recipe.image}`)} 
                                        className="cursor-pointer"
                                        style={{objectFit: 'cover', height: 'auto', width: 'auto'}}
                                    />
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
        ))
    );
}