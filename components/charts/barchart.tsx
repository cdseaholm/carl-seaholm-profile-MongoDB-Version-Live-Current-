
import React from "react";
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function BarChartView({ colorsToChart, monthsToChart, barChartData, title }: { colorsToChart: string[], monthsToChart: string[], barChartData: any[], title: string }) {


    const barData = [{
        x: [...monthsToChart],
        y: barChartData.map((d: any) => {
            return d.time;
        }),
        type: 'bar' as const,
        text: barChartData.map((d: any) => {
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

    const maxTime = Math.max(...barChartData.map(d => d.time));

    return (
        <div className='flex flex-col justify-start items-start w-full h-full text-sm' style={{ minHeight: '40dvh' }}>
            <h2 className={`font-bold underline`}>
                {title}
            </h2>
            <div className='flex flex-row justify-start items-start w-full h-4/5'>
                <Plot
                    data={barData}
                    layout={{
                        barmode: 'stack', plot_bgcolor: 'rgba(0, 0, 0, 0)',
                        paper_bgcolor: 'rgba(0, 0, 0, 0)', margin: { t: 50, b: 30, r: 30, l: 30 }, dragmode: false, 'yaxis.range': [0, maxTime + 100], clickmode: 'none'
                    }}
                    config={{
                        displayModeBar: false, responsive: true
                    }} style={{
                        width: '100%', height: '100%'
                    }}
                />
            </div>
        </div>

    );
}