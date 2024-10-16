'use client'

import React, { useEffect } from 'react'
import { TrackerUsage } from '../../charts/trackerChart';
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { Color } from 'plotly.js';
import { Spinner } from '@nextui-org/react';

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

    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        loading ? (
            <div className="flex flex-col justify-center items-center w-full h-full" style={{ minHeight: '40dvh' }}>
                <Spinner />
            </div>
        ) : (
            <div className={`${!isBreakpoint ? 'grid gap-1 grid-cols-2 grid-rows-2' : 'grid gap-1 grid-cols-1 grid-rows-4'} w-full h-full p-2`}>
                <PieChartView data={data} />
                <BarChartView colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartData} title={`Total Minutes Spent on Hobbies per Month`}/>
                <TrackerUsage objectTitle={objectTitle} daysWithHobbies={daysWithHobbies} monthLength={monthLength} />
                <BarChartView colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartDataTwo} title={`Average Minutes a Session:`}/>
            </div>
        )
    )
}