
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function TrackerUsage({objectTitle, daysWithHobbies, monthLength}: { objectTitle: string, daysWithHobbies: number[], monthLength: number }) {

    if (daysWithHobbies === undefined || daysWithHobbies.length === 0) {
        return (
            <div>
                {`No ${objectTitle} completed yet this month`}
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