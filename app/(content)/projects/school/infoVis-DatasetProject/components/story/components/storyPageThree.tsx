'use client'

import { LoadingOverlay } from "@mantine/core";
import { useState, useEffect } from "react";
import Bar from "../../components/charts/barChart";
import StoryPageWrapper from "../../components/templates/storyPageWrapper";
import { FormattedData } from "../../types/data";
import { PageThreeType } from "../../types/pageThreeType";
import { PageThreeFormat } from "../../utils/pageThreeFormat";
import TextWrapper from "../../components/templates/textWrapper";


export default function StoryPageThree({ userName, textClass, data }: { userName: string, textClass: string, data: FormattedData[] }) {

    {/*Multiple choice?*/ }
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [compare, setCompare] = useState<PageThreeType[]>([]);

    const formatPageThree = async () => {
        const formatted = await PageThreeFormat({ data }) as {
            returnedData: PageThreeType[];
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
                await formatPageThree();
            }
            init();
            setLoading(false);
        }
    }, [data, loading, formatPageThree]);

    return (
        loading ? (
            <LoadingOverlay />
        ) : error ? (
            <div>
                Error
            </div>
        ) : (
            <StoryPageWrapper>
                <TextWrapper page={3}>
                    <p className={textClass}>
                        {`Now ${userName}, we saw what two specific wines looked like at this level, but what about averages? Below are the averages for wines with qualities grouped within 1 quality point of eachother. So, 3-3.99, 4-4.99, etc. What stands out to you with this chart versus the indvidual ones?`}
                    </p>
                </TextWrapper>
                <Bar title="Wine Comparison" dataKey={"attribute"} data={compare} series={[{ name: 'threesAvg', color: 'blue' }, { name: 'foursAvg', color: 'red' }, { name: 'fivesAvg', color: 'green' }, { name: 'sixesAvg', color: 'yellow' }, { name: 'sevensAvg', color: 'orange' }]} story={true}/>
            </StoryPageWrapper>
        )
    )
}