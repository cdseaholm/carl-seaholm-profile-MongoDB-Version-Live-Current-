'use client'

import React from 'react'
import { TrackerUsage } from '../../charts/trackerChart';
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { Color } from 'plotly.js';

export type dataType = {
    name: string;
    value: number;
    color: string;
}

export interface Tracker {
    color: Color;
    tooltip: string;
}

export default function StatsView({ isBreakpoint, data, colorsToChart, monthsToChart, barChartData, barChartDataTwo, monthLength, daysWithHobbies, objectTitle }: { isBreakpoint: boolean, data: dataType[], colorsToChart: string[], monthsToChart: string[], barChartData: { date: string, time: number, color: string }[], barChartDataTwo: { date: string, time: number, color: string }[], monthLength: number, daysWithHobbies: number[], objectTitle: string }) {

    return (
            <div className={`${!isBreakpoint ? 'grid gap-1 grid-cols-2 grid-rows-2' : 'items-center'} w-full h-full p-2 space-y-4`}>
                <div className='relative flex flex-col justify-start w-full h-full text-sm' style={{ height: '30dvh' }}>
                    <div className='absolute z-20 w-full'>
                        <div className='flex flex-row items-start justify-between w-full'>
                            <h2 className={`font-bold underline`} style={{ fontSize: 14 }}>
                                % of Total Time on Each Hobby
                            </h2>
                        </div>
                    </div>
                    <PieChartView data={data} />
                </div>
                <div className='flex flex-col w-full h-full text-sm' style={{ height: '30dvh' }}>
                    <h2 className={`font-bold underline`} style={{ fontSize: 14 }}>
                        Total Minutes Spent on Hobbies per Month
                    </h2>
                    <BarChartView colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartData} />
                </div>
                <div className='flex flex-col w-full text-sm' style={{ height: '30dvh' }}>
                    <h2 className={`font-bold underline`} style={{ fontSize: 14 }}>
                        Number of Days this Month with a session
                    </h2>
                    <TrackerUsage objectTitle={objectTitle} daysWithHobbies={daysWithHobbies} monthLength={monthLength} />
                </div>
                <div className='flex flex-col w-full h-full text-sm' style={{ height: '30dvh' }}>
                    <h2 className={`font-bold underline`} style={{ fontSize: 14 }}>
                        Average Minutes a Session:
                    </h2>
                    <BarChartView colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartDataTwo} />
                </div>
            </div>
        
    )
}