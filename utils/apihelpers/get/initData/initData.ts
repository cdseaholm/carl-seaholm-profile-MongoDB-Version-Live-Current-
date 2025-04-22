import { useStore } from "@/context/dataStore";
import { useUserStore } from "@/context/userStore";
import { IUser } from "@/models/types/user";
import { IHobby } from "@/models/types/hobby";
import InitDashboardProps from "./initDashboardParams";
import { useHobbyStore } from "@/context/hobbyStore";

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

    useHobbyStore.getState().setUserHobbies(userHobbies);
    userStore.setUserInfo(userInfo);

    const thisMonth = useStore.getState().thisMonth;

    if (!thisMonth) {
      useStore.getState().setThisMonth(new Date().getMonth());
    }

    const initializeDashboardProps = await InitDashboardProps({ userInfo: userInfo, thisMonth: thisMonth }) as { status: boolean, message: string }

    if (initializeDashboardProps.status === false) {
      return { status: false, message: 'InitDashboardProps failed' }
    }

    return { status: true, message: 'Success' }


  } catch (error: any) {
    return { status: false, message: 'Error initializing data' };
  }
}