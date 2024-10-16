import { GetData } from "@/utils/data/get";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";
import DashProvider from "@/components/dataInitializers/dashProvider";

async function initData() {
  const data = await GetData();
  const returnData = data.data;
  return returnData;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await initData();
  const userName = data.name;

  return {
    title: `Dashboard for ${userName}`,
    description: `A dashboard for ${userName} to manage their personal information and hobbies.`,
  };
}

export default async function Page() {
  const userInfo = await initData();

  return (
    <MainPageBody>
      <DashProvider userInfo={userInfo}/>
    </MainPageBody>
  );
}