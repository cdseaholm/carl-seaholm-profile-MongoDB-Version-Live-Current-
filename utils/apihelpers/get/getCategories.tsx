import { IHobby } from "@/models/types/hobby"

export const getCategories = async (hobbies: IHobby[]): Promise<string[]> => {
    const localCategories = [] as string[];
    if (!hobbies) {
        return localCategories;
    }
    hobbies.forEach((hobby: IHobby) => {
        for (let i = 0; i < hobby.categories.length; i++) {
            const hobbyCat = hobby.categories[i];
            if (!localCategories.includes(hobbyCat ? hobbyCat : '')) {
                localCategories.push(hobbyCat ? hobbyCat : '');
            }
        }
    });
    return localCategories;
}