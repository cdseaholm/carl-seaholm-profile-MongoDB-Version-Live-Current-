import { IHobby } from '@/models/types/hobby';
import dynamic from 'next/dynamic';
import ntc from 'ntcjs';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '../listeners/WidthSettings';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function PieChartView({hobbies}: { hobbies: IHobby[]}) {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isBreakpoint = useMediaQuery(768);
    const [indexShown, setIndexShown] = useState<boolean>(false);

    useEffect(() => {
        const beginPercentage = async () => {
            let totalTimeLocal = 0;
            let colorsLocal = [] as string[];
            const setColorMap = async () => {
                if (hobbies && hobbies.length > 0) {
                    let newColors = [];
                    for (let i = 0; i < hobbies.length; i++) {
                        newColors.push(ntc.name(hobbies[i].color)[1]);
                    }
                    colorsLocal = newColors;
                }
            }
            if (hobbies) {
                try {
                    const timeH = hobbies.map(hobby => hobby.minutesXsessions).flat();
                    const time = timeH.reduce((a, b) => a + parseInt(b), 0);
                    totalTimeLocal = time;
                } catch (e) {
                    console.error(e);
                } finally {
                    if (hobbies && totalTimeLocal > 0) {
                        await setColorMap();
                        const newData = hobbies.map((hobby, index) => {
                            return {
                                name: hobby.title,
                                value: hobby.minutesXsessions.reduce((a, b) => a + parseInt(b), 0) / totalTimeLocal * 100,
                                color: colorsLocal[index]
                            }
                        });
                        setData(newData);
                    }
                }
            }
            setLoading(false);
        }
        beginPercentage();
    }, [hobbies]);

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
            <div className='flex flex-col' style={{width: '100%', height: '100%'}}>
                <Plot 
                    data={dataPlot}
                    layout={{
                        plot_bgcolor: 'rgba(0, 0, 0, 0)',
                        paper_bgcolor: 'rgba(0, 0, 0, 0)', 
                        margin: {t: 25, b: 25, r: 30, l: 30}, 
                        dragmode: false, 
                        clickmode: 'none',
                        showlegend: isBreakpoint ? false : true,
                    }} 
                    config={{
                        displayModeBar: false, 
                        responsive: true,

                    }} 
                    style={{width: '100%', height: '100%'}}
                    className='flex-wrap'
                />
            </div>
        )
    );
  }