'use client'

import React, { useState, useEffect } from 'react';
import { FormattedData } from '../../types/data';
import { FormatData } from '../../utils/formatData';
import Header from '../nav/header';

const CsvReader: React.FC = () => {
    const [csvData, setCsvData] = useState<FormattedData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const labels = [
        'Alcohol',
        'Chlorides',
        'Citric Acid',
        'Density',
        'Fixed Acidity',
        'Free Sulfur Dioxide',
        'pH',
        'Quality',
        'Residual Sugar',
        'Sulphates',
        'Total Suflur Dioxide',
        'Volatile Acidity'
    ]

    useEffect(() => {
        const fetchData = async () => {
            const data = await FormatData() as { data: FormattedData[], message: string }
            if (!data) {
                setError('Issue with data return');
            }
            if (data.message !== '') {
                setError(data.message);
            } else {
                setCsvData(data.data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        loading ? (
            <div className='flex flex-col justify-start items-center w-screen h-screen overflow-y-auto overflow-x-hidden p-1'>
                Loading...
            </div>
        ) : (
            <div className='flex flex-col justify-start items-center w-screen h-screen overflow-hidden p-1'>
                <Header />
                <div className='flex flex-col justify-start items-center w-screen h-screen overflow-y-auto overflow-x-hidden bg-gray-100 p-1'>
                    <h1 className='text-center underline font-semibold py-2 border-b border-gray-900/30 flex flex-row justify-center items-center w-full'>CSV Data</h1>
                    <table className='flex flex-col justify-start items-center w-full'>
                        <thead className='flex flex-row justify-evenly items-center w-full'>
                            <tr className='flex flex-row justify-evenly items-center w-full divide-x divide-gray-900/30'>
                                {/* Add "Wine Row" as the first header */}
                                <th className='w-[9%] text-xs'>Wine Row</th>
                                {/* Dynamically list out each attribute name */}
                                {csvData[0]?.attributes.map((attribute, index) => (
                                    <th key={`Attribute Header ${index}`} title={attribute.attribute} className='w-[9%] text-xs'>{labels[index]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='flex flex-col justify-start items-center w-full '>
                            {csvData.map((row, rowIndex) => (
                                <tr key={`Row: ${rowIndex}`} className='flex flex-row justify-evenly items-center w-full'>
                                    <td className='px-2 py-1 border border-gray-500 w-[9%]'>{row.wineRow + 1}</td>
                                    {row.attributes.map((object, index) => (
                                        <td key={index} className='px-2 py-1 border border-gray-500 w-[9%]'>
                                            {object.value.toString()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    );
};

export default CsvReader;