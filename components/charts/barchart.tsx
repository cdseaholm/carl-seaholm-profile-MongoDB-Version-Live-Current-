import { IHobby } from '@/models/types/hobby';
import React from "react";
import { useState, useEffect } from 'react';
import { MonthProv } from '../misc/monthprov';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function BarChartView({hobbies, thisMonth, totalTime, totalCount, parent}: { hobbies: IHobby[], thisMonth: number, totalTime: number[], totalCount: number[], parent: string}) {
    
    const [data, setData] = useState<any[]>([]);
    const [monthsToChart, setMonthsToChart] = useState<string[]>([]);
    const [colorsToChart, setColorsToChart] = useState<string[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const years = new Date().getFullYear();
    
    useEffect(() => {
        const getDataset = async () => {
            setMonths([thisMonth - 4, thisMonth - 3, thisMonth - 2, thisMonth - 1, thisMonth])
            if (hobbies) {
                if (totalTime !== undefined) {
                    const { monthNames, monthColors } = await MonthProv(months, years) as unknown as { monthNames: string[], monthColors: string[] };
                    var totalTimeFixed = totalTime.map((time) => {
                        return time;
                    });
                    if (parent === 'avg') {
                        totalTimeFixed = totalTime.map((time, index) => {
                            if (totalCount === undefined) {
                                return 0;
                            } else {
                                return parseFloat((time / totalCount[index]).toFixed(2));
                            }
                        });
                    }
                    if (monthNames === undefined || monthColors === undefined) {
                        setLoading(false);
                        return Promise.resolve();
                    }
                    const barMonths = monthNames.map((month, index) => {
                        return month;
                    });
                    const barColors = monthColors.map((color) => {
                        return color;
                    });
                    setMonthsToChart(barMonths);
                    setColorsToChart(barColors);
                    const newData = hobbies.map((hobby, index) => {
                        if (monthNames !== undefined && monthColors !== undefined) {
                            const total = totalTimeFixed[index];
                            return {
                                date: monthNames[index],
                                time: total === 0 || total === undefined || total === null ? 0 : total,
                                color: monthColors[index],
                            };
                        }
                    });
                    setData(newData);
                }
            }
            setLoading(false);
        }
        getDataset();
    }, [hobbies, thisMonth, totalTime, totalCount, parent, years, months]);

    const barData = [{
            x: [...monthsToChart],
            y: data.map((d: any) => {
                return d.time;
            }),
            type: 'bar' as const,
            text: data.map((d: any) => {
                return `${d.time}`;
            }),
            textPosition: 'auto',
            hoverInfo: 'none',
            marker: {
                color: [...colorsToChart],
                line: {
                    color: 'black',
                    width: 1
                }
            },
            hovertemplate: '%{x}: %{y}<extra></extra>',
        }];

        const maxTime = Math.max(...data.map(d => d.time));
    

    return (
        loading ? (
            <div>
                Loading...
            </div>
        ) : (
            <Plot 
            data={barData}
            layout={{
                barmode: 'stack', plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)', margin: {t: 50, b: 30, r: 30, l: 30}, dragmode: false, 'yaxis.range': [0, maxTime + 100], clickmode: 'none'
            }} 
            config={{
                displayModeBar: false, responsive: true}} style={{width: '100%', height: '100%'
            }}
            />
        )
    );
}