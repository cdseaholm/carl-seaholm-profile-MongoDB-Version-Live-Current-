
import ProfessionalPage from "@/components/pagecomponents/about/professionalpage";
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
    title: `${userName}'s Professional Page`,
    description: `A page dedicated to the professional career of ${userName}`,
  };
}

export default async function Page() {
  return (
    <MainPageBody>
      <ProfessionalPage />
    </MainPageBody>
  );
}