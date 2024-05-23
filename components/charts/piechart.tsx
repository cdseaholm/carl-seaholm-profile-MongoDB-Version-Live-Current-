import { IHobby } from '@/models/types/hobby';
import { DonutChart, Legend } from '@tremor/react';
import dynamic from 'next/dynamic';
import ntc from 'ntcjs';
import React, { useEffect, useState } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function PieChartView({hobbies}: { hobbies: IHobby[]}) {

    const [totalTime, setTotalTime] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const beginPercentage = async () => {
            const setColorMap = async () => {
                if (hobbies && hobbies.length > 0) {
                    let newColors = [];
                    for (let i = 0; i < hobbies.length; i++) {
                        newColors.push(ntc.name(hobbies[i].color)[1]);
                    }
                    setColors(newColors);
                }
            }
            if (hobbies) {
                try {
                    const timeH = hobbies.map(hobby => hobby.minutesXsessions).flat();
                    const time = timeH.reduce((a, b) => a + parseInt(b), 0);
                    setTotalTime(time);
                } catch (e) {
                    console.error(e);
                } finally {
                    if (hobbies && totalTime > 0) {
                        await setColorMap();
                        const newData = hobbies.map((hobby, index) => {
                            return {
                                name: hobby.title,
                                value: hobby.minutesXsessions.reduce((a, b) => a + parseInt(b), 0) / totalTime * 100,
                                color: colors[index]
                            }
                        });
                        setData(newData);
                    }
                }
            }
            setLoading(false);
        }
        beginPercentage();
    }, [hobbies, totalTime, colors]);

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
            <Plot 
            data={dataPlot}
            layout={{
                barmode: 'stack', plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)', margin: {t: 50, b: 30, r: 30, l: 30}, dragmode: false, clickmode: 'none'
            }} 
            config={{
                displayModeBar: false, responsive: true}} style={{width: '100%', height: '100%'
            }}
            />
        )
    );
  }