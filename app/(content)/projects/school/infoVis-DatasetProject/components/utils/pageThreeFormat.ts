import { FormattedData } from "../types/data";
import { attributes } from "../types/filters";
import { PageThreeType } from "../types/pageThreeType";


export async function PageThreeFormat({ data }: { data: FormattedData[] }) {
    let newCompare = [] as PageThreeType[];

    // Define quality ranges
    const qualityGroups = [
        { label: "three", min: 3, max: 4 },
        { label: "four", min: 4, max: 5 },
        { label: "five", min: 5, max: 6 },
        { label: "six", min: 6, max: 7 },
        { label: "seven", min: 7, max: Infinity },
    ];

    // Calculate averages for each quality group
    const averages = qualityGroups.map((group) => {
        const groupData = data.filter((d) =>
            d.attributes?.some(
                (a) => a.attribute === "quality" && Number(a.value) >= group.min && Number(a.value) < group.max
            )
        );

        if (groupData.length === 0) {
            console.warn(`No matching data found for quality range ${group.min}-${group.max}.`);
            return null;
        }

        const avgAttributes = attributes.map((att) => {
            const attToUse = att.val;

            const total = groupData.reduce((sum, item) => {
                const attr = item.attributes.find((a) => a.attribute === attToUse);
                return sum + (attr ? Number(attr.value) : 0);
            }, 0);

            const avg = total / groupData.length;

            return {
                attribute: attToUse,
                average: avg,
            };
        });

        return {
            qualityGroup: group.label,
            averages: avgAttributes,
        };
    });

    attributes.forEach((att) => {
        const attToUse = att.val;

        const newAtt = {
            attribute: attToUse,
            threesAvg: averages.find((g) => g?.qualityGroup === "three")?.averages.find((a) => a.attribute === attToUse)?.average || 0,
            foursAvg: averages.find((g) => g?.qualityGroup === "four")?.averages.find((a) => a.attribute === attToUse)?.average || 0,
            fivesAvg: averages.find((g) => g?.qualityGroup === "five")?.averages.find((a) => a.attribute === attToUse)?.average || 0,
            sixesAvg: averages.find((g) => g?.qualityGroup === "six")?.averages.find((a) => a.attribute === attToUse)?.average || 0,
            sevensAvg: averages.find((g) => g?.qualityGroup === "seven")?.averages.find((a) => a.attribute === attToUse)?.average || 0,
        } as PageThreeType;

        newCompare.push(newAtt);
    });

    return { returnedData: newCompare, success: true } as { returnedData: PageThreeType[], success: boolean };
}