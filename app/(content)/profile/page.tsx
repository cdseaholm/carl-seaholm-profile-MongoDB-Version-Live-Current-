import ProfilePage from "@/components/pagecomponents/profile/profileHub";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { GetData } from "@/utils/data/get";
import { getUrl } from "@/utils/helpers/config";
import { Metadata } from "next";

async function initData() {
    const urlToUse = await getUrl();
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME as string;
    try {
        const data = await GetData();
        const hobbies = await fetch(urlToUse + '/api/' + userID + '/gethobbies').then((res) => res.json());
        const tasks = await fetch(urlToUse + '/api/' + userID + '/getTasks').then((res) => res.json());
        const recipes = await fetch(urlToUse + '/api/' + userID + '/getrecipes').then((res) => res.json());
        const returnData = { data: data, hobbies: hobbies, tasks: tasks, recipes: recipes , urlToUse: urlToUse, userID: userID};
        return returnData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
    }
}

export async function generateMetadata(): Promise<Metadata> {
    try {
        const data = await initData();
        const userName = data.data.data.name;

        return {
            title: `${userName} Profile Page`,
            description: `A page dedicated to controlling the profile of ${userName}`,
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Profile Page",
            description: "A page dedicated to controlling the profile",
        };
    }
}

export default async function Page() {
    try {
        const data = await initData();

        return (
            <MainPageBody>
                <ProfilePage hobbies={data.hobbies} tasks={data.tasks} recipes={data.recipes} urlToUse={data.urlToUse} userID={data.userID}/>
            </MainPageBody>
        );
    } catch (error) {
        console.error("Error rendering page:", error);
        return (
            <MainPageBody>
                <div>Error loading profile page</div>
            </MainPageBody>
        );
    }
}