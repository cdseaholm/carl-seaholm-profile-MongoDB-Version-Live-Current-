import { IEntry } from "@/models/types/entry";
import { IFieldObject, IField } from "@/models/types/field";
import { EntriesOTDType } from "@/models/types/otds";
import { IUserObject } from "@/models/types/userObject";
import { IUserObjectIndexed } from "@/models/types/userObjectIndexed";

async function CreateSessions({ sessions, parsedDate }: { sessions: IEntry[], parsedDate: string }) {
    let seshsForTheDay = [] as { index: number, value: string }[];
    sessions.forEach((sesh, seshIndex) => {
        if (sesh.date === parsedDate) {
            const newSesh = { index: seshIndex, value: sesh.value };
            seshsForTheDay = [...seshsForTheDay, newSesh];
        }
    });
    return seshsForTheDay;
}

export async function OfTheDays({ objectToUse, daySelected, userObjects, fieldObjects, sessionsFound }: { objectToUse: IUserObject, daySelected: string, userObjects: IUserObject[], fieldObjects: IFieldObject[], sessionsFound: IEntry[] }) {
    if (!objectToUse) {
        return [] as EntriesOTDType[];
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    let parsedDate = new Date(daySelected).toLocaleDateString('en-GB', options).split('/').reverse().join('-');

    if (!userObjects) {
        return [] as EntriesOTDType[];
    }
    let hobbyObject = userObjects[0] as IUserObject;
    if (!hobbyObject) {
        return [] as EntriesOTDType[];
    }
    const objectIndicies = objectToUse ? objectToUse.indexes as IUserObjectIndexed[] : [] as IUserObjectIndexed[];

    if (!objectIndicies) {
        return [] as EntriesOTDType[];
    }
    if (!fieldObjects) {
        return [] as EntriesOTDType[];
    }

    let ents = [] as EntriesOTDType[];

    const seshsForTheDay = await CreateSessions({ sessions: sessionsFound, parsedDate: parsedDate }) as { index: number, value: string }[];

    seshsForTheDay.forEach((sesh, _index) => {
        fieldObjects.forEach((fieldObject, index) => {
            let seshHobby = {} as IUserObjectIndexed;
            const thisField = fieldObject.entryIndexes.find((entryIndex, _index) => {
                if (entryIndex === sesh.index) {
                    seshHobby = hobbyObject.indexes.find((hobbyIndex) => hobbyIndex.index === index) ?? {} as IUserObjectIndexed;
                    return true;
                }
                return false;
            });
            if (thisField && seshHobby) {
                const hobTitle = seshHobby.title;
                const fields = fieldObject.fields as IField[];
                const descriptions = fields.find((field) => field.name === 'descriptions')?.values as string[];
                const categories = fields.find((field) => field.name === 'category')?.values as string[];
                const goals = fields.find((field) => field.name === 'goal')?.values as string[];
                const colors = fields.find((field) => field.name === 'color')?.values as string[];
                const totalMinutes = fields.find((field) => field.name === 'totalMinutes')?.values as string[];
                const color = colors ? colors[0] : '' as string;
                const totalMin = totalMinutes ? totalMinutes[0] : '' as string;
                const newEntry = {
                    hobbyTitle: hobTitle,
                    descriptions: descriptions,
                    goals: goals,
                    categories: categories,
                    totalMinutes: totalMin,
                    color: color,
                    date: daySelected,
                    value: sesh.value
                } as EntriesOTDType;
                ents = [...ents, newEntry] as EntriesOTDType[];
            }
        });
    });

    return ents as EntriesOTDType[];
}