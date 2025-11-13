'use client'


import Link from "next/link"
import StoryPageWrapper from "../../components/templates/storyPageWrapper"
import TextWrapper from "../../components/templates/textWrapper"

export default function StoryPageSix({ userName, textClass, page }: { userName: string, textClass: string, page: number }) {

    return (
        <StoryPageWrapper>
            <TextWrapper page={page}>
                <p className={textClass}>
                    {`Let's make some conclusions before we sign off for the day. Wine itself can be very confusing and tricky. Not only can the best Sommeliers make mistakes, but now we know why. There are a lot of changing attributes in wine. It only gets more complex the closer you look at each attribute. They change all the time!`}
                </p>
                <p className={textClass}>
                    {`But for you, a soon to be top of the line Sommiler, you can tell folks that really what becomes distinct is that the amount of free and bound forms of Sulfur Dioxide (SO2) in low concentrations, is mostly undetectable in wine. However at free S02 concentrations over 50 ppm, S02 in total becomes evident in the taste of win. That's why through all of the wines, you can see that below in the lower half of our wines, SO2 begins to rise. But as it crests into the top escelane of wines, it declines again. It's very tricky but a nuance.`}
                </p>
                <p className={textClass}>
                    {`You can look more into this data where we ourselves found a good amount of the info.`}
                </p>
                <div className="flex flex-row justify-evenly items-center w-full h-content">
                    <Link className="text-sm sm:text-md md:text-lg text-blue-800 hover:text-blue-200 hover:underline" href={`https://extension.okstate.edu/fact-sheets/understanding-free-sulfur-dioxide-fso2-in-wine.html`}>Oklahoma State University study</Link>
                    <Link className="text-sm sm:text-md md:text-lg text-blue-800 hover:text-blue-200 hover:underline" href={`https://www.extension.iastate.edu/wine/total-sulfur-dioxide-why-it-matters-too/`}>Iowa State University</Link>
                    <Link className="text-sm sm:text-md md:text-lg text-blue-800 hover:text-blue-200 hover:underline" href={`https://www.oiv.int/public/medias/7840/oiv-collective-expertise-document-so2-and-wine-a-review.pdf`}>OIV Collective Expertise</Link>
                </div>
                <p className={textClass}>
                    {`${userName}, it's been a pleasure chatting today ${userName}. If you'd like to take a look at the wine data more in depth, feel free to click one of the links below. One is a way for you to filter and sort the data yourself, the other is the raw data. Or just click the Home icon in the top left to return home. We look forward to seeing you tomorrow!`}
                </p>
                <div className="flex flex-row justify-evenly items-center w-full h-content">
                    <Link className="text-sm sm:text-md md:text-lg text-blue-800 hover:text-blue-200 hover:underline" href={'/projects/school/infoVis-DatasetProject/data'}>
                        Wine Self Analysis
                    </Link>
                    <Link className="text-sm sm:text-md md:text-lg text-blue-800 hover:text-blue-200 hover:underline" href={'/projects/school/infoVis-DatasetProject/'}>
                        Home
                    </Link>
                    <Link className="text-sm sm:text-md md:text-lg text-blue-800 hover:text-blue-200 hover:underline" href={'/projects/school/infoVis-DatasetProject/test'}>
                        Raw Wine data
                    </Link>
                </div>
            </TextWrapper>
        </StoryPageWrapper>
    )
}