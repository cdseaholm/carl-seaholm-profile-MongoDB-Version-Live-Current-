import { FormattedData } from "../types/data";
import { PageFourType } from "../types/pageFourType";


export async function PageFourFormat({ data }: { data: FormattedData[] }) {
    let newCompare = [] as PageFourType[];

    const qualityGroups = [
        { label: "three", min: 3, max: 4 },
        { label: "four", min: 4, max: 5 },
        { label: "five", min: 5, max: 6 },
        { label: "six", min: 6, max: 7 },
        { label: "seven", min: 7, max: Infinity },
    ];

    const selectedAttributes = [
        "fixedAcidity",
        "volatileAcidity",
        "citricAcid",
        "freeSulfurDioxide",
        "totalSulfurDioxide",
        "sulphates",
        "alcohol",
    ];

    if (!data) {
        console.log("No data");
        return { returnedData: newCompare, success: false } as { returnedData: PageFourType[], success: boolean };
    }

    const groupedData = qualityGroups.map((group) => {
        const groupLabel = group.label;
        const groupMin = group.min;
        const groupMax = group.max;

        const groupData = data.filter((d) =>
            d.attributes?.some(
                (a) => a.attribute === "quality" && Number(a.value) >= groupMin && Number(a.value) < groupMax
            )
        );

        if (groupData.length === 0) {
            console.warn(`No matching data found for quality range ${group.min}-${group.max}.`);
            return { qualityGroup: groupLabel, attributes: [] as { attribute: string, value: number }[] };
        }

        const attributeValues = selectedAttributes.map((attr) => {
            let toAdd = 0;
            let counter = 0;

            groupData.forEach((item) => {
                const foundAttr = item.attributes.find((a) => a.attribute === attr);
                if (foundAttr) {
                    const num = Number(foundAttr.value);
                    if (!isNaN(num)) {
                        toAdd += num;
                        counter += 1;
                    }
                }
            });

            const final = counter > 0 ? toAdd / counter : 0;
            return { attribute: attr, value: Number(final.toFixed(2)) }; // Round to 2 decimal places
        });

        return {
            qualityGroup: groupLabel,
            attributes: attributeValues,
        };
    });

    groupedData.forEach((d) => {
        if (!d || !d.attributes) {
            console.warn("Invalid grouped data entry:", d);
            return;
        }

        const newComp = {
            whichAvg: d.qualityGroup,
            fixedAcidity: { label: "Fixed Acidity", value: Number(d.attributes.find((a) => a.attribute === "fixedAcidity")?.value.toFixed(2)) || 0 },
            volatileAcidity: { label: "Volatile Acidity", value: Number(d.attributes.find((a) => a.attribute === "volatileAcidity")?.value.toFixed(2)) || 0 },
            citricAcid: { label: "Citric Acid", value: Number(d.attributes.find((a) => a.attribute === "citricAcid")?.value.toFixed(2)) || 0 },
            freeSulfurDioxide: { label: "Free Sulfur Dioxide", value: Number(d.attributes.find((a) => a.attribute === "freeSulfurDioxide")?.value.toFixed(2)) || 0 },
            totalSulfurDioxide: { label: "Total Sulfur Dioxide", value: Number(d.attributes.find((a) => a.attribute === "totalSulfurDioxide")?.value.toFixed(2)) || 0 },
            sulphates: { label: "Sulphates", value: Number(d.attributes.find((a) => a.attribute === "sulphates")?.value.toFixed(2)) || 0 },
            alcohol: { label: "Alcohol", value: Number(d.attributes.find((a) => a.attribute === "alcohol")?.value.toFixed(2)) || 0 },
        } as PageFourType;

        newCompare.push(newComp);
    });

    console.log(newCompare)

    return { returnedData: newCompare, success: true } as { returnedData: PageFourType[], success: boolean };
}