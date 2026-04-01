import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import { serializeDoc } from "@/utils/data/deserialize";
import User from "@/models/user";
import MonthlyData from "@/models/monthData";
import HobbyData from "@/models/hobbyData";
import Session from "@/models/session";
import { IUser } from "@/models/types/user";
import { IMonthlyData } from "@/models/types/monthlyData";
import { IHobbyData } from "@/models/types/hobbyData";
import { ISession } from "@/models/types/session";
import { HobbyCheckMarkType } from "./components/button-board/left-board/left-board";
import InitDashboardProps from "@/utils/apihelpers/get/initData/initDashboardParams";
import DashProvider from "./components/dashProvider";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Dashboard for Carl`,
        description: `A dashboard for Carl to manage their personal information and hobbies.`,
    };
}

const today = new Date();
const minusFiveMonths = new Date();
const thisMonth = today.getMonth();
minusFiveMonths.setMonth(thisMonth - 5);

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    const userEmail = session?.user?.email || 'cdseaholm@gmail.com';

    try {
        await connectDB();

        const userDoc = await User.findOne({ email: userEmail }).lean() as IUser;
        const user = serializeDoc<IUser>(userDoc);

        if (!user) {
            console.log('❌ No user found');
            redirect("/");
        }

        // Parallel data fetching
        const [monthlyDoc, hobbyDoc, sessionsDoc] = await Promise.all([
            MonthlyData.find({ userId: user._id }).lean(),
            HobbyData.find({ userId: user._id }).lean(),
            Session.find({ userId: user._id }).lean(),
        ]);

        const monthlyInfo = serializeDoc(monthlyDoc || []) as IMonthlyData[];
        const hobbyDataInfo = serializeDoc(hobbyDoc || []) as IHobbyData[];
        const sessionsInfo = serializeDoc(sessionsDoc || []) as ISession[];

        const categoriesToSet: string[] = [];
        const titlesToSet: string[] = [];
        hobbyDataInfo.forEach(hobby => {
            if (hobby.category && !categoriesToSet.includes(hobby.category)) {
                categoriesToSet.push(hobby.category);
            }
            if (hobby.title && !titlesToSet.includes(hobby.title)) {
                titlesToSet.push(hobby.title);
            }
        });

        const hobbyFilters = hobbyDataInfo.map(hobby => ({
            _id: hobby._id,
            title: hobby.title
        })) as HobbyCheckMarkType[];

        const result = await InitDashboardProps({
            userInfo: user,
            sessions: sessionsInfo,
            hobbiesData: hobbyDataInfo,
            monthlyInfo: monthlyInfo,
            hobbyFilters: hobbyFilters,
            dateFilters: { type: "range", range: [minusFiveMonths, today] },
            thisMonth: thisMonth
        });

        if (!result?.status) {
            console.error('❌ Error initializing dashboard props:', result?.message);
            redirect("/");
        }

        return (
            <DashProvider
                initialDaySelected={today.toLocaleDateString()}
                perc={result.percentagesByHobbies}
                barData={result.barData}
                barDataTwo={result.barDataTwo}
                tracker={result.daysWithPie}
                sessions={sessionsInfo}
                hobbySessionInfo={result.hobbySessionInfo}
                categoriesToSet={categoriesToSet}
                titlesToSet={titlesToSet}
                hobbyData={hobbyDataInfo}
                monthInfo={result.monthlyInfo}
            >
                {children}
            </DashProvider>
        );

    } catch (error) {
        console.error('💥 Error loading dashboard:', error);
        redirect("/");
    }
}