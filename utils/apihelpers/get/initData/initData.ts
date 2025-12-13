import { useDataStore } from "@/context/dataStore";
import { IUser } from "@/models/types/user";
import { useUserStore } from "@/context/userStore";
import { IHobbyData } from "@/models/types/hobbyData";
import { IMonthlyData } from "@/models/types/monthlyData";
import { ISession } from "@/models/types/session";
import { HobbyCheckMarkType } from "@/app/(content)/dashboard/components/button-board/left-board/left-board";
import { useHobbyStore } from "@/context/hobbyStore";

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
    return { status: false, message: 'Bad url', sessionInfo: [] as ISession[], monthlyInfo: [] as IMonthlyData[], hobbyData: [] as IHobbyData[], userInfo: {} as IUser }
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

    if (!res) {
      throw new Error('Error fetching data');
    }
    const [userData, monthlyData, hobbyData, sessionData] = await res;

    if (!userData || !monthlyData || !hobbyData || !sessionData) {
      return { status: false, message: 'Incomplete data from server', sessionInfo: [] as ISession[], monthlyInfo: [] as IMonthlyData[], hobbyData: [] as IHobbyData[], userInfo: {} as IUser };
    }

    const userInfo = userData.userInfo as IUser;
    const hobbyDataInfo = hobbyData.hobbyData as IHobbyData[];
    const monthlyInfo = monthlyData.monthlyInfo as IMonthlyData[];
    const sessionInfo = sessionData.sessionInfo as ISession[];

    if (!userInfo || !hobbyDataInfo || !monthlyInfo || !sessionInfo) {
      return { status: false, message: 'Incomplete data received from server', sessionInfo: [] as ISession[], monthlyInfo: [] as IMonthlyData[], hobbyData: [] as IHobbyData[], userInfo: {} as IUser };
    }

    const thisMonth = useDataStore.getState().thisMonth;

    const currDateFilters = useDataStore.getState().filteredDates;
    if (!currDateFilters || !currDateFilters.range || (currDateFilters.range[0] === null && currDateFilters.range[1] === null)) {
      const today = new Date();
      const minusFiveMonths = thisMonth - 5 < 0 ? 12 + (thisMonth - 5) : thisMonth - 5;
      useDataStore.getState().setFilteredDates({ type: 'range', range: [new Date(today.getFullYear(), minusFiveMonths, 1), today] });
    }

    const currHobbyFilters = useDataStore.getState().filteredHobbies;
    if (currHobbyFilters.length === 0 || !currHobbyFilters || currHobbyFilters === [] as IHobbyData[]) {
      const hobbyDataInfoInBaseForm = hobbyDataInfo.map(hobby => {
        return {
          _id: hobby._id,
          title: hobby.title
        } as HobbyCheckMarkType;
      });
      useDataStore.getState().setFilteredHobbies([...hobbyDataInfoInBaseForm]);
    }

    const categoriesToSet = [] as string[];
    const titlesToSet = [] as string[];
    hobbyDataInfo.forEach(hobby => {
      if (hobby.category && !categoriesToSet.includes(hobby.category)) {
        categoriesToSet.push(hobby.category);
      }
      if (hobby.title && !titlesToSet.includes(hobby.title)) {
        titlesToSet.push(hobby.title);
      }
    });
    useHobbyStore.getState().setCategories(categoriesToSet);
    useHobbyStore.getState().setTitles(titlesToSet);

    if (!thisMonth) {
      useDataStore.getState().setThisMonth(new Date().getMonth());
    }

    //begin sorting through these with new data

    return { status: true, message: 'Success', sessionInfo: sessionInfo, monthlyInfo: monthlyInfo, hobbyData: hobbyDataInfo, userInfo: userInfo };


  } catch (error: any) {
    return { status: false, message: 'Error initializing data', sessionInfo: [] as ISession[], monthlyInfo: [] as IMonthlyData[], hobbyData: [] as IHobbyData[], userInfo: {} as IUser };
  }
}

export async function SetBaseData(sessionInfo: ISession[], hobbyDataInfo: IHobbyData[], monthlyInfo: IMonthlyData[], userInfo: IUser) {

  if (!sessionInfo || !hobbyDataInfo || !monthlyInfo || !userInfo) {
    return { status: false, message: 'Bad data provided' };
  }

  try {
    useDataStore.getState().setSessions(sessionInfo);
    useDataStore.getState().setHobbyData(hobbyDataInfo);
    useDataStore.getState().setMonthlyData(monthlyInfo);
    useUserStore.getState().setUserInfo(userInfo);
    return { status: true, message: 'Base data set successfully' };
  } catch (error: any) {
    console.error('Error setting base data:', error);
    return { status: false, message: 'Error setting base data' };
  }

}