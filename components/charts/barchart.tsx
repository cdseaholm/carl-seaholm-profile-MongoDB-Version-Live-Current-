'use client'

import React from "react";
import { BarChart } from '@mantine/charts';
import { ResponsiveContainer } from "recharts";

export function BarChartView({ title, data }: { title: string, data: { date: string, time: number, color: string }[] }) {



    return (
        <div className='flex flex-col justify-center items-start text-sm w-full min-h-[300px] space-y-4'>
            <h2 className={`font-bold underline`}>
                {title}
            </h2>
            <ResponsiveContainer width="90%" height="90%">
                <BarChart
                    data={data}
                    dataKey="date"
                    tickLine="y"
                    getBarColor={(_value, series) => {
                        return series.color || 'defaultColor';
                    }}
                    series={[{ name: 'time', color: 'color' }]}
                    textColor="black"
                />
            </ResponsiveContainer>
        </div>

    );
}