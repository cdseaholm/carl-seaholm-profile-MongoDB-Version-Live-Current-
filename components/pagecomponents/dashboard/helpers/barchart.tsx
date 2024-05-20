import MonthProv from "@/components/misc/monthprov";
import { IHobby } from "@/models/types/hobby";
import { time } from "console";
import { useEffect, useState } from "react";
import { ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid, Legend, Rectangle, XAxis, YAxis, Cell } from "recharts";

export default function BarChartView({hobbies}: { hobbies: IHobby[] | null}) {
    const [totalTime, setTotalTime] = useState<number[]>([0]);
    const [data, setData] = useState<any[]>([]);
    const thisMonth = new Date().getMonth();
    const [months, setMonths] = useState<number[]>([thisMonth - 3, thisMonth - 2, thisMonth - 1, thisMonth]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (hobbies) {
            var totalTimePerMonth = [0, 0, 0, 0];
            hobbies.forEach(hobby => {
                hobby.minutesXsessions.forEach((minutes, index) => {
                    const date = new Date(hobby.dates[index]);
                    const month = date.getMonth();
                    if (month === thisMonth - 3) {
                        totalTimePerMonth[0] += parseInt(minutes);
                    }
                    if (month === thisMonth - 2) {
                        totalTimePerMonth[1] += parseInt(minutes);
                    }
                    if (month === thisMonth - 1) {
                        totalTimePerMonth[2] += parseInt(minutes);
                    }
                    if (month === thisMonth) {
                        totalTimePerMonth[3] += parseInt(minutes);
                    }
                });
            });
            totalTimePerMonth = totalTimePerMonth.map(time => parseFloat(time.toFixed(2)));
            console.log('totalTimePerMonth', totalTimePerMonth);
            setTotalTime(totalTimePerMonth);
        }
    }, [hobbies, months, thisMonth]);

    useEffect(() => {
        if (hobbies && totalTime.some(time => time > 0)) {
            const monthsToUse = months.slice(0, hobbies.length);
            const newData = hobbies.map((hobby, index) => {
                const monthProvResult = MonthProv(monthsToUse[index], new Date().getFullYear());
                if (monthProvResult !== undefined) {
                    const nameToUse = monthProvResult[0];
                    const colorToUse = monthProvResult[1];
                    const month = months[index];
                    console.log(month);
                    const year = new Date().getFullYear();
                    return {
                        name: nameToUse,
                        value: hobby.minutesXsessions.reduce((a, b) => a + parseInt(b), 0) / totalTime[index] * 100,
                        amt: hobby.minutesXsessions.reduce((a, b) => a + parseInt(b), 0),
                        color: colorToUse,
                    }
                } else {
                    return {
                        name: 'No month',
                        value: 0,
                        amt: 0,
                        color: 'black',
                    }
                }
            });
            setData(newData);
            setLoading(false);
        }
    }, [hobbies, totalTime, months]);
      
      const getPath = (x: any, y: any, width: any, height: any) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props: any) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

    if (hobbies === null) {
        return (
            <div>
                No hobbies to display
            </div>
        )
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}