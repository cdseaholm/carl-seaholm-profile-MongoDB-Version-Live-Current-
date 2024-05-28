import { IRecipe } from "@/models/types/recipe";

export const getRecipes = async (urlToUse: string, userID: string): Promise<IRecipe[]> => {
        try {
            const recipesFetched = await fetch(`${urlToUse}/api/${userID}/getrecipes`, {
                next: {
                    revalidate: 3600
                }
            });
            if (!recipesFetched.ok) {
                return [];
            }
            if (recipesFetched.ok) {
                const res = await recipesFetched.json();
                const recs = res.recipes;
                if (recs.length === 0) {
                    console.log('No recipes found');
                    return [];
                }
                return recs || [];
            }
        } catch (error) {
            console.error('Error fetching recipes', error);
            return [];
        }
        return [];
    }