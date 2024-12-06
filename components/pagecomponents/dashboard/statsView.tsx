'use client'

import React, { useEffect, useState } from 'react'
import { TrackerUsage } from '../../charts/trackerChart';
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { Color } from 'plotly.js';
import { Spinner } from '@/components/misc/Spinner';

export type dataType = {
    name: string;
    value: number;
    color: string;
    date: string;
}

export interface Tracker {
    color: Color;
    tooltip: string;
}

export default function StatsView({ isBreakpoint, data, colorsToChart, monthsToChart, barChartData, barChartDataTwo, daysWithHobbies, loading, handleLoading }: { isBreakpoint: boolean, data: dataType[], colorsToChart: string[], monthsToChart: string[], barChartData: { date: string, time: number, color: string }[], barChartDataTwo: { date: string, time: number, color: string }[], daysWithHobbies: number[], loading: boolean, handleLoading: () => void }) {

    const [ids, setIds] = useState<number>(0)
    const pieData = data ? data : [] as dataType[];
    const monthsToUse = monthsToChart ? monthsToChart : [] as string[];
    const barOne = barChartData ? barChartData : [] as { date: string, time: number, color: string }[];
    const barTwo = barChartDataTwo ? barChartDataTwo : [] as { date: string, time: number, color: string }[];
    const colorsToUse = colorsToChart ? colorsToChart : [] as string[]


    const handleIds = () => {
        setIds(ids + 1);
    }

    useEffect(() => {
        if (ids === 4) {
            handleLoading()
        }
    }, [ids, handleLoading]);

    return (
        loading ? (
            <div className={`w-full h-full p-24 flex flex-col justify-center items-center`}>
                <Spinner />
            </div>
        ) : (
            <div className={`${!isBreakpoint ? 'grid gap-1 grid-cols-2 grid-rows-2' : 'grid gap-1 grid-cols-1 grid-rows-4'} w-full h-full p-2`}>
                <PieChartView data={pieData} handleIds={handleIds} loading={loading} />
                <BarChartView colorsToChart={colorsToUse} monthsToChart={monthsToUse} barChartData={barOne} title={`Total Minutes Spent on Hobbies per Month`} handleIds={handleIds} loading={loading} />
                <TrackerUsage daysWithHobbies={daysWithHobbies} handleIds={handleIds} loading={loading} />
                <BarChartView colorsToChart={colorsToUse} monthsToChart={monthsToUse} barChartData={barTwo} title={`Average Minutes a Session:`} handleIds={handleIds} loading={loading} />
            </div>
        )

    )
}