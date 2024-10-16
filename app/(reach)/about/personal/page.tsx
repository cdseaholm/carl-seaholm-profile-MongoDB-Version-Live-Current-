
import PersonalPage from "@/components/pagecomponents/about/personalpage";
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