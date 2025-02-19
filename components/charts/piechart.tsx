'use client'

import React from 'react';
import { dataType } from '../pagecomponents/dashboard/statsView';
import { PieChart, PieChartCell } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';

export function PieChartView({ dataPassed, title }: { dataPassed: dataType[] | PieChartCell[], title: string }) {

    return (
        <div className='flex flex-col justify-center items-start text-sm w-full min-h-[300px] space-y-4'>
            <h2 className={`font-bold underline`}>
                {title}
            </h2>
            <ResponsiveContainer width="90%" height="90%">
                <PieChart data={dataPassed} size={160} withLabels labelsPosition='outside' withLabelsLine labelsType='value' withTooltip color='black' />
            </ResponsiveContainer>
        </div>

    );
}