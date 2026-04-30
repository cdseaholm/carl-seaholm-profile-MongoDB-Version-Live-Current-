'use client';

import React, { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { useDash } from '../context/dashContext';
import { PieChartCell } from '@mantine/charts';
import { BarChartDataType } from '@/models/types/dash-types';
import InitDashboardProps from '@/utils/apihelpers/get/initData/initDashboardParams';

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
        sessions,
        hobbyData,
        rawMonthlyData,
        currDateFilters,
        currHobbyFilters,
    } = useDash();

    const [loading, setLoading] = useState(true);

    const [chartData, setChartData] = useState({
        perc: [] as PieChartCell[],
        tracker: [] as PieChartCell[],
        barData: [] as BarChartDataType[],
        barDataTwo: [] as BarChartDataType[],
    });

    useEffect(() => {
        let cancelled = false;

        async function loadStats() {
            setLoading(true);

            try {
                const data = await InitDashboardProps({
                    sessions,
                    hobbiesData: hobbyData,
                    rawMonthlyData,
                    hobbyFilters: currHobbyFilters,
                    dateFilters: currDateFilters,
                    thisMonth: new Date().getMonth(),
                });

                if (!cancelled) {

                    setChartData({
                        perc: data.percentagesByHobbies,
                        tracker: data.daysWithPie,
                        barData: data.barData,
                        barDataTwo: data.barDataTwo,
                    });
                    // console.log("Stats data loaded successfully:", data);
                }
            } catch (error) {
                console.error("Failed to load stats:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadStats();

        return () => {
            cancelled = true;
        };
    }, [sessions, hobbyData, rawMonthlyData, currDateFilters, currHobbyFilters]);

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center p-6">
                <Loader />
            </div>
        );
    }

    const { perc, tracker, barData, barDataTwo } = chartData;

    return (
        <div className="flex flex-col justify-start items-center w-full h-content space-y-4 p-4 divide-y-1">
            <p className="flex flex-row justify-start items-center w-full h-content text-md md:text-lg font-semibold">
                Statistics
            </p>

            <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 w-full h-full p-2">
                <PieChartView dataPassed={perc} title="Time % Breakdown with Each Hobby" />
                <BarChartView data={barData} title="Total Hours Spent on Hobbies" barOne />
                <PieChartView dataPassed={tracker} title="Days with or without a Session" />
                <BarChartView data={barDataTwo} title="Average Minutes a Session" barOne={false} />
            </div>
        </div>
    );
}