
import { useModalContext } from '@/app/context/modal/modalContext';
import useMediaQuery from '@/components/listeners/WidthSettings';
import { IHobby } from '@/models/types/hobby';
import React from 'react'

export default function StatsView({hobbies, daysThisMonth}: { hobbies: IHobby[] | null, daysThisMonth: number}) {
    
    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);
    const { setCalDash , calDash} = useModalContext();
    const isBreakpoint = useMediaQuery(768);

    var minutesSpent = 0;
    if (hobbies === null) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    for (let x = 0; x < hobbies.length; x++) {
        for (let i = 0; i < hobbies[x].minutesXsessions.length; i++) {
            minutesSpent += parseInt(hobbies[x].minutesXsessions[i]);
        }
    }


    return (
            <div className={`flex flex-row justify-between items-center my-2 rounded-md`}>
                <div className='grid gap-4 mb-4 grid-cols-2 w-full'>
                    <div className='flex flex-col border border-black items-center w-40 h-40 text-sm md:text-base'>
                        <div>
                            Number of Sessions:
                        </div>
                        <div>
                            {hobbies.entries.length}
                        </div>
                    </div>
                    <div className='flex flex-col border border-black items-center w-40 h-40 text-sm md:text-base'>
                        <div>
                            Minutes Spent:
                        </div>
                        <div>
                            {minutesSpent}
                        </div>
                    </div>
                    <div className='flex flex-col border border-black items-center w-40 h-40 text-sm md:text-base'>
                        <div>
                            Number of Days with a session
                        </div>
                        <div>
                            {hobbies.map(hobby => hobby.dates.length).reduce((a, b) => a + b, 0)}
                        </div>
                    </div>
                    <div className='flex flex-col border border-black items-center w-40 h-40 text-sm md:text-base'>
                        <div>
                            Average Minutes:
                        </div>
                        <div>
                            {minutesSpent / daysThisMonth}
                        </div>
                    </div>
                </div>
            </div>
  )
}