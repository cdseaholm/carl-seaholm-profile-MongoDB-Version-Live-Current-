'use client'

import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian";
import openInNewTab from "@/components/listeners/OpenInNewTab";
import { FiStar } from "react-icons/fi";
import Image from 'next/image';
import { useStateStore } from "@/context/stateStore";
import { IUserObject } from "@/models/types/userObject";


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
            return (
                <div key={index} className='flex flex-row justify-center p-3 w-full' style={{ maxWidth: '800px' }}>
                    <div className='border border-black shadow-lg rounded-md bg-slate-800/50 w-full'>
                        <div className="flex flex-col">
                            <div className="flex flex-row relative p-3 justify-between items-start w-full">
                                {isBreakpoint ? (
                                    <div className={`flex flex-col items-start justify-evenly`}>
                                        <div className={`text-md md:text-lg font-bold truncate`} style={{ whiteSpace: 'normal', overflowX: 'inherit' }}>
                                            {names[index]}
                                        </div>
                                        <div className={`flex flex-row`}>
                                            <FiStar />
                                            <div className={`text-sm md:text-md font-bold font-semibold`}>
                                                {ratings[index]}/10
                                            </div>
                                        </div>
                                        <div className={`text-xs md:text-sm font-bold text-black`}>
                                            {dates[index]}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`flex flex-col items-start justify-evenly`}>
                                        <div className={`flex flex-row items-center justify-center space-x-5`}>
                                            <div className={`text-md md:text-lg font-bold truncate`} style={{ whiteSpace: 'normal', overflowX: 'inherit' }}>
                                                {names[index]}
                                            </div>
                                            <div className={`flex flex-row`}>
                                                <FiStar />
                                                <div className={`text-sm md:text-md font-bold font-semibold`}>
                                                    {ratings[index]}/10
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`text-xs md:text-sm font-bold text-black`}>
                                            {dates[index]}
                                        </div>
                                    </div>
                                )}
                                {images[index] === '' ? <div /> :
                                    <div style={{ maxWidth: '20%', height: '20%' }}>
                                        <Image
                                            src={`${images[index]}`}
                                            alt={`${names[index]} photo`}
                                            width={100}
                                            height={100}
                                            onClick={() => openInNewTab(`${images[index]}`)}
                                            className="cursor-pointer"
                                            style={{ objectFit: 'cover', height: 'auto', width: 'auto' }}
                                        />
                                    </div>
                                }
                            </div>
                            <DetailsAccordianPage
                                details={[notes[index] ? notes[index] : '', links[index] ? links[index] : '']}
                                detailsIndex={index}
                            />
                        </div>
                    </div>
                </div>
            )
        })
    );
}