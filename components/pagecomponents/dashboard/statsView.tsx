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
        <div className={`${!isBreakpoint ? 'grid gap-1 grid-cols-2 grid-rows-2' : 'grid gap-1 grid-cols-1 grid-rows-4'} w-full h-full p-2`}>
            <div className='flex flex-col justify-start items-start w-full h-full text-sm' style={{ minHeight: '40dvh' }}>
                <h2 className={`font-bold underline`}>
                    % of Total Time on Each Hobby
                </h2>
                <div className='flex flex-row justify-start items-start w-full h-4/5'>
                    <PieChartView data={data} />
                </div>
            </div>
            <div className='flex flex-col justify-start items-start w-full h-full text-sm' style={{ minHeight: '40dvh' }}>
                <h2 className={`font-bold underline`}>
                    Total Minutes Spent on Hobbies per Month
                </h2>
                <div className='flex flex-row justify-start items-start w-full h-4/5'>
                    <BarChartView colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartData} />
                </div>
            </div>
            <div className='flex flex-col w-full text-sm' style={{ minHeight: '40dvh' }}>
                <h2 className={`font-bold underline`}>
                    Number of Days this Month with a session
                </h2>
                <div className='flex flex-row justify-start items-start w-full h-4/5'>
                    <TrackerUsage objectTitle={objectTitle} daysWithHobbies={daysWithHobbies} monthLength={monthLength} />
                </div>
            </div>
            <div className='flex flex-col justify-start items-start w-full h-full text-sm' style={{ minHeight: '40dvh' }}>
                <h2 className={`font-bold underline`}>
                    Average Minutes a Session:
                </h2>
                <div className='flex flex-row justify-start items-start w-full h-4/5'>
                    <BarChartView colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartDataTwo} />
                </div>
            </div>
        </div>

    )
}