import { IHobby } from "@/models/types/hobby"

export const getCategories = async (hobbies: IHobby[]): Promise<string[]> => {
    const localCategories = [] as string[];
    hobbies.forEach((hobby: IHobby) => {
        for (let i = 0; i < hobby.categories.length; i++) {
            if (!localCategories.includes(hobby.categories[i])) {
                localCategories.push(hobby.categories[i]);
            }
        }
    });
    return localCategories;
}