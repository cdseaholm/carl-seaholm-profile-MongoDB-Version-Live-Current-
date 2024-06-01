import { IRecipe } from "@/models/types/recipe";

export const getRecipes = async (urlToUse: string, userID: string): Promise<IRecipe[]> => {
        try {
            const recipesFetched = await fetch(`${urlToUse}/api/${userID}/getrecipes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                next: {
                    revalidate: 3600
                }
            });
            if (!recipesFetched.ok) {
                console.log('No recipes found');
                return [];
            }
            if (recipesFetched.ok) {
                const res = await recipesFetched.json();
                return res.recipes || [];
            }
        } catch (error) {
            console.error('Error fetching recipes', error);
            return [];
        }
        return [];
    }