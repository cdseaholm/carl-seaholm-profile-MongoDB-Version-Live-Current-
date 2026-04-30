import { DetailsAccordianPage } from '@/components/dropdowns/DetailsAccordian';
import Loader from '@/components/misc/loader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { useUserStore } from '@/context/userStore';
import { IUser } from '@/models/types/user';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
    const userInfo = useUserStore.getState().userInfo as IUser;
    const userName = userInfo ? userInfo.name : 'Guest';

    return {
        title: `${userName} Writing Page`,
        description: `A page dedicated to the writing works of ${userName}`,
    };
}

export default async function Page() {

    const writingOne = [
        "A young man loses his memory from an accident he had in Italy. From it, his grip on himself, reality, and what truth means to him changes. As he pieces his memory together, he struggles with addiction, loss, reality or the lack thereof, and others' perceptions. The story allows for a variety of readers and interpretations. Ultimately, it focuses on isolation, the lies and truths that surround us and are within us, and how they fray our meaning of what is true and what isn't.", 'Alegorical Fiction', "Seeking Agent/Publication"
    ];

    const writingTwo = [
        "Will have details at a later date", "9 Chapters Completed", ""
    ];

    return (
        <Loader>
            <MainChild>
                <div className='flex justify-evenly flex-col items-center space-y-4'>
                    <div className="flex justify-center">
                        <h1 className="text-2xl">Writing Projects</h1>
                    </div>
                    <div className="py-10 space-y-5">
                        <div className='bg-slate-300 rounded-md px-5 pt-3'>
                            <div className='flex flex-row justify-between'>
                                <h1 className='font-bold text-base'>Written Within</h1>
                                <a href={"/pdfs/WrittenWithinSampleChapterOne.pdf"} target="_blank" rel="noreferrer" className='text-blue-700 hover:text-gray-400 cursor-pointer text-sm'>
                                    Link to Sample
                                </a>
                            </div>
                            <DetailsAccordianPage details={writingOne} detailsIndex={0} />
                        </div>
                        <div className='bg-slate-300 rounded-md px-5 pt-3'>
                            <div className='flex flex-row justify-between'>
                                <h1 className='font-bold text-base'>{"Horn Halo Series (working title)"}</h1>
                                <div />
                            </div>
                            <DetailsAccordianPage details={writingTwo} detailsIndex={1} />
                        </div>
                    </div>
                </div>
            </MainChild>
        </Loader>
    );
};