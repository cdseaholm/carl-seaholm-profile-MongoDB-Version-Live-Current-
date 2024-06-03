'use client'

import { IHobby } from '@/models/types/hobby';
import React, { useEffect, useState } from 'react'
import useMediaQuery from '@/components/listeners/WidthSettings';
import { TrackerUsage } from '../../../charts/trackerChart';
import { TotalMinutesCalc } from '../helpers/totalminutescalc';
import { Spinner } from '@/components/misc/Spinner';
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { useStore } from '@/context/dataStore';
import { Signal } from '@preact/signals-react';

export default function StatsView() {

    const isBreakpoint = useMediaQuery(950);
    const [totalTime, setTotalTime] = useState<number[]>([]);
    const [totalCounter, setTotalCounter] = useState<number[]>([]);
    const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth());
    const [loading, setLoading] = useState(true);
    const [indexShown, setIndexShown] = useState<boolean>(false);
    const hobbies = useStore((state) => state.hobbies);

    let hobbiesSet = [] as IHobby[];
    if (!hobbies) {
        hobbiesSet = [];
    } else {
        hobbiesSet = hobbies.map((hobby: IHobby) => {
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
    }
    
    useEffect(() => {
        const setStats = async () => {
            const thisMonth = new Date().getMonth();
            setThisMonth(thisMonth);
          if (hobbies && hobbies.length > 0) {
            const {totalTimePerMonth, counterPerMonth} = await TotalMinutesCalc({hobbies, thisMonth: thisMonth});
            setTotalTime(totalTimePerMonth);
            setTotalCounter(counterPerMonth);
          }
        }
        setStats();
        setLoading(false);
      }, [hobbies, thisMonth, setLoading]);

    return (
        loading ? (
            <Spinner />
        ):(
            <div className={`${!isBreakpoint ? 'grid gap-1 grid-cols-2 grid-rows-2' : 'items-center'} w-full h-full p-2 scrollbar-thin scrollbar-webkit space-y-4`} style={{overflow: 'auto'}}>
                <div className='relative flex flex-col justify-start w-full h-full text-sm' style={{height: '30dvh'}}>
                    <div className='absolute z-20 w-full'>
                        <div className='flex flex-row items-start justify-between w-full'>
                            <h2 className={`font-bold underline`} style={{fontSize: 14}}>
                                % of Total Time on Each Hobby
                            </h2>
                            <button className='text-end text-sm text-blue-800 hover:text-gray-500 cursor-pointer px-2' onClick={() => setIndexShown(!indexShown)}>
                                Color Index
                                {indexShown && (
                                    <div className='flex flex-col justify-start bg-gray-300 border border-black'>
                                        {hobbies.map((hobby: IHobby, index: number) => (
                                            <li key={index} className='flex flex-row items-center justify-start px-1'>
                                                <div className="h-2 w-2 rounded-full border border-slate-500" style={{backgroundColor: hobby.color}}/>
                                                <p className='text-xs text-gray-800 px-1'>{hobby.title}</p>
                                            </li>
                                        ))}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                    <PieChartView hobbies={hobbiesSet} />
                </div>
                <div className='flex flex-col w-full h-full text-sm' style={{height: '30dvh'}}>
                    <h2 className={`font-bold underline`} style={{fontSize: 14}}>
                        Total Minutes Spent on Hobbies per Month
                    </h2>
                    <BarChartView hobbies={hobbiesSet} thisMonth={thisMonth} totalTime={totalTime} totalCount={totalCounter} parent='total'/>  
                </div>
                <div className='flex flex-col w-full text-sm' style={{height: '30dvh'}}>
                    <h2 className={`font-bold underline`} style={{fontSize: 14}}>
                        Number of Days this Month with a session
                    </h2>
                    <TrackerUsage hobbies={hobbiesSet} thisMonth={thisMonth} />
                </div>
                <div className='flex flex-col w-full h-full text-sm' style={{height: '30dvh'}}>
                    <h2 className={`font-bold underline`} style={{fontSize: 14}}>
                         Average Minutes a Session:
                    </h2>
                    <BarChartView hobbies={hobbiesSet} thisMonth={thisMonth} totalTime={totalTime} totalCount={totalCounter} parent='avg'/>
                </div>
            </div>
        )
    )
}