import { useHobbyStore } from "@/context/hobbyStore";
import { IEntry, IIndexedEntry } from "@/models/old/types/entry";
import { IUserObject } from "@/models/old/types/userObject";
import { IUserObjectIndexed } from "@/models/old/types/userObjectIndexed";
import { HobbyColorMapType } from "@/models/types/colorMap";
import { IFieldObject } from "@/models/types/field";
import { IUser } from "@/models/types/user";

export async function HobbiesInit({ userInfo }: { userInfo: IUser }) {

    const hobbyStore = useHobbyStore.getState();

    if (!userInfo) {
        console.log('No user info')
        return { worked: false, sessionsFound: null, userObjects: null, hobbyInfoMapping: null, fieldObjects: null }
    }

    //gets the overarching objects like hobbies or recipes
    let userObjects = userInfo.userObjects as IUserObject[]

    if (!userObjects) {
        console.log('No user objects')
        return { worked: false, sessionsFound: null, userObjects: null, hobbyInfoMapping: null, fieldObjects: null }
    }

    //isolates hobbies
    let hobbies = userObjects[0] as IUserObject;

    if (!hobbies) {
        console.log('No hobbies')
        return { worked: false, sessionsFound: null, userObjects: userObjects, hobbyInfoMapping: null, fieldObjects: null }
    }

    //gets individual indexes for each specific hobby within the main object section
    const indicies = hobbies.indexes as IUserObjectIndexed[];
    hobbyStore.setUserObjectsIndexed(indicies);

    let hobbyInfoMapping = [] as { title: string, color: string, trueIndex: number }[]

    indicies.map((indexedHobby) => {
        const i = indexedHobby.index
        const thisColorMapped = { title: indexedHobby.title, color: '', trueIndex: i };
        hobbyInfoMapping.push(thisColorMapped);
    });

    if (hobbyInfoMapping.length <= 0) {
        console.log('No hobby indexes found');
        return { worked: false, sessionsFound: null, userObjects: userObjects, hobbyInfoMapping: null, fieldObjects: null };
    }

    const fieldObjects = userInfo.fieldObjects as IFieldObject[];
    hobbyStore.setFieldObjects(fieldObjects);

    const entries = userInfo.entries as IEntry[];
    hobbyStore.setHobbyEntries(entries)

    let entriesIndexed: number[] = [];
    let sessionsFound: IIndexedEntry[] = [];

    if (!fieldObjects || !entries) {
        console.log('fieldObjects or entries are empty');
        return { worked: false, sessionsFound: null, userObjects: userObjects, hobbyInfoMapping: null, fieldObjects: null };
    }

    hobbyInfoMapping.forEach((hobbyMap: { title: string, color: string, trueIndex: number }, _index: number) => {
        const trueI = hobbyMap.trueIndex;
        if (hobbyMap.trueIndex !== -1) {
            let hobbyPositionPosition = fieldObjects[trueI] as IFieldObject;
            if (hobbyPositionPosition && hobbyPositionPosition.entryIndexes) {
                //getting the index from the main user objects, mapping to field objects (which holds hobby info), then combining all entry positions
                entriesIndexed = [...entriesIndexed, ...hobbyPositionPosition.entryIndexes];
            }
            let colorPlacement = hobbyInfoMapping.find((colorMapped) => colorMapped.trueIndex === trueI);
            let color = hobbyPositionPosition?.fields.find((field) => field.name === 'color')?.values as string[];
            if (color && colorPlacement) {
                colorPlacement.color = color[0] as string;
            }
        }
    });

    if (!entriesIndexed.length) {
        console.log('No entries indexed found');
        return { worked: false, sessionsFound: null, userObjects: userObjects, hobbyInfoMapping: hobbyInfoMapping, fieldObjects: fieldObjects };
    }

    entriesIndexed.forEach((trueIndex: number, _index: number) => {
        if (trueIndex !== -1) {
            let entryPosition = entries[trueIndex];
            if (entryPosition) {
                let newIndexEntry = { value: entryPosition.value, date: entryPosition.date, trueIndex: trueIndex } as IIndexedEntry
                if (newIndexEntry) {
                    sessionsFound.push(newIndexEntry);
                }
            }
        }
    });

    hobbyStore.setSessionsIndexed(sessionsFound);


    //setting color map

    const colorMap = hobbyInfoMapping ? Array.from(new Set(hobbyInfoMapping.map((hobby) => {

        return JSON.stringify({ color: hobby.color, title: hobby.title });
    }).filter(color => color !== null).map(color => JSON.parse(color)))) as HobbyColorMapType[] : [];

    hobbyStore.setColorMap(colorMap)

    return { worked: true, sessionsFound: sessionsFound, userObjects: userObjects, fieldObjects: fieldObjects, colorMap: colorMap }
}