'use client'

import { IHobby } from '@/models/types/hobby';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import PieChartView from '../helpers/piechart';
import { set } from 'mongoose';

export default function StatsView({hobbies, daysThisMonth}: { hobbies: IHobby[] | null, daysThisMonth: number}) {


    const { data: session } = useSession();
    const [statHobbies, setStatHobbies] = useState<IHobby[]>([]);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (hobbies === null || hobbies === undefined) {
            setLoading(false);
            return;
        }
        const hobbiesToSet = hobbies.map((hobby: IHobby) => {
            return {
                title: hobby.title,
                categories: hobby.categories,
                dates: hobby.dates,
                descriptions: hobby.descriptions,
                minutesXsessions: hobby.minutesXsessions,
                color: hobby.color,
                _id: hobby._id,
                user_email: hobby.user_email,
                goals: hobby.goals,
                createdAt: hobby.createdAt,
                updatedAt: hobby.updatedAt,
            }
        });
        if (hobbiesToSet === null || hobbiesToSet === undefined) {
            setLoading(false);
            return;
        }
        setStatHobbies(hobbiesToSet);
        setLoading(false);
    }, [hobbies, session]);

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
                <div className='grid gap-1 grid-cols-2 grid-rows-2 w-full h-full'>
                    <div className='flex flex-col items-center w-full h-full text-xs md:text-sm'>
                        <h2>% of Total Time on Each Hobby</h2>
                        <PieChartView hobbies={statHobbies} />
                    </div>
                    <div className='flex flex-col items-center w-full h-full text-sm md:text-base'>
                        <div>
                            Minutes Spent:
                        </div>
                        <div>
                            {minutesSpent}
                        </div>
                    </div>
                    <div className='flex flex-col items-center w-full h-full text-sm md:text-base'>
                        <div>
                            Number of Days with a session
                        </div>
                        <div>
                            {hobbies.map(hobby => hobby.dates.length).reduce((a, b) => a + b, 0)}
                        </div>
                    </div>
                    <div className='flex flex-col items-center w-full h-full text-sm md:text-base'>
                        <div>
                            Average Minutes:
                        </div>
                        <div>
                            {minutesSpent / daysThisMonth}
                        </div>
                    </div>
                </div>
      )
}