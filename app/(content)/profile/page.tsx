import ProfilePage from "@/components/pagecomponents/profile/profileHub";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { useUserStore } from "@/context/userStore";
import { IUser } from "@/models/types/user";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const userInfo = useUserStore.getState().userInfo as IUser;
        const user = userInfo ? userInfo.email : '';

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

    return (
        <MainPageBody>
            <ProfilePage />
        </MainPageBody>
    );

}