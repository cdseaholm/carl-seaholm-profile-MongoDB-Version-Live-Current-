'use client'

import React, { useEffect } from 'react'
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { Spinner } from '@/components/misc/Spinner';
import { PieChartCell } from '@mantine/charts';

export type PercentageType = {
    name: string;
    value: number; //this is percentage
    color: string;
}

export interface Tracker {
    numberOfDaysWith: number;
    numberOfDaysWithout: number;
    monthLength: number;
    withColor: 'green';
    withoutColor: 'red';
    withTooltip: 'Hobby completed';
    withoutTooltip: 'No hobby completed';
}

export default function StatsView({ daysWith, barChartData, barChartDataTwo, hobbyPerc, loading, handleLoading }: { daysWith: PieChartCell[], barChartData: { date: string, time: number, color: string }[], barChartDataTwo: { date: string, time: number, color: string }[], hobbyPerc: PieChartCell[], loading: boolean, handleLoading: () => void }) {

    //console.log({ data, barChartData, barChartDataTwo, daysWithHobbies, loading });
    const barOne = barChartData ? barChartData : [] as { date: string, time: number, color: string }[];
    const barTwo = barChartDataTwo ? barChartDataTwo : [] as { date: string, time: number, color: string }[];



    useEffect(() => {
        if (loading) {
            handleLoading();
        }
    }, [loading, handleLoading])


    return (
        loading ? (
            <div className={`w-full h-full p-24 flex flex-col justify-center items-center`}>
                <Spinner />
            </div>
        ) : (
            <div className={`grid gap-4 md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 w-full h-full p-2`
            }>
                <PieChartView dataPassed={hobbyPerc} title='% Hours on Each Hobby for the past 5 months' />
                <BarChartView data={barOne} title={`Total Minutes Spent on Hobbies per Month`} />
                {/* <TrackerUsage daysWithHobbies={daysWithHobbies} /> */}
                <PieChartView dataPassed={daysWith} title='Number of Days this Month with a session' />
                <BarChartView data={barTwo} title={`Average Minutes a Session:`} />
            </div>
        )
    )
}