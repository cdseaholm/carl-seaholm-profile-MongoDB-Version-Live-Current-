import { IEntry } from "@/models/old/types/entry";
import { IUserObject } from "@/models/old/types/userObject";
import { IUserObjectIndexed } from "@/models/old/types/userObjectIndexed";
import { IField, IFieldObject } from "@/models/types/field";
import { IHobby } from "@/models/types/hobby";
import { IRecipe } from "@/models/types/recipe";
import { getBaseUrl } from "@/utils/helpers/helpers";

async function CreateHobbyFields({ titles, hobbies }: { titles: Set<string>, hobbies: IHobby[] }) {
    let allHobbies = [] as IUserObjectIndexed[];
    let fieldObjects = [] as IFieldObject[]
    let entries = [] as IEntry[];
    let fieldObjectIndex = -1;
    let entryIndex = -1;
    titles.forEach((title) => {
        let fields = [] as IField[]
        let entryIndexes = [] as number[]
        //object
        fieldObjectIndex += 1 as number;
        let hobbyObject = { title: title, index: fieldObjectIndex } as IUserObjectIndexed;
        allHobbies = [...allHobbies, hobbyObject];

        //the fields
        const hobToMap = hobbies.find((hob) => hob.title === title) as IHobby;

        const descriptions = hobToMap.descriptions as string[];
        const descriptionField = { name: 'descriptions', values: descriptions, trackable: false, type: 'string', mapPiece: false } as IField


        const categories = hobToMap.categories as string[];
        const categoryField = { name: 'category', values: categories, trackable: false, type: 'string', mapPiece: false } as IField;

        const goals = hobToMap.goals as string[];
        const goalField = { name: 'goal', type: 'string', values: goals, trackable: false, mapPiece: false } as IField;

        const color = hobToMap.color as string;
        const colorField = { name: 'color', type: 'string', values: [color], trackable: false, mapPiece: false } as IField;

        const dates = hobToMap.dates as string[];
        const sessions = hobToMap.minutesXsessions as string[];
        let totalMinutes = 0;
        //the entries
        for (let i = 0; i < sessions.length; i++) {
            const session = sessions[i] as string;
            const date = dates[i] as string;
            const minutes = parseInt(session);
            totalMinutes += minutes;
            const newEntry = { value: session, date: date } as IEntry;
            entryIndex = entryIndex + 1 as number;
            entries = [...entries, newEntry] as IEntry[];
            entryIndexes = [...entryIndexes, entryIndex] as number[]
        }

        const totalMinutesField = { name: 'totalMinutes', type: 'number', values: [totalMinutes.toString()], trackable: true, mapPiece: false } as IField;

        fields = [...fields, descriptionField, categoryField, goalField, colorField, totalMinutesField] as IField[];

        const individualHobby = { fields: fields, entryIndexes: entryIndexes } as IFieldObject;

        fieldObjects = [...fieldObjects, individualHobby] as IFieldObject[]
    });

    return { hobbyFieldObjects: fieldObjects as IFieldObject[], hobbyEntries: entries as IEntry[], allHobbies: allHobbies as IUserObjectIndexed[] }
}


async function CreateRecipeFields({ oldRecipes, objectsLength }: { oldRecipes: IRecipe[], objectsLength: number }) {
    let allRecipes = [] as IUserObjectIndexed[]
    let fieldObjects = [] as IFieldObject[]
    let fieldObjectIndex = objectsLength as number;

    oldRecipes.forEach((recipe) => {
        let fields = [] as IField[]
        //object
        fieldObjectIndex += 1 as number;
        let recipeObject = { title: recipe.name, index: fieldObjectIndex } as IUserObjectIndexed;
        allRecipes = [...allRecipes, recipeObject] as IUserObjectIndexed[];

        const dateField = { name: 'date', type: 'string', values: [recipe.date], trackable: false, mapPiece: true } as IField;
        const noteField = { name: 'note', type: 'string', values: [recipe.notes], trackable: false, mapPiece: true } as IField;
        const linkField = { name: 'link', type: 'string', values: [recipe.link], trackable: false, mapPiece: true } as IField;
        const ratingField = { name: 'rating', type: 'string', values: [recipe.rating.toString()], trackable: false, mapPiece: true } as IField;
        const imageField = { name: 'image', type: 'string', values: [recipe.image], trackable: false, mapPiece: true } as IField;
        fields = [...fields, dateField, noteField, linkField, ratingField, imageField] as IField[];
        const individualRecipe = { fields: fields, entryIndexes: [-1] } as IFieldObject;
        fieldObjects = [...fieldObjects, individualRecipe] as IFieldObject[]
    });

    return { recipeFieldObjects: fieldObjects as IFieldObject[], recipeEntries: [] as IEntry[], allRecipes: allRecipes as IUserObjectIndexed[] }
}

export async function AttemptToUpdateOldModel({ hobbies, recipes, userID }: { hobbies: IHobby[], recipes: IRecipe[], userID: string }, headers: HeadersInit) {

    const uniqueTitlesSet = new Set<string>();
    hobbies.forEach((hob) => {
        if (uniqueTitlesSet.has(hob.title)) {
            return;
        }
        uniqueTitlesSet.add(hob.title);
    });
    let objects = [] as IUserObject[]
    const { hobbyFieldObjects, hobbyEntries, allHobbies } = await CreateHobbyFields({ titles: uniqueTitlesSet, hobbies: hobbies }) as { hobbyFieldObjects: IFieldObject[], hobbyEntries: IEntry[], allHobbies: IUserObjectIndexed[] };
    let objectsLength = allHobbies.length as number;
    const hobbyObject = { title: "hobbies", indexes: allHobbies } as IUserObject
    objects = [...objects, hobbyObject] as IUserObject[]

    const { recipeFieldObjects, recipeEntries, allRecipes } = await CreateRecipeFields({ oldRecipes: recipes, objectsLength: objectsLength }) as { recipeFieldObjects: IFieldObject[], recipeEntries: IEntry[], allRecipes: IUserObjectIndexed[] }
    const recipeObject = { title: "recipes", indexes: allRecipes } as IUserObject
    objects = [...objects, recipeObject] as IUserObject[]

    const fieldObjects = [...hobbyFieldObjects, ...recipeFieldObjects] as IFieldObject[]
    const entries = [...hobbyEntries, ...recipeEntries] as IEntry[];



    const newObjects = [fieldObjects, entries, objects] as [IFieldObject[], IEntry[], IUserObject[]];

    const url = await getBaseUrl();

    if (!url) {
        return false;
    }

    try {

        const updatedFields = await fetch(`${url}/api/transferOldObjects`, {
            method: 'PUT',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID: userID, newObjects: newObjects }),
        });
        const response = await updatedFields.json();
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}