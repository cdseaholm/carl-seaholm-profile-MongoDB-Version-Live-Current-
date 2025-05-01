
import Papa, { ParseResult } from "papaparse";
import { FormattedData, Data } from "../types/data";

export async function FormatData() {

    let errMessage = '';
    let csvDataToReturn = [] as FormattedData[]

    try {
        const response = await fetch('/wine.csv');
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Could not read the file');
        }
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(result.value);

        Papa.parse<Data>(csvText, {
            header: true,
            complete: (results: ParseResult<Data>) => {
                csvDataToReturn = results.data.map((d, i) => {
                    return {
                        wineRow: i,
                        attributes: [
                            { attribute: 'alcohol', value: d.alcohol },
                            { attribute: 'chlorides', value: d.chlorides },
                            { attribute: 'citricAcid', value: d.citricAcid },
                            { attribute: 'density', value: d.density },
                            { attribute: 'fixedAcidity', value: d.fixedAcidity },
                            { attribute: 'freeSulfurDioxide', value: d.freeSulfurDioxide },
                            { attribute: 'pH', value: d.pH },
                            { attribute: 'quality', value: d.quality },
                            { attribute: 'residualSugar', value: d.residualSugar },
                            { attribute: 'sulphates', value: d.sulphates },
                            { attribute: 'totalSulfurDioxide', value: d.totalSulfurDioxide },
                            { attribute: 'volatileAcidity', value: d.volatileAcidity },
                        ]
                    } as FormattedData;
                });
            },
            error: (err: any) => {
                errMessage = err.message;
            },
        });

        return { data: csvDataToReturn, message: errMessage }
    } catch (e: any) {
        errMessage = e.message;
        return { data: csvDataToReturn, message: errMessage }
    }

}