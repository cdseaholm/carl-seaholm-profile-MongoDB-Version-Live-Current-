'use client'

import React, { useEffect } from 'react'
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { Spinner } from '@/components/misc/Spinner';
import { PieChartCell } from '@mantine/charts';

export type dataType = {
    name: string;
    value: number;
    color: string;
    date: string;
}

export interface Tracker {
    color: string;
    tooltip: string;
}

export default function StatsView({ data, barChartData, barChartDataTwo, daysWithHobbies, loading, handleLoading }: { data: dataType[], barChartData: { date: string, time: number, color: string }[], barChartDataTwo: { date: string, time: number, color: string }[], daysWithHobbies: number[], loading: boolean, handleLoading: () => void }) {

    const barOne = barChartData ? barChartData : [] as { date: string, time: number, color: string }[];
    const barTwo = barChartDataTwo ? barChartDataTwo : [] as { date: string, time: number, color: string }[];
    const currentDay = new Date().getDate();
    const pieDataOne = data.map((d) => {
        return {
            value: parseFloat(d.value.toFixed(2)),
            name: d.name,
            color: d.color
        } as PieChartCell
    }) as PieChartCell[]

    const pieDataTwo = [
        {
            value: currentDay - daysWithHobbies.length,
            color: 'red',
            name: 'Days without',
        },
        {
            value: daysWithHobbies.length,
            color: 'green',
            name: 'Days with',
        }
    ] as PieChartCell[];

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
                <PieChartView dataPassed={pieDataOne} title='Hours on Each Hobby for the past 5 months' />
                <BarChartView data={barOne} title={`Total Minutes Spent on Hobbies per Month`} />
                {/* <TrackerUsage daysWithHobbies={daysWithHobbies} /> */}
                <PieChartView dataPassed={pieDataTwo} title='Number of Days this Month with a session' />
                <BarChartView data={barTwo} title={`Average Minutes a Session:`} />
            </div>
        )
    )
}