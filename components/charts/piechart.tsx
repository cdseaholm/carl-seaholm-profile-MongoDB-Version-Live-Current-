'use client'

import { useStateStore } from '@/context/stateStore';
import React, { useEffect } from 'react';
import { dataType } from '../pagecomponents/dashboard/statsView';
import { Spinner } from '../misc/Spinner';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function PieChartView({ data, loading, handleIds }: { data: dataType[], loading: boolean, handleIds: () => void }) {

    useEffect(() => {
        handleIds;
    }, [handleIds]);

    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

    const dataPlot = [{
        values: data.map((d: dataType) => d.value),
        labels: data.map((d: dataType) => d.name),
        type: 'pie' as const,
        marker: {
            colors: data.map((d: dataType) => d.color)
        },
    }];

    return (
        <div className='flex flex-col justify-start items-start w-full h-full text-sm' style={{ minHeight: '40dvh' }}>
            <h2 className={`font-bold underline`}>
                % of Total Time on Each Hobby for the past 5 months
            </h2>
            <div className='flex flex-row justify-start items-start w-full h-4/5'>

                {loading ? (
                    <Spinner />
                ) : (
                    <Plot
                        data={dataPlot}
                        layout={{
                            plot_bgcolor: 'rgba(0, 0, 0, 0)',
                            paper_bgcolor: 'rgba(0, 0, 0, 0)',
                            margin: { t: 50, b: 50, r: 50, l: 50 },
                            dragmode: false,
                            clickmode: 'none',
                            showlegend: isBreakpoint ? false : true,
                        }}
                        config={{
                            displayModeBar: false,
                            responsive: true,
                        }}
                        className='w-full h-full'
                    />
                )}
            </div>
        </div>

    );
}