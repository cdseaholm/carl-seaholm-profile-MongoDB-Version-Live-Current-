import { useStateStore } from '@/context/stateStore';
import { IEntry } from '@/models/types/objectEntry';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function PieChartView({ entriesOTD, totalTime }: { entriesOTD: IEntry[], totalTime: number }) {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

    useEffect(() => {
        const beginPercentage = async () => {
            let colorsLocal = [] as string[];
            const setColorMap = async () => {
                if (entriesOTD && entriesOTD.length > 0) {
                    let newColors = [];
                    for (let i = 0; i < entriesOTD.length; i++) {
                        const entries = entriesOTD[i]?.fields.find(field => field.name === 'color')?.value;
                        if (!entries) {
                            return;
                        }
                        const colorToAdd = entriesOTD[i]?.fields.find(field => field.name === 'color')?.value;
                        if (!colorToAdd) {
                            return;
                        }
                        newColors.push(colorToAdd);
                    }
                    colorsLocal = newColors;
                }
            }
            if (entriesOTD) {
                if (entriesOTD && totalTime > 0) {
                    await setColorMap();
                    const newData = entriesOTD.map((entry: IEntry, index: number) => {
                        return {
                            name: entry.fields.find(field => field.name === 'title')?.value ?? '',
                            value: entry.fields.find(field => field.name === 'minutesXsessions')?.value.reduce((a: number, b: number) => a + b, 0) / totalTime * 100,
                            color: colorsLocal[index]
                        }
                    });
                    setData(newData);
                }
                setLoading(false);
            }
        }
        beginPercentage();
    }, [entriesOTD, totalTime]);

    const dataPlot = [{
        values: data.map((d: any) => d.value),
        labels: data.map((d: any) => d.name),
        type: 'pie' as const,
        markers: {
            colors: data.map((d: any) => d.color)
        },
    }]


    return (
        loading ? (
            <div>
                Loading...
            </div>
        ) : (
            <div className='flex flex-col' style={{ width: '100%', height: '100%' }}>
                <Plot
                    data={dataPlot}
                    layout={{
                        plot_bgcolor: 'rgba(0, 0, 0, 0)',
                        paper_bgcolor: 'rgba(0, 0, 0, 0)',
                        margin: { t: 25, b: 25, r: 30, l: 30 },
                        dragmode: false,
                        clickmode: 'none',
                        showlegend: isBreakpoint ? false : true,
                    }}
                    config={{
                        displayModeBar: false,
                        responsive: true,

                    }}
                    style={{ width: '100%', height: '100%' }}
                    className='flex-wrap'
                />
            </div>
        )
    );
}