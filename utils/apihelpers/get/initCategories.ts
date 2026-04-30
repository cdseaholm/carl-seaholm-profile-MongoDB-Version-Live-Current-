import { IUserObject } from "@/models/old/types/userObject";
import { IUserObjectIndexed } from "@/models/old/types/userObjectIndexed";
import { IField, IFieldObject } from "@/models/types/field";

export async function InitCategories({ objectToUse, fieldObjects }: { objectToUse: IUserObject, fieldObjects: IFieldObject[] }) {

    let categories = [] as string[];
    let titles = [] as string[];
    let lowerTitles = [] as string[];
    let lowerCats = [] as string[];

    let indexes = objectToUse.indexes as IUserObjectIndexed[];

    if (!indexes) {
        return { categories: categories, titles: titles } as { categories: string[], titles: string[] };
    }

    indexes.forEach((userObjectIndexed: IUserObjectIndexed, _index: number) => {
        let title = userObjectIndexed.title as string;
        let trueIndex = userObjectIndexed.index as number;

        if (title && trueIndex !== undefined && trueIndex !== null) {
            let caseSensTitle = title?.toLowerCase();
            if (caseSensTitle && !lowerTitles.includes(caseSensTitle)) {
                titles.push(title);
                lowerTitles.push(caseSensTitle);
            }
            let fieldObject = fieldObjects[trueIndex] as IFieldObject;

            if (fieldObject) {
                let fields = fieldObject.fields as IField[];

                if (fields) {
                    let cat = fields.find((field) => field.name === 'category')?.values[0];
                    if (cat) {
                        let caseSensCat = cat?.toLowerCase();
                        if (caseSensCat && !lowerCats.includes(caseSensCat)) {
                            categories.push(cat);
                            lowerCats.push(caseSensCat);
                        }
                    }
                }
            }
        }
    });

    return { categories: categories, titles: titles } as { categories: string[], titles: string[] };
}