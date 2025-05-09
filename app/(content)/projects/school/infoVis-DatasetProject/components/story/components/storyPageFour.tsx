'use client'

import { LoadingOverlay } from "@mantine/core";
import { useState, useEffect } from "react";
import StoryPageWrapper from "../../components/templates/storyPageWrapper";
import { FormattedData } from "../../types/data";
import { PageFourType } from "../../types/pageFourType";
import { PageFourFormat } from "../../utils/pageFourFormat";
import Line from "../../components/charts/lineChart";
import TextWrapper from "../../components/templates/textWrapper";

export default function StoryPageFour({ userName, textClass, data }: { userName: string, textClass: string, data: FormattedData[] }) {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [compare, setCompare] = useState<{
        whichAvg: string;
        fixedAcidity: number;
        volatileAcidity: number;
        citricAcid: number;
        freeSulfurDioxide: number;
        totalSulfurDioxide: number;
        sulphates: number;
        alcohol: number;
    }[]>([]);

    const formatPageFour = async () => {
        const formatted = await PageFourFormat({ data: data }) as {
            returnedData: PageFourType[];
            success: boolean;
        }

        if (!formatted || formatted.success === false) {
            console.log(formatted.returnedData)
            setError('Formatting error');
            return;
        } else {
            const transformedData = formatted.returnedData.map((item) => ({
                whichAvg: item.whichAvg,
                fixedAcidity: item.fixedAcidity.value,
                volatileAcidity: item.volatileAcidity.value,
                citricAcid: item.citricAcid.value,
                freeSulfurDioxide: item.freeSulfurDioxide.value,
                totalSulfurDioxide: item.totalSulfurDioxide.value,
                sulphates: item.sulphates.value,
                alcohol: item.alcohol.value,
            }));

            setCompare(transformedData);
        }
    }

    useEffect(() => {
        if (loading) {
            const init = async () => {
                await formatPageFour();
            }
            init();
            setLoading(false);
        }
    }, [data, loading, formatPageFour]);

    return (
        loading ? (
            <LoadingOverlay />
        ) : error ? (
            <div>
                Error
            </div>
        ) : (
            <StoryPageWrapper>
                <TextWrapper page={4}>
                    <p className={textClass}>
                        {`Now ${userName}, We saw how these different factors look when compared to quality, which is important. But what happens when we begin to look at them compared to one another? We can look at this in a myriad of different ways but we have put together a few for you that we think will help clarify what we are getting at.`}
                    </p>
                </TextWrapper>
                <Line title="Wine Comparison" dataKey={"whichAvg"} data={compare} series={[{ name: 'fixedAcidity', color: 'blue' }, { name: 'volatileAcidity', color: 'green' }, { name: 'citricAcid', color: 'pink' }, { name: 'freeSulfurDioxide', color: 'grape' }, { name: 'totalSulfurDioxide', color: 'red' }, { name: 'sulphates', color: 'orange' }, { name: 'alcohol', color: 'yellow' }]} story={true}/>
            </StoryPageWrapper>
        )
    )
}