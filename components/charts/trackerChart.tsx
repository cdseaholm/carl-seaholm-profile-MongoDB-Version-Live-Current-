import { IHobby } from '@/models/types/hobby';
import { Card, Tracker, type Color } from '@tremor/react';
import { set } from 'mongoose';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface Tracker {
    color: Color;
    tooltip: string;
}

export function TrackerUsage({hobbies, thisMonth}: { hobbies: IHobby[] | null, thisMonth: number}) {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [trackerData, setTrackerData] = useState<Tracker[]>([]);
    const [daysWithHobbies, setDaysWithHobbies] = useState<number[] | undefined>([]);
    const [monthLength, setMonthLength] = useState<number>(0);

    useEffect(() => {
        if (hobbies === null) {
            return;
        }
        const fillTracker = async () => {
            const monthLength = new Date(new Date().getFullYear(), thisMonth, 0).getDate();
            setMonthLength(monthLength);
            let daysWithHobbies = [] as number[];
            for (let i = 0; i < hobbies.length; i++) {
                for (let j = 0; j < hobbies[i].dates.length; j++) {
                    const date = new Date(hobbies[i].dates[j]);
                    if (date.getMonth() === thisMonth) {
                        const day = date.getDate();
                        if (!daysWithHobbies.includes(day)) {
                            daysWithHobbies.push(day);
                        }
                    }
                }
            }
            const newTrackerData = [] as Tracker[];
            for (let i = 1; i <= monthLength; i++) {
                if (daysWithHobbies?.includes(i)) {
                    newTrackerData.push({color: 'green', tooltip: 'Hobby completed'});
                } else {
                    newTrackerData.push({color: 'red', tooltip: 'No hobby completed'});
                }
            }
            setTrackerData(newTrackerData);
            setDaysWithHobbies(daysWithHobbies);
        } 
        fillTracker();
    }, [hobbies, thisMonth]);

    if (hobbies === null || daysWithHobbies === undefined || daysWithHobbies.length === 0) {
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