'use client'

import { IHobby } from '@/models/types/hobby';
import React from 'react'
import { TrackerUsage } from '../../../charts/trackerChart';
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { useStateStore } from '@/context/stateStore';

export default function StatsView({setIndexShown, indexShown, hobbies, totalTime, totalCounter, thisMonth}: {setIndexShown: any, indexShown: boolean, hobbies: IHobby[], totalTime: number[], totalCounter: number[], thisMonth: number}) {

    const isBreakpoint = useStateStore((state) => state.widthQuery) < 950 ? true : false;

    return (
            <div className={`${!isBreakpoint ? 'grid gap-1 grid-cols-2 grid-rows-2' : 'items-center'} w-full h-full p-2 space-y-4`} style={{overflow: 'auto'}}>
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
                    <PieChartView hobbies={hobbies} />
                </div>
                <div className='flex flex-col w-full h-full text-sm' style={{height: '30dvh'}}>
                    <h2 className={`font-bold underline`} style={{fontSize: 14}}>
                        Total Minutes Spent on Hobbies per Month
                    </h2>
                    <BarChartView hobbies={hobbies} thisMonth={thisMonth} totalTime={totalTime} totalCount={totalCounter} parent='total'/>  
                </div>
                <div className='flex flex-col w-full text-sm' style={{height: '30dvh'}}>
                    <h2 className={`font-bold underline`} style={{fontSize: 14}}>
                        Number of Days this Month with a session
                    </h2>
                    <TrackerUsage hobbies={hobbies} thisMonth={thisMonth} />
                </div>
                <div className='flex flex-col w-full h-full text-sm' style={{height: '30dvh'}}>
                    <h2 className={`font-bold underline`} style={{fontSize: 14}}>
                         Average Minutes a Session:
                    </h2>
                    <BarChartView hobbies={hobbies} thisMonth={thisMonth} totalTime={totalTime} totalCount={totalCounter} parent='avg'/>
                </div>
            </div>
    )
}