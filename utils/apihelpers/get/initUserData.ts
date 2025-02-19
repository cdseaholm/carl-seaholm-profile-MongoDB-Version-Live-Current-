import { DashProps, useStore } from "@/context/dataStore";
import { useUserStore } from "@/context/userStore";
import { ColorMapType } from "@/models/types/colorMap";
import { IIndexedEntry } from "@/models/types/entry";
import { IFieldObject } from "@/models/types/field";
import { InitType } from "@/models/types/inittype";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { SetDashParams } from "@/utils/data/stats";
import DashZustandInit from "../../data/dashZustandInit";
import { IHobby } from "@/models/types/hobby";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL as string : '';

export async function fetchData({ endpoint }: { endpoint: string }, headers: HeadersInit) {

  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    next: {
      revalidate: 6000
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  const data = await response.json();
  return data;

}

export async function initData() {

  if (baseUrl === '') {
    return { status: false, message: 'Bad url' }
  }

  const headers = { 'Authorization': `Bearer ${'cdseaholm@gmail.com'}` };

  try {
    const [userData, hobbyData] = await Promise.all([
      fetchData({ endpoint: '/api/get/userInfo' }, headers),
      fetchData({ endpoint: '/api/get/hobbies' }, headers),
      //fetchData({ endpoint: '/api/get/recipes' }),
      // fetchData({ endpoint: '/api/get/subs' }),
      // fetchData({ endpoint: '/api/get/tasks' }),
    ]);

    const userStore = useUserStore.getState();

    if (!userData) {
      return { status: false, message: 'Error initializing user data' };
    }

    const userInfo = userData.userInfo as IUser;

    if (!userInfo) {
      return { status: false, message: 'Error initializing user info' };
    }

    if (!hobbyData) {
      return { status: false, message: 'Error initializing hobby info' };
    }

    const userHobbies = hobbyData.hobbies as IHobby[];

    if (!userHobbies) {
      return { status: false, message: 'Error initializing hobbies' };
    }

    userStore.setUserHobbies(userHobbies);
    userStore.setUserInfo(userInfo);

    const thisMonth = useStore.getState().thisMonth;
    const daySelected = useStore.getState().daySelected;

    if (!daySelected) {
      useStore.getState().setDaySelected(new Date().toLocaleDateString())
    }

    if (!thisMonth) {
      useStore.getState().setThisMonth(new Date().getMonth());
    }

    const timeData = await SetDashParams({ userInfo: userInfo, month: thisMonth }) as InitType;

    if (!timeData) {
      return { status: false, message: 'Error initializing timeData' };
    }

    const totalTimePerMonth = timeData.totalTimePerMonth ? timeData.totalTimePerMonth : [] as number[];
    const userObjects = timeData.userObjects ? timeData.userObjects : [] as IUserObject[];
    const sessionsFound = timeData.sessionsFound ? timeData.sessionsFound : [] as IIndexedEntry[];
    const colorMap = timeData.colorMap ? timeData.colorMap : [] as ColorMapType[];
    const fieldObjects = timeData.fieldObjects ? timeData.fieldObjects : [] as IFieldObject[];
    const objectToUse = timeData.firstObject ? timeData.firstObject : {} as IUserObject;

    const newDashProps = { userInfo: userInfo, totalTimePerMonth: totalTimePerMonth, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: fieldObjects, objectToUse: objectToUse } as DashProps;

    if (!newDashProps) {
      return { status: false, message: 'Error initializing newDashProps' };
    }

    const initialized = await DashZustandInit({ userInfo, thisMonth, totalTimePerMonth, sessionsFound, fieldObjects, objectToUse }) as { status: boolean, message: string };

    if (!initialized) {
      return { status: false, message: 'Error initializing initialized' };
    }

    if (initialized.status !== true) {
      return { status: false, message: 'False initialized' };
    }

    useStore.getState().setDashProps(newDashProps);

    return { status: true, message: 'Success' };


  } catch (error: any) {
    return { status: false, message: 'Error initializing data' };
  }
}