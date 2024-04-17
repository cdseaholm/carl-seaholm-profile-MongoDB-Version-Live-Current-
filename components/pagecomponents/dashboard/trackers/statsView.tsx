import { Hobby } from '@/lib/types/hobby'
import React from 'react'

export default function StatsView({hobbies, daysThisMonth}: { hobbies: Hobby[], daysThisMonth: number}) {
    
    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);

    var minutesSpent = 0;
    for (let x = 0; x < hobbies.length; x++) {
        for (let i = 0; i < hobbies[x].minutesXsessions.length; i++) {
            minutesSpent += parseInt(hobbies[x].minutesXsessions[i]);
        }
    }


  return (
    <div className='flex flex-row'>
        <div className='flex flex-col h-40 w-40 border border-black items-center'>
            <div>
                Number of Sessions:
            </div>
            <div>
                {hobbies.entries.length}
            </div>
        </div>
        <div className='flex flex-col h-40 w-40 border border-black items-center'>
            <div>
                Minutes Spent:
            </div>
            <div>
                {minutesSpent}
            </div>
        </div>
    </div>
  )
}
