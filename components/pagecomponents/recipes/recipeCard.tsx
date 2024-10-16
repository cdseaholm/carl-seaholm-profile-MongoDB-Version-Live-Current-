'use client'

import { useStateStore } from "@/context/stateStore";
import { IUserObject } from "@/models/types/userObject";
import MainRecipe from "./mainrecipe";

export const RecipeCard = ({ recipesSorted }: { recipesSorted: IUserObject[] }) => {

    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

    return (
        recipesSorted.map((object: IUserObject, index: number) => {
            const names = object.fields.map((field) => field.name);
            const ratings = object.fields.map((field) => field.name);
            const dates = object.fields.map((field) => field.name);
            const images = object.fields.map((field) => field.name);
            const notes = object.fields.map((field) => field.name);
            const links = object.fields.map((field) => field.name);
            const image = images[index] ? images[index] : '';

            console.log('names', names, 'ratings', ratings);

            // Ensure the image URL is correctly formatted
            const formattedImage = image.startsWith('http') || image.startsWith('/') ? image : `/${image}`;

            return (
                <div key={index} className='flex flex-row justify-center p-3 w-full' style={{ maxWidth: '800px' }}>
                    <div className='border border-black shadow-lg rounded-md bg-slate-800/50 w-full'>
                        <MainRecipe isBreakpoint={isBreakpoint} index={index} ratings={ratings} dates={dates} images={images} formattedImage={formattedImage} image={image} notes={notes} links={links} names={names}/>
                    </div>
                </div>
            )
        })
    );
}