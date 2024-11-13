import { getHobbies } from "@/app/context/functions/getHobbies";
import { getRecipes } from "@/app/context/functions/getRecipes";
import ProfilePage from "@/components/pagecomponents/profile/profileHub";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { IHobby } from "@/models/types/hobby";
import { IRecipe } from "@/models/types/recipe";
import { IUser } from "@/models/types/user";
import { GetData } from "@/utils/data/get";

import { Metadata } from "next";

async function initData() {
    const data = await GetData();
    const hobbies = await getHobbies();
    const recipes = await getRecipes();
    const returnUserData = data.data as IUser;
    const returnHobbies = hobbies.hobbies as IHobby[];
    const returnRecipes = recipes.recipes as IRecipe[];
    const returnData = { data: returnUserData, hobbies: returnHobbies, recipes: returnRecipes };
    return returnData;
}

export async function generateMetadata(): Promise<Metadata> {
    try {
        const data = await initData();
        const userData = data.data as IUser
        const user = userData.name ? userData.name : "User";

        return {
            title: `${user} Profile Page`,
            description: `A page dedicated to controlling the profile of ${user}`,
        };
    } catch (error) {
        return {
            title: "Profile Page",
            description: "A page dedicated to controlling the profile",
        };
    }
}

export default async function Page() {
    try {
        const data = await initData();

        const userInfo = data.data as IUser
        const hobbies = data.hobbies as IHobby[];
        const recipes = data.recipes as IRecipe[];

        return (
            <MainPageBody>
                <ProfilePage hobbies={hobbies} recipes={recipes} userInfo={userInfo} />
            </MainPageBody>
        );
    } catch (error) {
        return (
            <MainPageBody>
                <div>Error loading profile page</div>
            </MainPageBody>
        );
    }
}