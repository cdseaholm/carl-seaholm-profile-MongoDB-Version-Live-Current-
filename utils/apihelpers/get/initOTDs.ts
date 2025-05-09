import { useStore } from "@/context/dataStore";
import { IIndexedEntry } from "@/models/types/entry";
import { IFieldObject, IField } from "@/models/types/field";
import { EntriesOTDType } from "@/models/types/otds";
import { IUserObject } from "@/models/types/userObject";
import { IUserObjectIndexed } from "@/models/types/userObjectIndexed";

async function CreateSessions({ sessions, daySelected }: { sessions: IIndexedEntry[], daySelected: Date }) {
    let seshsForTheDay = [] as IIndexedEntry[];
    sessions.forEach((sesh, _seshIndex) => {
        const [year, month, day] = sesh.date.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        if (date.toDateString() === daySelected.toDateString()) {
            seshsForTheDay.push(sesh);
        }
    });
    return seshsForTheDay;
}

export async function OfTheDays({ objectToUse, daySelected, userObjects, fieldObjects, sessionsFound }: { objectToUse: IUserObject, daySelected: Date, userObjects: IUserObject[], fieldObjects: IFieldObject[], sessionsFound: IIndexedEntry[] }) {

    if (!objectToUse) {
        return [] as EntriesOTDType[];
    }

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

    const seshsForTheDay = await CreateSessions({ sessions: sessionsFound, daySelected: daySelected }) as IIndexedEntry[];

    if (!seshsForTheDay) {
        return [] as EntriesOTDType[];
    }

    seshsForTheDay.forEach((sesh, _index) => {
        fieldObjects.forEach((fieldObject, index) => {
            let seshHobby = {} as IUserObjectIndexed;
            const thisField = fieldObject.entryIndexes.find((entryIndex, _index) => {
                if (entryIndex === sesh.trueIndex) {
                    const newHob = hobbyObject.indexes.find((hobbyIndex) => hobbyIndex.index === index) as IUserObjectIndexed;
                    if (newHob) {
                        seshHobby = newHob;
                    }
                    return true;
                } else {
                    return false;
                }
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
                ents.push(newEntry);
            }
        });
    });
    useStore.getState().setEntriesOTD(ents)
}