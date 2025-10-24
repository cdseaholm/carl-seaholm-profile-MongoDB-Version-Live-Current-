
import Loader from "@/components/misc/loader";
import { useUserStore } from "@/context/userStore";
import { IUser } from "@/models/types/user";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const userData = useUserStore.getState().userInfo as IUser
    const userName = userData ? userData.name : 'Guest';

    return {
        title: `${userName}'s Recipes Ratings Page`,
        description: `A page dedicated to the ratings that ${userName} has given to recipes.`,
    };
}

export default async function Page() {
    {/**const userInfo = await initData(); */ }

    return (
        <Loader>
            {/**<Recipes userInfo={userInfo} /> */}
            <p>Recipes Page Placeholder - Construction Zone</p>
        </Loader>
    );
}
