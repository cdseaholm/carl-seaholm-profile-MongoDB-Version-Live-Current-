'use client'

import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian"
import openInNewTab from "@/components/listeners/OpenInNewTab"
import Image from "next/image"
import { FiStar } from "react-icons/fi";

export default function MainRecipe({isBreakpoint, index, ratings, dates, images, formattedImage, image, notes, links, names}: {isBreakpoint: boolean, index: number, ratings: string[], dates: string[], images: string[], formattedImage: string, image: string, notes: string[], links: string[], names: string[]}) {
    return (
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
                            src={formattedImage}
                            alt={`${image} photo`}
                            width={100}
                            height={100}
                            onClick={() => openInNewTab(formattedImage)}
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
    )
}