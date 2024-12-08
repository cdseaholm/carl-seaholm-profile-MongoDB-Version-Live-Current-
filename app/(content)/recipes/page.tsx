
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { GetData } from "@/utils/data/get";
import { Metadata } from "next";

async function initData() {
    const data = await GetData();
    const returnData = data.data;
    return returnData;
}

export async function generateMetadata(): Promise<Metadata> {
    const data = await initData();
    const userName = data.name;

    return {
        title: `${userName}'s Recipes Ratings Page`,
        description: `A page dedicated to the ratings that ${userName} has given to recipes.`,
    };
}

export default async function Page() {
    {/**const userInfo = await initData(); */}

    return (
        <MainPageBody>
            {/**<Recipes userInfo={userInfo} /> */}
            <p>Recipes Page Placeholder - Construction Zone</p>
        </MainPageBody>
    );
}
