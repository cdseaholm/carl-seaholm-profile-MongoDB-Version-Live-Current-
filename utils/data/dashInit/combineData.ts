import { newSesh } from "@/components/modals/modalContent/LogSession/logsessiondatainit";
import { IIndexedEntry } from "@/models/types/entry";
import { IField, IFieldObject } from "@/models/types/field";

export async function CombineNewAndOld({ fieldObjects, sessionsFound, seshCheck }: { fieldObjects: IFieldObject[], sessionsFound: IIndexedEntry[], seshCheck: newSesh[] }) {

    let newSessionsArray = [...sessionsFound] as IIndexedEntry[];
    let newFieldObjectsArray = [...fieldObjects] as IFieldObject[];

    if (!seshCheck) {
        return { combinedFields: fieldObjects, combinedEntries: sessionsFound } as { combinedFields: IFieldObject[], combinedEntries: IIndexedEntry[] }
    }

    seshCheck.forEach((newSession: newSesh, _index: number) => {
        const hobIndex = newSession.hobbyTitleIndex as number
        const matchingFieldsEntries = fieldObjects[hobIndex] as IFieldObject;

        if (matchingFieldsEntries) {
            let matchingFieldsEntryIndexes = matchingFieldsEntries.entryIndexes as number[];
            let newMatchingFieldsIndexesArray = [...matchingFieldsEntryIndexes] as number[];
            let newSeshIndex = newSession.newIndex as number;
            if (newSeshIndex) {
                newMatchingFieldsIndexesArray.push(newSeshIndex);
                let newFieldObject = {
                    fields: matchingFieldsEntries.fields as IField[],
                    entryIndexes: newMatchingFieldsIndexesArray,
                    _id: matchingFieldsEntries._id,
                } as IFieldObject;
                if (newFieldObject) {
                    newFieldObjectsArray[hobIndex] = newFieldObject;
                }
            }
            let newEntry = {
                value: newSession.value,
                date: newSession.date
            } as IIndexedEntry

            if (newEntry) {
                newSessionsArray.push(newEntry);
            }
        }
    });

    return { combinedFields: newFieldObjectsArray, combinedEntries: newSessionsArray } as { combinedFields: IFieldObject[], combinedEntries: IIndexedEntry[] }
}
