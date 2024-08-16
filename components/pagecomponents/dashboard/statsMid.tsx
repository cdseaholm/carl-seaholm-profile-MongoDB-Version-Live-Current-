import { Spinner } from "@/components/misc/Spinner";
import StatsView, { dataType } from "./statsView";
import { BeginPercentage, GetDataset, FillTracker } from "@/app/actions/statsActions/statActions";
import { useStateStore } from "@/context/stateStore";
import { IEntry } from "@/models/types/objectEntry";
import React, { useEffect } from "react";
import { IUserObject } from "@/models/types/userObject";

export default function StatsMid({ setIndexShown, indexShown, objectToUse, totalTime, totalCounter, thisMonth, objectTitle }: { setIndexShown: any, indexShown: boolean, objectToUse: IUserObject | null, totalTime: number[], totalCounter: number[], thisMonth: number, objectTitle: string }) {
    
    const isBreakpoint = useStateStore((state) => state.widthQuery) < 950 ? true : false;
    const [data, setData] = React.useState<dataType[]>([]);
    const [monthsToChart, setMonthsToChart] = React.useState<string[]>([]);
    const [colorsToChart, setColorsToChart] = React.useState<string[]>([]);
    const [barChartData, setBarChartData] = React.useState<{ date: string, time: number, color: string }[]>([]);
    const [barChartDataTwo, setBarChartDataTwo] = React.useState<{ date: string, time: number, color: string }[]>([]);
    const [monthLength, setMonthLength] = React.useState<number>(0);
    const [daysWithHobbies, setDaysWithHobbies] = React.useState<number[]>([]);
    const [loading, setLoading] = React.useState(true);
    const reducedTime = totalTime.reduce((a: number, b: number) => a + b);

    const colorMap = Array.from(new Set(objectToUse?.entries.map((entry: IEntry) => {
        const color = entry.fields.find(field => field.name === 'color')?.value;
        const title = entry.fields.find(field => field.name === `${objectTitle}Entry`)?.value;
        return JSON.stringify({ color: color, title: title });
    }))).map(color => JSON.parse(color));

    useEffect(() => {
        const getData = async () => {
            if (!objectToUse) {
                setLoading(false);
                return;
            }
            const perc = await BeginPercentage({ objectToUse, objectTitle, reducedTime });

            if (perc) {
                setData(perc);
            }

            const dataSet = await GetDataset({ objectToUse, totalTime, totalCounter, thisMonth });

            if (dataSet) {
                setBarChartData(dataSet.newData);
                setBarChartDataTwo(dataSet.newDataTwo);
                setMonthsToChart(dataSet.monthNames);
                setColorsToChart(dataSet.monthColors);
            }

            const tracker = await FillTracker({ objectToUse, thisMonth });

            if (tracker) {
                setMonthLength(tracker.monthLength);
                setDaysWithHobbies(tracker.daysWithHobbies);
            }

        }
        
        getData();
        setLoading(false);
    }, [objectToUse, totalTime]);

    return (
        loading ? (
            <Spinner />
        ) : (
            <StatsView isBreakpoint={isBreakpoint} indexShown={indexShown} colorMap={colorMap} data={data} colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartData} barChartDataTwo={barChartDataTwo} monthLength={monthLength} daysWithHobbies={daysWithHobbies} objectTitle={objectTitle} setIndexShown={setIndexShown} />
        )
    )
}