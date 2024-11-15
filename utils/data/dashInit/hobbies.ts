import { IEntry, IIndexedEntry } from "@/models/types/entry";
import { IFieldObject } from "@/models/types/field";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { IUserObjectIndexed } from "@/models/types/userObjectIndexed";

export async function HobbiesInit({ userInfo }: { userInfo: IUser }) {
    if (!userInfo) {
        console.log('No user info')
        return { worked: false, sessionsFound: null, userObjects: null, colorMapBeginning: null, fieldObjects: null }
    }

    let userObjects = userInfo.userObjects as IUserObject[]

    if (!userObjects) {
        console.log('No user objects')
        return {worked: false, sessionsFound: null, userObjects: null, colorMapBeginning: null, fieldObjects: null }
    }

    let hobbies = userObjects[0] as IUserObject;

    if (!hobbies) {
        console.log('No hobbies')
        return { worked: false, sessionsFound: null, userObjects: userObjects, colorMapBeginning: null, fieldObjects: null }
    }

    let hobbyTrueIndicies = [] as number[]

    const indicies = hobbies.indexes as IUserObjectIndexed[]

    let colorMapBeginning = [] as {title: string, color: string}[]

    indicies.map((indexedHobby) => {
        const i = indexedHobby.index
        hobbyTrueIndicies = [...hobbyTrueIndicies, i];
        const thisColorMapped = {title: indexedHobby.title, color: ''} as {title: string, color: string};
        colorMapBeginning = [...colorMapBeginning, thisColorMapped] as {title: string, color: string}[]
    })

    if (hobbyTrueIndicies.length <= 0) {
        console.log('No hobby indexes found');
        return { worked: false, sessionsFound: null, userObjects: userObjects, colorMapBeginning: null, fieldObjects: null };
    }

    const fieldObjects = userInfo.fieldObjects as IFieldObject[];
    const entries = userInfo.entries as IEntry[];
    let entriesIndexed: number[] = [];
    let sessionsFound: IIndexedEntry[] = [];

    if (!fieldObjects || !entries) {
        console.log('fieldObjects or entries are empty');
        return { worked: false, sessionsFound: null, userObjects: userObjects, colorMapBeginning: null, fieldObjects: null };
    }

    hobbyTrueIndicies.forEach((index) => {
        if (index !== -1) {
            let entryPosition = fieldObjects[index] as IFieldObject;
            if (entryPosition && entryPosition.entryIndexes) {
                entriesIndexed = [...entriesIndexed, ...entryPosition.entryIndexes];
            }
            let colorToAdd = colorMapBeginning[index]?.color as string;
            let color = entryPosition?.fields.find((field) => field.name === 'color')?.values as string[];
            if (color && colorToAdd) {
                colorToAdd = color[0] as string;
            }
        }
    });

    if (!entriesIndexed.length) {
        console.log('No entries indexed found');
        return { worked: false, sessionsFound: null, userObjects: userObjects, colorMapBeginning: colorMapBeginning, fieldObjects: fieldObjects };
    }

    entriesIndexed.forEach((trueIndex: number, _index: number) => {
        if (trueIndex !== -1) {
            let entryPosition = entries[trueIndex];
            if (entryPosition) {
                let newIndexEntry = {value: entryPosition.value, date: entryPosition.date, trueIndex: trueIndex} as IIndexedEntry
                if (newIndexEntry) {
                    sessionsFound.push(newIndexEntry);
                }
            }
        }
    });

    return { worked: true, sessionsFound: sessionsFound, userObjects: userObjects, colorMapBeginning: colorMapBeginning, fieldObjects: fieldObjects }
}