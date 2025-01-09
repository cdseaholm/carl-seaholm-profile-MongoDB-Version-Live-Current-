import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";
import DashMiddle from "@/components/dataInitializers/dashMiddle";
import { initData } from "@/utils/data/dashInit/initUserData";
import { IUser } from "@/models/types/user";

export async function generateMetadata(): Promise<Metadata> {
  const data = await initData() as IUser;
  const userName = data ? data.name : 'Users';

  return {
    title: `Dashboard for ${userName}`,
    description: `A dashboard for ${userName} to manage their personal information and hobbies.`,
  };
}

export default async function Page() {
  const userInfo = await initData() as IUser;
  const infoToPass = userInfo ? userInfo : {} as IUser;

  return (
    <MainPageBody>
      <DashMiddle userInfo={infoToPass} />
    </MainPageBody>
  );
}