"use client";

import { BarChartSeries, LineChart } from "@mantine/charts";
import { ResponsiveContainer } from "recharts";

export default function Line({ data, title, dataKey, series, story }: { data: any, title: string, dataKey: string, series: BarChartSeries[], story: boolean }) {

    return (
        <div className={`flex flex-col justify-center items-center text-sm w-full min-h-[500px] h-full space-y-4 rounded-b-md ${story ? 'bg-gray-500/70' : 'bg-gray-600'} border-t border-gray-500/30 p-2`}>
            <h2 className={`font-bold underline`}>{title}</h2>
            <ResponsiveContainer width="95%" height="95%">
                <LineChart
                    data={data}
                    dataKey={dataKey}
                    series={series}
                    withLegend
                    legendProps={{ verticalAlign: 'bottom' }}
                    curveType="linear"
                />
            </ResponsiveContainer>
        </div>
    );
}
