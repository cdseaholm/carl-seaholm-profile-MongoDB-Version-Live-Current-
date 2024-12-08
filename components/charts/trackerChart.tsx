'use client';

import { Spinner } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function TrackerUsage({ daysWithHobbies, loading, handleIds }: { daysWithHobbies: number[], loading: boolean, handleIds: () => void }) {

    useEffect(() => {
        handleIds;
    }, [handleIds]);

    if (!daysWithHobbies || daysWithHobbies.length === 0) {
        return (
            <div>
                {`No hobbies completed yet this month`}
            </div>
        );
    }

    const currentDay = new Date().getDate();

    const data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: daysWithHobbies.length,
            type: 'indicator' as const,
            mode: 'gauge+number' as const,
            gauge: {
                axis: { range: [0, currentDay] },
                bar: { color: '#333333' }, // Dark Gray
                steps: [
                    { range: [0, currentDay / 2], color: '#FF6666' }, // Softer Red
                    { range: [currentDay / 2, currentDay * 0.75], color: '#FFFF66' }, // Softer Yellow
                    { range: [currentDay * 0.75, currentDay], color: '#66FF66' } // Softer Green
                ]
            }
        }
    ];

    return (
        <div className='flex flex-col w-full text-sm' style={{ minHeight: '40dvh' }}>
            <h2 className='font-bold underline'>
                Number of Days this Month with a session
            </h2>
            <div className='flex flex-row justify-start items-start w-full h-4/5'>
                {loading ? (
                    <Spinner />
                ) : (
                    <Plot
                        data={data}
                        layout={{
                            barmode: 'stack',
                            plot_bgcolor: 'rgba(0, 0, 0, 0)',
                            paper_bgcolor: 'rgba(0, 0, 0, 0)',
                            margin: { t: 50, b: 30, r: 30, l: 30 },
                            dragmode: false,
                            clickmode: 'none',
                        }}
                        config={{
                            displayModeBar: false,
                            responsive: true
                        }}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                )}
            </div>
        </div>
    );
}