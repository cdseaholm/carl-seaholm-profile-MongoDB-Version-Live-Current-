
import { Metadata } from "next";
import DashProvider from "./components/dashProvider";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { IUser } from "@/models/types/user";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";
import { serializeDoc } from "@/utils/data/deserialize";
import MonthlyData from "@/models/monthData";
import { IMonthlyData } from "@/models/types/monthlyData";
import HobbyData from "@/models/hobbyData";
import { HobbySessionInfo, IHobbyData, MonthlyInfo } from "@/models/types/hobbyData";
import Session from "@/models/session";
import { ISession } from "@/models/types/session";
import { HobbyCheckMarkType } from "./components/button-board/left-board/left-board";
import { Tracker } from "./components/statsView";
import InitDashboardProps from "@/utils/apihelpers/get/initData/initDashboardParams";

export async function generateMetadata(): Promise<Metadata> {
  // const session = await getServerSession();
  // let user = session ? session.user as IUser : {} as IUser;
  // const userName = user ? user.name : 'Guest'
  return {
    title: `Dashboard for Carl`,
    description: `A dashboard for Carl to manage their personal information and hobbies.`,
  };
}

const today = new Date();
const minusFiveMonths = new Date();
const thisMonth = today.getMonth();
minusFiveMonths.setMonth(thisMonth - 5);

export default async function Page() {

  const session = await getServerSession();

  let userEmail = '';

  if (!session || !session.user || !session.user.email) {
    console.log('❌ No session or user email found, loading in default user');
    userEmail = 'cdseaholm@gmail.com'; // Default email for testing
  } else {
    userEmail = session.user.email;
  }

  try {

    await connectDB();

    const userDoc = await User.findOne({ email: userEmail }).lean() as IUser;

    const user = serializeDoc<IUser>(userDoc);

    if (!userDoc || !user) {
      console.log('❌ No user found, loading in default data');
      return <DashProvider
        initialDaySelected={today.toLocaleDateString()}
        dateFilters={{
          type: "range",
          range: [minusFiveMonths, today]
        }}
        perc={[]}
        barData={{} as { date: string, time: number, color: string }}
        barDataTwo={{} as { date: string, time: number, color: string }}
        tracker={{} as Tracker}
        sessions={[] as ISession[]}
        hobbySessionInfo={[] as HobbySessionInfo[]}
        categoriesToSet={[] as string[]}
        titlesToSet={[] as string[]}
        hobbyData={[] as IHobbyData[]}
        monthInfo={[] as MonthlyInfo[]}
      />
    }

    const monthlyDoc = await MonthlyData.find({ userId: user._id }).lean() as IMonthlyData[];

    const monthlyData = serializeDoc<IMonthlyData[]>(monthlyDoc || []) as IMonthlyData[];

    const monthlyInfo = monthlyData.map((monthData: IMonthlyData) => {
      return {
        userEmail: monthData.userEmail,
        month: monthData.month,
        monthColorInfo: monthData.monthColorInfo,
        _id: monthData._id,
        createdAt: monthData.createdAt,
        updatedAt: monthData.updatedAt
      };
    }) as IMonthlyData[];

    const hobbyDoc = await HobbyData.find({ userId: user._id }).lean() as IHobbyData[];

    const hobbyDataInfo = serializeDoc<IHobbyData[]>(hobbyDoc || []) as IHobbyData[];

    const hobbiesData = hobbyDataInfo.map((data: IHobbyData) => {
      return {
        userId: data.userId,
        title: data.title,
        description: data.description,
        timeFrequency: data.timeFrequency,
        category: data.category,
        color: data.color,
        isActive: data.isActive,
        goals: data.goals,
        _id: data._id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    }) as IHobbyData[];

    const sessionsDoc = await Session.find({ userId: user._id }).lean() as ISession[];

    const sessionInfo = serializeDoc<ISession[]>(sessionsDoc || []) as ISession[];

    const sessionsInfo = sessionInfo.map((sessionData: ISession) => {
      return {
        userId: sessionData.userId,
        month: sessionData.month,
        year: sessionData.year,
        hobbyTitle: sessionData.hobbyTitle,
        date: sessionData.date,
        minutes: sessionData.minutes,
        _id: sessionData._id,
        createdAt: sessionData.createdAt,
        updatedAt: sessionData.updatedAt
      };
    }) as ISession[];

    const hobbyDataInfoInBaseForm = hobbyDataInfo.map(hobby => {
      return {
        _id: hobby._id,
        title: hobby.title
      } as HobbyCheckMarkType;
    }) as HobbyCheckMarkType[];


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

    const result = await InitDashboardProps({
      userInfo: user,
      sessions: sessionsInfo,
      hobbiesData: hobbiesData,
      monthlyInfo: monthlyInfo,
      hobbyFilters: hobbyDataInfoInBaseForm,
      dateFilters: { type: "range", range: [minusFiveMonths, today] },
      thisMonth: thisMonth
    });

    if (!result || !result.status) {
      console.error('❌ Error initializing dashboard props:', result ? result.message : 'No result returned');
      return <DashProvider
        initialDaySelected={today.toLocaleDateString()}
        dateFilters={{
          type: "range",
          range: [minusFiveMonths, today]
        }}
        perc={[]}
        barData={{} as { date: string, time: number, color: string }}
        barDataTwo={{} as { date: string, time: number, color: string }}
        tracker={{} as Tracker}
        sessions={[] as ISession[]}
        hobbySessionInfo={[] as HobbySessionInfo[]}
        categoriesToSet={categoriesToSet}
        titlesToSet={titlesToSet}
        hobbyData={hobbyDataInfo}
        monthInfo={[] as MonthlyInfo[]}
      />
    }

    return (
      <DashProvider
        initialDaySelected={today.toLocaleDateString()}
        dateFilters={{ type: "range", range: [minusFiveMonths, today] }}
        perc={result.percentagesByHobbies}
        barData={result.barData}
        barDataTwo={result.barDataTwo}
        tracker={result.tracker}
        sessions={sessionsInfo}
        hobbySessionInfo={result.hobbySessionInfo}
        categoriesToSet={categoriesToSet}
        titlesToSet={titlesToSet}
        hobbyData={hobbyDataInfo}
        monthInfo={result.monthlyInfo}
      />
    );

  } catch (error) {
    console.error('💥 Error loading dashboard page:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    redirect("/")
  }
}