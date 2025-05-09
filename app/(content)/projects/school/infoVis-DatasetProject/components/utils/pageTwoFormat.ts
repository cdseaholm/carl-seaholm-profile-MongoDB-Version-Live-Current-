import { PageTwoCompareType } from "../story/components/storyPageTwo";
import { FormattedData } from "../types/data";
import { attributes } from "../types/filters";


export async function PageTwoFormat({ data }: { data: FormattedData[] }) {

    let newCompare = [] as PageTwoCompareType[];

    // Filter data for quality 7 and quality 3
    const qualSev = data.filter((d) => 
        d.attributes?.some((a) => a.attribute === 'quality' && Number(a.value) === 7)
    );
    const qualThree = data.filter((d) => 
        d.attributes?.some((a) => a.attribute === 'quality' && Number(a.value) === 3)
    );

    // Return failure if no matching data is found
    if (qualSev.length === 0 || qualThree.length === 0) {
        console.warn('No matching data found for quality 7 or 3.');
        return { returnedData: [] as PageTwoCompareType[], success: false };
    }

    // Get the first matching item for each quality
    const qSAtts = qualSev[0] || {} as FormattedData;
    const qTAtts = qualThree[0] || {} as FormattedData;

    // Return failure if attributes are missing
    if (!qSAtts.attributes || !qTAtts.attributes) {
        console.warn('Attributes missing for quality 7 or 3.');
        return { returnedData: [] as PageTwoCompareType[], success: false };
    }

    // Map attributes to compare data
    attributes.forEach((att) => {
        const attToUse = att.val;
        if (attToUse) {
            const sevenAttToUse = qSAtts.attributes.find((a) => a.attribute === attToUse);
            const threeAttToUse = qTAtts.attributes.find((a) => a.attribute === attToUse);

            if (sevenAttToUse && threeAttToUse) {
                const newAtt = {
                    attribute: attToUse,
                    qualitySeven: Number(sevenAttToUse.value),
                    qualityThree: Number(threeAttToUse.value),
                } as PageTwoCompareType;

                newCompare.push(newAtt);
            }
        }
    });

    return { returnedData: newCompare, success: true } as { returnedData: PageTwoCompareType[], success: boolean };
}