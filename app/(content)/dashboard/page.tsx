
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";
import DashProvider from "@/components/dataInitializers/dashProvider";
import { IUser } from "@/models/types/user";
import { GetData } from "@/utils/data/get";
import { SetDashParams } from "@/utils/data/dashInit/stats";
import { IUserObject } from "@/models/types/userObject";
import { IEntry } from "@/models/types/entry";
import { ColorMapType } from "@/models/types/colorMap";
import { IFieldObject } from "@/models/types/field";

async function initData() {
  const data = await GetData();
  const returnData = data.data as IUser;
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
  const thisMonth = new Date().getMonth() as number;
  const timeData = await SetDashParams({userInfo: userInfo, month: thisMonth})
  const totalTimePerMonth = timeData.totalTimePerMonth as number[]
  const totalCounter = timeData.totalCounter as number[]
  const userObjects = timeData.userObjects as IUserObject[]
  const sessionsFound = timeData.sessionsFound as IEntry[]
  const colorMap = timeData.colorMap as ColorMapType[];
  const fieldObjects = timeData.fieldObjects as IFieldObject[]
  const sortedSessions = sessionsFound.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


  return (
    <MainPageBody>
      <DashProvider userInfo={userInfo} totalTimePerMonth={totalTimePerMonth} totalCount={totalCounter} userObjects={userObjects} month={thisMonth} sessionsFound={sortedSessions} colorMap={colorMap} fieldObjects={fieldObjects}/>
    </MainPageBody>
  );
}