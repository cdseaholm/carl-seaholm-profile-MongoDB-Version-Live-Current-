'use client'

import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";

import StoryPageWrapper from "../../components/templates/storyPageWrapper";
import TextWrapper from "../../components/templates/textWrapper";
import { FormattedData } from "../../types/data";
import { PageTwoFormat } from "../../utils/pageTwoFormat";
import Bar from "../../components/charts/barChart";

export type PageTwoCompareType = {
    attribute: string;
    qualitySeven: number;
    qualityThree: number;
}

export default function StoryPageTwo({ userName, textClass, data }: { userName: string, textClass: string, data: FormattedData[] }) {

    {/*Multiple choice?*/ }
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [compare, setCompare] = useState<PageTwoCompareType[]>([]);

    const formatPageTwoData = async () => {
        const formatted = await PageTwoFormat({ data }) as {
            returnedData: PageTwoCompareType[];
            success: boolean;
        }

        if (!formatted || formatted.success === false) {
            console.log(formatted.returnedData)
            setError('Formatting error');
            return;
        } else {
            setCompare(formatted.returnedData);
        }
    }

    useEffect(() => {
        if (loading) {
            const init = async () => {
                await formatPageTwoData();
            }
            init();
            setLoading(false);
        }
    }, [data, loading, formatPageTwoData]);

    return (
        loading ? (
            <LoadingOverlay />
        ) : error ? (
            <div>
                Error
            </div>
        ) : (
            <StoryPageWrapper>
                <TextWrapper page={2}>
                    <p className={textClass}>
                        {`Now ${userName}, when looking at quality of a wine, we often times look at where a wine is from, what type it is, and other more geographical or situational details that might go into wines. We will take a look at that tomorrow, but for today, I want to focus on what goes into a wine specifically.`}
                    </p>
                    <p className={textClass}>
                        {`Take a look at this chart here, what stands out to you?`}
                    </p>
                </TextWrapper>
                <Bar title="Wine Comparison" dataKey={"attribute"} data={compare} series={[{ name: 'qualitySeven', color: 'blue' }, { name: 'qualityThree', color: 'red' }]} story={true}/>
            </StoryPageWrapper>
        )
    )
}