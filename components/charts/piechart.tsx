import { useStateStore } from '@/context/stateStore';
import dynamic from 'next/dynamic';
import React from 'react';
import { dataType } from '../pagecomponents/dashboard/views/statsView';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function PieChartView({ data }: { data: dataType[] }) {

    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

    const dataPlot = [{
        values: data.map((d: dataType) => d.value),
        labels: data.map((d: dataType) => d.name),
        type: 'pie' as const,
        markers: {
            colors: data.map((d: dataType) => d.color)
        },
    }]


    return (
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
        
    );
}