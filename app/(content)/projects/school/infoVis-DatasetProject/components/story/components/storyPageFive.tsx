'use client'

import { LoadingOverlay } from "@mantine/core";
import { useState, useEffect } from "react";
import StoryPageWrapper from "../../components/templates/storyPageWrapper";
import { FormattedData } from "../../types/data";
import { PageFourType } from "../../types/pageFourType";
import { PageFourFormat } from "../../utils/pageFourFormat";
import Line from "../../components/charts/lineChart";
import TextWrapper from "../../components/templates/textWrapper";

export default function StoryPageFive({ userName, textClass, data }: { userName: string, textClass: string, data: FormattedData[] }) {
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
                <TextWrapper page={5}>
                    <p className={textClass}>
                        {`${userName}. We hope you've come to the coorlation that these two aspects stand out as two that coorelate strongly with quality. What happens when we compare them to eachother?`}
                    </p>
                </TextWrapper>
                <Line title="Wine Comparison" dataKey={"whichAvg"} data={compare} series={[{ name: 'freeSulfurDioxide', color: 'grape' }, { name: 'totalSulfurDioxide', color: 'red' }]} story={true}/>
            </StoryPageWrapper>
        )
    )
}