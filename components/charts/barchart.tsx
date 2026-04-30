'use client'

import React from "react";
import { BarChart } from '@mantine/charts';
import { ResponsiveContainer } from "recharts";

export function BarChartView({ title, data, barOne }: { title: string, data: { date: string, time: number, color: string }[], barOne: boolean }) {



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
                    series={[{ name: 'time', color: 'blue.6' }]}
                    barProps={(...args: any[]) => ({
                        fill: args[1]?.color
                    })}
                    tooltipProps={{
                        content: ({ payload }) => {
                            if (!payload || payload.length === 0) return null;
                            const item = payload[0].payload;
                            return (
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: item.color,
                                            borderRadius: '2px'
                                        }} />
                                        <span><strong>{item.date}</strong>: {item.time} {barOne ? 'Hours' : 'Minutes'}</span>
                                    </div>
                                </div>
                            );
                        }
                    }}
                    textColor="black"
                />
            </ResponsiveContainer>
        </div>

    );
}