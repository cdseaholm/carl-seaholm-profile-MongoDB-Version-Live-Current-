import { Hobby } from '@/types/hobby'
import React from 'react'

export default function StatsView({hobby}: { hobby: Hobby}) {

    const numberOfSessions = hobby.date.length;
    var minutesSpent = 0;
    for (let i = 0; i < hobby.minutesXsession.length; i++) {
        minutesSpent += parseInt(hobby.minutesXsession[i]);
    }


  return (
    <div className='flex flex-row'>
        <div className='flex flex-col h-40 w-40 border border-black items-center'>
            <div>
                Number of Sessions:
            </div>
            <div>
                {numberOfSessions}
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
