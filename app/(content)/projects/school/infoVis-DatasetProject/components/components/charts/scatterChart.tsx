'use client';

import { ScatterChart } from '@mantine/charts';
import { useMemo } from 'react';
import { ResponsiveContainer } from 'recharts';
import { FormattedData } from '../../types/data';
import { FilterType } from '../../types/filterType';

export default function Scatter({ data, xAttribute, yAttribute }: { data: FormattedData[], xAttribute: FilterType, yAttribute: FilterType }) {

    // Clean the data by filtering out invalid entries
    const cleanedData = useMemo(() => {
        if (!data) {
            return [] as FormattedData[]
        }
        return data.filter(item => {
            const hasValidX = item.attributes.some(a => a.attribute === xAttribute.val && (xAttribute.val !== 'quality' || (a.value >= 0 && a.value <= 10)));
            const hasValidY = item.attributes.some(a => a.attribute === yAttribute.val && (yAttribute.val !== 'quality' || (a.value >= 0 && a.value <= 10)));
            return hasValidX && hasValidY;
        });
    }, [data, xAttribute, yAttribute]);

    // Format attribute names for display
    const formatAttributeName = (name: string) => {
        return name.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Aggregate the data for the scatter plot
    const aggregatedData = useMemo(() => {
        const groupedData = cleanedData.reduce((acc: Record<string, { values: number[]; count: number }>, item) => {
            const xValue = item.attributes.find(attr => attr.attribute === xAttribute.val)?.value;
            const yValue = item.attributes.find(attr => attr.attribute === yAttribute.val)?.value;

            if (xValue === undefined || yValue === undefined) return acc;

            const key = String(xValue);

            if (!acc[key]) {
                acc[key] = { values: [], count: 0 };
            }

            acc[key].values.push(Number(yValue));
            acc[key].count += 1;
            return acc;
        }, {});

        return Object.entries(groupedData).map(([key, group]) => {
            const sum = group.values.reduce((a, b) => a + b, 0);
            const avg = sum / group.count;

            return {
                [xAttribute.val]: Number(key),
                [yAttribute.val]: avg,
                count: group.count
            };
        });
    }, [cleanedData, xAttribute, yAttribute]);

    // Get the Y-axis domain
    const getYAxisDomain = () => {
        if (yAttribute.val === 'quality') {
            return [0, 10];
        }
        return undefined;
    };

    // Get the X-axis domain
    const getXAxisDomain = () => {
        if (xAttribute.val === 'quality') {
            return [0, 10];
        }
        return undefined;
    };

    // Chart title
    const chartTitle = `${formatAttributeName(xAttribute.label)} vs ${formatAttributeName(yAttribute.label)}`;

    return (
        <div className="flex flex-col justify-center items-center text-sm w-full min-h-[500px] h-full space-y-4 rounded-b-md bg-gray-600 border-t border-gray-500/30 p-2">
            <h2 className="font-bold underline">{chartTitle}</h2>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    data={[
                        {
                            color: 'yellow.5',
                            name: 'Wine Data',
                            data: aggregatedData
                        }
                    ]}
                    dataKey={{ x: xAttribute.val, y: yAttribute.val }}
                    xAxisLabel={formatAttributeName(xAttribute.label)}
                    yAxisLabel={formatAttributeName(yAttribute.label)}
                    withTooltip
                    withLegend
                    yAxisProps={yAttribute.val === 'quality' ? { domain: getYAxisDomain() } : {}}
                    xAxisProps={xAttribute.val === 'quality' ? { domain: getXAxisDomain() } : {}}
                />
            </ResponsiveContainer>
        </div>
    );
}