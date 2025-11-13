import { useDataStore } from "@/context/dataStore";
import { IUser } from "@/models/types/user";
import InitDashboardProps from "./initDashboardParams";
import { useUserStore } from "@/context/userStore";
import { IHobbyData } from "@/models/types/hobbyData";
import { IMonthlyData } from "@/models/types/monthlyData";
import { ISession } from "@/models/types/session";

export async function fetchData({ endpoint, baseUrl }: { endpoint: string, baseUrl: string }, headers: HeadersInit) {

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

export async function initData({ urlToUse }: { urlToUse: string }) {

  if (urlToUse === '') {
    return { status: false, message: 'Bad url' }
  }

  const headers = { 'Authorization': `Bearer ${'cdseaholm@gmail.com'}` };

  try {
    const res = Promise.all([
      fetchData({ endpoint: '/api/get/userInfo', baseUrl: urlToUse }, headers),
      //fetchData({ endpoint: '/api/get/hobbies', baseUrl: urlToUse }, headers),
      fetchData({ endpoint: '/api/get/monthlyData', baseUrl: urlToUse }, headers),
      fetchData({ endpoint: '/api/get/hobbyData', baseUrl: urlToUse }, headers),
      fetchData({ endpoint: '/api/get/sessions', baseUrl: urlToUse }, headers),
      //fetchData({ endpoint: '/api/get/recipes' }),
      // fetchData({ endpoint: '/api/get/subs' }),
      // fetchData({ endpoint: '/api/get/tasks' }),
    ]);

    const userStore = useUserStore.getState();
    if (!res) {
      throw new Error('Error fetching data');
    }
    const [userData, monthlyData, hobbyData, sessionData] = await res;
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
    const hobbyDataInfo = hobbyData.hobbyData as IHobbyData[];
    if (!hobbyDataInfo) {
      return { status: false, message: 'Error initializing hobby data info' };
    }
    if (!monthlyData) {
      return { status: false, message: 'Error initializing monthly activity info' };
    }
    const monthlyInfo = monthlyData.monthlyInfo as IMonthlyData[];
    if (!monthlyInfo) {
      return { status: false, message: 'Error initializing monthly activity data' };
    }
    if (!sessionData) {
      return { status: false, message: 'Error initializing session info' };
    }
    const sessionInfo = sessionData.sessionInfo as ISession[];
    if (!sessionInfo) {
      return { status: false, message: 'Error initializing session data' };
    }

    // console.log('Date test:', new Date().toLocaleTimeString());
    // console.log('Date test UTC:', new Date().toUTCString());
    // console.log('Date test ISO:', new Date().toISOString());
    // console.log('Date test locale:', new Date().toLocaleString());
    // console.log('Date test locale date:', new Date().toLocaleDateString());

    useDataStore.getState().setSessions(sessionInfo);
    userStore.setUserInfo(userInfo);
    const thisMonth = useDataStore.getState().thisMonth;

    if (!thisMonth) {
      useDataStore.getState().setThisMonth(new Date().getMonth());
    }

    //begin sorting through these with new data
    const initializeDashboardProps = await InitDashboardProps({ userInfo: userInfo, hobbiesData: hobbyDataInfo, monthlyInfo: monthlyInfo, sessions: sessionInfo }) as { status: boolean, message: string }

    if (initializeDashboardProps.status === false) {
      return { status: false, message: 'InitDashboardProps failed' }
    }

    return { status: true, message: 'Success' }


  } catch (error: any) {
    return { status: false, message: 'Error initializing data' };
  }
}