"use client";

import { useState, useEffect } from "react";
import ChartChangeButton from "../../components/buttons/chartChangeButton";
import FilterButton from "../../components/buttons/filterButton";
import { FormattedData } from "../../types/data";
import { attributes } from "../../types/filters";
import { PageFourType } from "../../types/pageFourType";
import { FormatData } from "../../utils/formatData";
import { PageFourFormat } from "../../utils/pageFourFormat";
import Scatter from "../../components/charts/scatterChart";
import Bar from "../../components/charts/barChart";
import Line from "../../components/charts/lineChart";
import Header from "../../components/nav/header";


export default function DataPage() {

    const [csvData, setCsvData] = useState<any>([]);
    const [scatterData, setScatterData] = useState<any>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // States for the selected X and Y variables
    const [xAttribute, setXAttribute] = useState({ filterKey: 11, val: "alcohol", label: "Alcohol" });
    const [yAttribute, setYAttribute] = useState({ filterKey: 0, val: "quality", label: "Quality" });
    const [chartType, setChartType] = useState("Scatter");

    const handleFilter = (filterKey: number, which: string) => {
        const filter = attributes.find((att) => att.filterKey === filterKey);
        if (!filter) {
            return;
        }
        if (chartType === 'Bar' && filter.val === 'quality' || chartType === 'Line' && filter.val === 'quality') {
            return;
        } else {
            if (which === 'x') {
                setXAttribute(filter)
            } else {
                setYAttribute(filter)
            }

        }
    };

    const handleChart = (which: string) => {
        if (which !== 'Scatter') {
            setYAttribute({ filterKey: 9, val: "ph", label: "ph" })
        }
        setChartType(which);
    };

    useEffect(() => {
        const fetchData = async () => {

            const data = await FormatData() as { data: FormattedData[], message: string };
            if (!data) {
                setError('Issue with data return');
                setLoading(false);
                return;
            }
            if (data.message !== '') {
                setError(data.message);
                setLoading(false);
                return;
            }


            if (chartType === 'Line' || chartType === 'Bar') {
                const formatted = await PageFourFormat({ data: data.data }) as {
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

                    setCsvData(transformedData);
                }

            } else {

                setScatterData(data.data);


            }

            setLoading(false);
        };

        fetchData();
    }, [chartType, xAttribute, yAttribute]);

    return (
        loading ? (
            <div>
                Loading...
            </div>
        ) : error ? (
            <div>
                {error}
            </div>
        ) : (
            <main className="flex flex-col justify-start items-center w-screen h-screen overflow-hidden">
                <Header />
                <section className="p-2 flex flex-col justify-start items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-200/50">
                    <div className="flex flex-row justify-between px-8 py-2 items-center w-full h-content">
                        <ChartChangeButton handleChart={handleChart} chart={chartType} />
                        <div className="flex flex-row justify-end space-x-7 items-center w-1/2">
                            <FilterButton
                                dataTitles={attributes}
                                handleFilter={handleFilter}
                                currentFilter={xAttribute}
                                which={'x'}
                                whichChart={chartType}
                            />
                            <FilterButton
                                dataTitles={attributes}
                                handleFilter={handleFilter}
                                currentFilter={yAttribute}
                                which={'y'}
                                whichChart={chartType}
                            />
                        </div>
                    </div>
                    {chartType === 'Scatter' ? <Scatter data={scatterData} xAttribute={xAttribute} yAttribute={yAttribute} /> : chartType === 'Bar' ? <Bar title="Your two comparisons vs grouped Qualities" dataKey={'whichAvg'} data={csvData} series={[{ name: xAttribute.val, color: 'blue' }, { name: yAttribute.val, color: 'green' }]} story={false} /> : <Line title="Your two comparisons vs grouped Qualities" dataKey={"whichAvg"} data={csvData} series={[{ name: xAttribute.val, color: 'blue' }, { name: yAttribute.val, color: 'green' }]} story={false} />}
                </section>
            </main>
        )
    );
}
