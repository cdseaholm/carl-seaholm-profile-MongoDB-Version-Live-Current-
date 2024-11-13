import { IRecipe } from "@/models/types/recipe";
import { getBaseUrl } from "@/utils/helpers/helpers";

export async function getRecipes() {

    const userID = process.env.ADMIN_USERNAME as string;
    const url = await getBaseUrl();

    try {
        const recipesFetched = await fetch(`/api/${userID}/getrecipes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await recipesFetched.json();

        if (data.status !== 200) {
            console.log('No recipes found');
            return { success: false, recipes: [] as IRecipe[] };
        }

        return { success: true, recipes: data.recipes as IRecipe[] };

    } catch (error) {
        console.error('Error fetching recipes', error);
        return { success: false, recipes: [] as IRecipe[] };
    }
}