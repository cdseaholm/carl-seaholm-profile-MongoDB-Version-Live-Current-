
import PersonalPage from "@/components/pagecomponents/about/personalpage";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { useUserStore } from "@/context/userStore";
import { IUser } from "@/models/types/user";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const userInfo = useUserStore.getState().userInfo as IUser;
    const userName = userInfo ? userInfo.name : 'Guest';

    return {
    title: `${userName}'s Personal Page`,
    description: `A page dedicated to the personal life of ${userName}`,
  };
}

export default async function Page() {
  return (
    <MainPageBody>
      <PersonalPage />
    </MainPageBody>
  )
}