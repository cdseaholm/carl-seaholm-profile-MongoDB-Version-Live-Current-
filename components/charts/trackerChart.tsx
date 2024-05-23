import { IHobby } from '@/models/types/hobby';
import { Card, Tracker, type Color } from '@tremor/react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface Tracker {
    color: Color;
    tooltip: string;
}

export function TrackerUsage({hobbies}: { hobbies: IHobby[] | null}) {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [trackerData, setTrackerData] = useState<Tracker[]>([]);
    const thisMonth = new Date().getMonth();
    const monthLength = new Date(new Date().getFullYear(), thisMonth + 1, 0).getDate();
    const monthHobbies = hobbies?.filter(hobby => new Date(hobby.dates[0]).getMonth() === thisMonth);
    const daysWithHobbies = monthHobbies?.map(hobby => new Date(hobby.dates[0]).getDate());

    for (let i = 1; i <= monthLength; i++) {
        if (daysWithHobbies?.includes(i)) {
            setTrackerData([...trackerData, {color: 'green', tooltip: 'Hobby completed'}]);
        } else {
            setTrackerData([...trackerData, {color: 'red', tooltip: 'No hobby completed'}]);
        }
    }
    
    if (hobbies === null) {
        return (
            <div>
                No hobbies completed yet this month
            </div>
        )
    }

    if (daysWithHobbies === undefined || daysWithHobbies.length === 0) {
        return (
            <div>
                No hobbies completed yet this month
            </div>
        )
    }

    const data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: daysWithHobbies?.length,
            type: 'indicator' as const,
            mode: 'gauge+number' as const,
            gauge: {
                axis: { range: [0, monthLength] },
                bar: { color: 'black' },
                steps: [
                    { range: [0, monthLength/2], color: 'red' },
                    { range: [monthLength/2, monthLength * .75], color: 'yellow' },
                    { range: [monthLength * .75, monthLength], color: 'green' }
                ]
            }
        }
    ]

    return (
            <Plot 
                data={data}
                layout={{
                    barmode: 'stack', plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    paper_bgcolor: 'rgba(0, 0, 0, 0)', margin: {t: 50, b: 30, r: 30, l: 30}, dragmode: false, clickmode: 'none',
                }}
                config={{
                    displayModeBar: false, responsive: true
                }} 
                style={{
                    width: '100%', height: '100%'
                }}
            />
    )
}