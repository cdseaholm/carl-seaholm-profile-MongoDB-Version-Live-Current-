import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";
import DashMiddle from "@/components/dataInitializers/dashMiddle";
import { useUserStore } from "@/context/userStore";

export async function generateMetadata(): Promise<Metadata> {

  const userInfo = useUserStore.getState().userInfo;
  const userName = userInfo ? userInfo.name : 'Guest'

  return {
    title: `Dashboard for ${userName}`,
    description: `A dashboard for ${userName} to manage their personal information and hobbies.`,
  };
}

export default async function Page() {

  return (
    <MainPageBody>
      <DashMiddle />
    </MainPageBody>
  );
}