'use client'

import React, { useEffect } from 'react'
import { TrackerUsage } from '../../../charts/trackerChart';
import { BarChartView } from '@/components/charts/barchart';
import { PieChartView } from '@/components/charts/piechart';
import { useStateStore } from '@/context/stateStore';
import { IEntry } from '@/models/types/objectEntry';
import { IUserObject } from '@/models/types/userObject';
import { Spinner } from '@/components/misc/Spinner';
import { MonthProv } from '@/components/helpers/monthprov';
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

async function SetMonthsFunc(thisMonth: number): Promise<number[]> {
    const months = [thisMonth - 4, thisMonth - 3, thisMonth - 2, thisMonth - 1, thisMonth] as number[];
    return months;
}

export default function StatsView({ setIndexShown, indexShown, objectToUse, totalTime, totalCounter, thisMonth, objectTitle }: { setIndexShown: any, indexShown: boolean, objectToUse: IUserObject, totalTime: number[], totalCounter: number[], thisMonth: number, objectTitle: string }) {

    const isBreakpoint = useStateStore((state) => state.widthQuery) < 950 ? true : false;
    const [data, setData] = React.useState<dataType[]>([]);
    const [monthsToChart, setMonthsToChart] = React.useState<string[]>([]);
    const [colorsToChart, setColorsToChart] = React.useState<string[]>([]);
    const [barChartData, setBarChartData] = React.useState<{ date: string, time: number, color: string }[]>([]);
    const [barChartDataTwo, setBarChartDataTwo] = React.useState<{ date: string, time: number, color: string }[]>([]);
    const [monthLength, setMonthLength] = React.useState<number>(0);
    const [daysWithHobbies, setDaysWithHobbies] = React.useState<number[]>([]);
    const [loading, setLoading] = React.useState(true);
    const reducedTime = totalTime.reduce((a: number, b: number) => a + b);
    const years = new Date().getFullYear();

    const colorMap = Array.from(new Set(objectToUse?.entries.map((entry: IEntry) => {
        const color = entry.fields.find(field => field.name === 'color')?.value;
        const title = entry.fields.find(field => field.name === `${objectTitle}Entry`)?.value;
        return JSON.stringify({ color: color, title: title });
    }))).map(color => JSON.parse(color));

    useEffect(() => {
        const beginPercentage = async () => {
            let colorsLocal = [] as string[];
            const setColorMap = async () => {
                if (objectToUse && objectToUse.entries.length > 0) {
                    let newColors = [] as string[];
                    for (let i = 0; i < objectToUse.entries.length; i++) {
                        const colorToAdd = objectToUse.entries[i]?.fields.find(field => field.name === 'color')?.value;
                        if (!colorToAdd) {
                            return;
                        }
                        if (colorToAdd in newColors) {
                            return
                        }
                        newColors.push(colorToAdd);
                    }
                    colorsLocal = newColors;
                }
            }
            if (objectToUse && reducedTime > 0) {
                await setColorMap();
                const newData = objectToUse.entries.map((entry: IEntry, index: number) => {
                    return {
                        name: entry.fields.find(field => field.name === `${objectTitle}Entry`)?.value,
                        value: entry.fields.find(field => field.name === 'session')?.value / reducedTime * 100,
                        color: colorsLocal[index]
                    }
                }) as dataType[];
                setData(newData);
                setLoading(false);
            }
        }
        const getDataset = async () => {
            const months = await SetMonthsFunc(thisMonth);
            if (objectToUse) {
                if (totalTime !== undefined) {
                    const { monthNames, monthColors } = await MonthProv(months, years) as unknown as { monthNames: string[], monthColors: string[] };
                    const totalTimeFixed = totalTime.map((time) => {
                        return time;
                    });
                    const avgTotalTimeFixed = totalTime.map((time, index) => {
                        return parseFloat((time / (totalCounter[index] ?? 1)).toFixed(2));
                    });
                    if (monthNames === undefined || monthColors === undefined) {
                        setLoading(false);
                        return Promise.resolve();
                    }
                    const barMonths = monthNames.map((month) => {
                        return month;
                    });
                    const barColors = monthColors.map((color) => {
                        return color;
                    });
                    setMonthsToChart(barMonths);
                    setColorsToChart(barColors);
                    const newData = objectToUse.entries.map((_field, index) => {
                        if (monthNames !== undefined && monthColors !== undefined) {
                            const total = totalTimeFixed[index];
                            return {
                                date: monthNames[index],
                                time: total === 0 || total === undefined || total === null ? 0 : total,
                                color: monthColors[index],
                            };
                        }
                        return {
                            date: '',
                            time: 0,
                            color: ''
                        };
                    }) as { date: string, time: number, color: string }[];
                    setBarChartData(newData);
                    const newDataTwo = objectToUse.entries.map((_field, index) => {
                        if (monthNames !== undefined && monthColors !== undefined) {
                            const total = avgTotalTimeFixed[index];
                            return {
                                date: monthNames[index],
                                time: total === 0 || total === undefined || total === null ? 0 : total,
                                color: monthColors[index],
                            };
                        }
                        return {
                            date: '',
                            time: 0,
                            color: ''
                        };
                    }) as { date: string, time: number, color: string }[];
                    setBarChartDataTwo(newDataTwo);
                }
            }
            setLoading(false);
        }
        const fillTracker = async () => {
            const monthLength = new Date(new Date().getFullYear(), thisMonth, 0).getDate();
            setMonthLength(monthLength);
            let daysWithHobbies = [] as number[];
            for (let i = 0; i < objectToUse.entries.length; i++) {
                const dateToUse = objectToUse.entries[i]?.date as string;
                const date = new Date(dateToUse);
                if (date.getMonth() === thisMonth) {
                    const day = date.getDate();
                    if (!daysWithHobbies.includes(day)) {
                        daysWithHobbies.push(day);
                    }
                }

            }
            const newTrackerData = [] as Tracker[];
            for (let i = 1; i <= monthLength; i++) {
                if (daysWithHobbies?.includes(i)) {
                    newTrackerData.push({ color: 'green', tooltip: 'Hobby completed' });
                } else {
                    newTrackerData.push({ color: 'red', tooltip: 'No hobby completed' });
                }
            }
            setDaysWithHobbies(daysWithHobbies);
        }
        fillTracker();
        getDataset();
        beginPercentage();
    }, [objectToUse, totalTime]);

    return (
        loading ? (
            <Spinner />
        ) : (
            <div className={`${!isBreakpoint ? 'grid gap-1 grid-cols-2 grid-rows-2' : 'items-center'} w-full h-full p-2 space-y-4 scrollbar-thin scrollbar-webkit`} style={{ overflow: 'auto' }}>
                <div className='relative flex flex-col justify-start w-full h-full text-sm' style={{ height: '30dvh' }}>
                    <div className='absolute z-20 w-full'>
                        <div className='flex flex-row items-start justify-between w-full'>
                            <h2 className={`font-bold underline`} style={{ fontSize: 14 }}>
                                % of Total Time on Each Hobby
                            </h2>
                            <button className='text-end text-sm text-blue-800 hover:text-gray-500 cursor-pointer px-2' onClick={() => setIndexShown(!indexShown)}>
                                Color Index
                                {indexShown && (
                                    <div className='flex flex-col justify-start bg-gray-300 border border-black'>
                                        {colorMap?.map((map: { color: string, title: string }, index: number) => {
                                            const color = map.color;
                                            const title = map.title;
                                            return (
                                            <li key={index} className='flex flex-row items-center justify-start px-1'>
                                                <div className="h-2 w-2 rounded-full border border-slate-500" style={{ backgroundColor: color }} />
                                                <p className='text-xs text-gray-800 px-1'>{title}</p>
                                            </li>
                                        )})}
                                    </div>
                                )}
                            </button>
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
    )
}