'use client'

import React from 'react'
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { useDash } from '../context/dashContext';

export type PercentageType = {
    name: string;
    value: number; //this is percentage
    color: string;
}

export interface Tracker {
    numberOfDaysWith: number;
    numberOfDaysWithout: number;
    length: number;
    withColor: 'green';
    withoutColor: 'red';
    withTooltip: 'Hobby completed';
    withoutTooltip: 'No hobby completed';
}

export default function StatsView() {

    const {
        currDateFilters,
        currHobbyFilters,
        chartData: { perc, tracker, barData, barDataTwo }
    } = useDash();

    const allHobbies = currHobbyFilters.length === 0;
    
    const timeFilterType = currDateFilters ? currDateFilters.type : null;
    const timeFilterRange = currDateFilters && currDateFilters.range ? currDateFilters.range : null;
    const timeFilterStart = timeFilterRange && timeFilterRange[0] ? timeFilterRange[0] : null;
    const timeFilterEnd = timeFilterRange && timeFilterRange[1] ? timeFilterRange[1] : null;

    const barOne = barData ? barData : [] as { date: string, time: number, color: string }[];
    const barTwo = barDataTwo ? barDataTwo : [] as { date: string, time: number, color: string }[];
    const timeRange = timeFilterType !== 'day' && timeFilterStart && timeFilterEnd ? `${timeFilterStart.toLocaleDateString()} - ${timeFilterEnd.toLocaleDateString()}` : timeFilterStart ? `${timeFilterStart.toLocaleDateString()}` : timeFilterEnd ? `${timeFilterEnd.toLocaleDateString()}` : 'All Time';

    const pieOneTitle = allHobbies ? `Time % Breakdown with Each Hobby` : `Hours with Selected Hobbies`;
    const pieTwoTitle = `Days with or without a Session for ${allHobbies ? `All Hobbies` : `for Selected Hobbies`}`;
    const statsDatesTitle = `Statistics for ${timeRange}`;


    return (
            <div className='flex flex-col justify-start items-center w-full h-content space-y-4 p-4 divide-y-1'>
                <p className='flex flex-row justify-start items-center w-full h-content text-md md:text-lg font-semibold'>{statsDatesTitle}</p>
                <div className={`grid gap-4 md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 w-full h-full p-2`}>
                    <PieChartView dataPassed={perc} title={pieOneTitle} />
                    <BarChartView data={barOne} title={`Total Hours Spent on Hobbies`} barOne={true} />
                    {/* <TrackerUsage daysWithHobbies={daysWithHobbies} /> */}
                    <PieChartView dataPassed={tracker} title={pieTwoTitle} />
                    <BarChartView data={barTwo} title={`Average Minutes a Session`} barOne={false} />
                </div>
            </div>
    )
}