import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";
import { IUserObject } from "@/models/types/userObject";
import { IIndexedEntry } from "@/models/types/entry";
import { ColorMapType } from "@/models/types/colorMap";
import { IFieldObject } from "@/models/types/field";
import DashMiddle from "@/components/dataInitializers/dashMiddle";
import { initData } from "@/utils/data/dashInit/initUserData";

export type InitType = {
  totalTimePerMonth: number[] | null,
  totalCounter: number[] | null,
  userObjects: IUserObject[] | null,
  sessionsFound: IIndexedEntry[] | null,
  colorMap: ColorMapType[] | null,
  fieldObjects: IFieldObject[] | null,
  firstObject: IUserObject | null
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
  let userInfo = await initData();

  if (!userInfo) {
    return (
      <MainPageBody>
        <p>Error Initializing</p>
      </MainPageBody>
    );
  }

  return (
    <MainPageBody>
      <DashMiddle userInfo={userInfo}/>
    </MainPageBody>
  );
}