import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { IUserObject } from "@/models/types/userObject";
import { IEntry } from "@/models/types/objectEntry";
import { IField } from "@/models/types/field";
import { IHobby } from "@/models/types/hobby";
import { IRecipe } from "@/models/types/recipe";
import User from "@/models/user";
import { IUser } from "@/models/types/user";

function CreateFields({ which }: { which: string }) {
    let fields = [] as IField[];
    if (which === 'hobbies') {
        const titleField = { name: 'hobbiesEntry', type: 'string', value: 'null', trackable: false, mapPiece: false } as IField;
        const dateField = { name: 'dates', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const descriptionField = { name: 'description', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const categoryField = { name: 'category', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const goalField = { name: 'goal', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const sessionField = { name: 'session', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const colorField = { name: 'color', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        fields = [...fields, titleField, dateField, descriptionField, categoryField, goalField, sessionField, colorField];
    } else if (which === 'recipes') {
        const dateField = { name: 'recipesEntry', type: 'string', value: 'null', trackable: false, mapPiece: false } as IField;
        const titleField = { name: 'title', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const noteField = { name: 'note', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const linkField = { name: 'link', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const ratingField = { name: 'rating', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        const imageField = { name: 'image', type: 'string', value: 'null', trackable: false, mapPiece: true } as IField;
        fields = [...fields, dateField, titleField, noteField, linkField, ratingField, imageField];
    }
    return fields;
}
//name, type, value, trackable, mapPiece

function CreateEntries({ oldHobbies, oldRecipes }: { oldHobbies: IHobby[], oldRecipes: IRecipe[] }) {
    let entries = [] as IEntry[];
    let splitTitles = [] as string[];
    if (oldHobbies.length > 0) {
        oldHobbies.forEach((hobby) => { splitTitles = [...splitTitles, hobby.title] });
        for (let i = 0; i < splitTitles.length; i++) {
            const currentHobby = oldHobbies[i] as IHobby;
            for (let j = 0; j < currentHobby.dates.length; j++) {
                const date = currentHobby.dates[j];
                const fields = [
                    { name: 'hobbiesEntry', type: 'string', value: `${currentHobby.title}`, trackable: false, mapPiece: false } as IField,
                    { name: 'date', type: 'string', value: date, trackable: false, mapPiece: true } as IField,
                    { name: 'description', type: 'string', value: currentHobby.descriptions[0] || 'null', trackable: false, mapPiece: true } as IField,
                    { name: 'category', type: 'string', value: currentHobby.categories[0] || 'null', trackable: false, mapPiece: true } as IField,
                    { name: 'goal', type: 'string', value: currentHobby.goals[0] || 'null', trackable: false, mapPiece: true } as IField,
                    { name: 'session', type: 'string', value: currentHobby.minutesXsessions[j] || 'null', trackable: true, mapPiece: true } as IField,
                    { name: 'color', type: 'string', value: currentHobby.color || 'null', trackable: false, mapPiece: true } as IField
                ];
                const entry = { fields: fields, date: date } as IEntry;
                entries = [...entries, entry];
            }
        }
    } else {
        for (let i = 0; i < oldRecipes.length; i++) {
            const currentRecipe = oldRecipes[i] as IRecipe;
            const fields = [
                { name: 'recipesEntry', type: 'string', value: `${currentRecipe.name}`, trackable: false, mapPiece: false } as IField,
                { name: 'note', type: 'string', value: currentRecipe.notes || 'null', trackable: false, mapPiece: true } as IField,
                { name: 'link', type: 'string', value: currentRecipe.link || 'null', trackable: false, mapPiece: true } as IField,
                { name: 'rating', type: 'number', value: currentRecipe.rating || 'null', trackable: false, mapPiece: true } as IField,
                { name: 'image', type: 'string', value: currentRecipe.image || 'null', trackable: false, mapPiece: true } as IField
            ];
            const date = currentRecipe.date;
            const entry = { fields: fields, date: date } as IEntry;
            entries = [...entries, entry];
        }
    }
    return entries;
}

export async function PUT(req: NextRequest): Promise<NextResponse> {

    const userID = req.url.split('/')[4] as string;
    try {
        await connectDB();
        const body = await req.json();
        const hobbies = body.hobbies as IHobby[];
        const recipes = body.recipes as IRecipe[];

        const hobbyFields = CreateFields({ which: 'hobbies' }) as IField[];
        const hobbyEntries = CreateEntries({ oldHobbies: hobbies, oldRecipes: [] }) as IEntry[];
        const totalMinutes = hobbyEntries.map((entry) => entry.fields.find((field) => field.name === 'session')?.value as string).reduce((acc, curr) => acc + parseInt(curr), 0);
        const newField = { name: 'totalMinutes', type: 'number', value: totalMinutes, trackable: true, mapPiece: false } as IField;
        const newFields = [...hobbyFields, newField] as IField[];
        const hobbyObject = { title: 'hobbies', fields: newFields, entries: hobbyEntries } as IUserObject;

        const recipeFields = CreateFields({ which: 'recipes' }) as IField[];
        const recipeEntries = CreateEntries({ oldHobbies: [], oldRecipes: recipes }) as IEntry[];
        const recipesObject = { title: 'recipes', fields: recipeFields, entries: recipeEntries } as IUserObject;

        const user = await User.findOne({ email: userID }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const oldObjects = user.userObjects as IUserObject[];
        const newObjects = [...oldObjects, hobbyObject, recipesObject];
        user.userObjects = newObjects;
        console.log('user.userObjects: ', user.userObjects);
        try {
            const updatedUser = await user.save();
            console.log(updatedUser);
        } catch (error) {
            console.error('Error saving user: ', error);
        }

        return NextResponse.json({ status: 200, message: 'Both Updated' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: error.message });
    }
}