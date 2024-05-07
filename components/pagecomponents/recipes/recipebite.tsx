import React from "react";
import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian";
import { IRecipe } from "@/models/types/recipe";

const RecipeBite = ({ recipe, index }: { recipe: IRecipe; index: number; }) => {


    return (
            <div className="flex flex-col">
                <div className="flex flex-row relative p-5 justify-between items-center">
                    <div className={`text-md md:text-lg font-bold`}>{recipe.name}</div>
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
);};

export { RecipeBite };