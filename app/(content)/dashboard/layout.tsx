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
import DashProvider from "./components/dashProvider";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Dashboard for Carl`,
        description: `A dashboard for Carl to manage their personal information and hobbies.`,
    };
}

const today = new Date();

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    const userEmail = session?.user?.email || 'cdseaholm@gmail.com';

    await connectDB();

    const userDoc = await User.findOne({ email: userEmail }).lean() as IUser | null;
    const user = serializeDoc<IUser | null>(userDoc);

    if (!user) {
        console.log('No user found');
        redirect("/");
    }

    // Parallel data fetching
    const [monthlyDoc, hobbyDoc, sessionsDoc] = await Promise.all([
        MonthlyData.find({ userId: user._id }).lean(),
        HobbyData.find({ userId: user._id }).lean(),
        Session.find({ userId: user._id }).lean(),
    ]);

    const rawMonthlyData = serializeDoc(monthlyDoc || []) as IMonthlyData[];
    const hobbyDataInfo = serializeDoc(hobbyDoc || []) as IHobbyData[];
    const sessionsInfo = serializeDoc(sessionsDoc || []) as ISession[];

    const categoriesToSet = Array.from(
        new Set(hobbyDataInfo.map(hobby => hobby.category).filter(Boolean))
    );

    const titlesToSet = Array.from(
        new Set(hobbyDataInfo.map(hobby => hobby.title).filter(Boolean))
    );

    return (
        <DashProvider
            initialDaySelected={today.toLocaleDateString()}
            sessions={sessionsInfo}
            categoriesToSet={categoriesToSet}
            titlesToSet={titlesToSet}
            hobbyData={hobbyDataInfo}
            rawMonthlyData={rawMonthlyData}
        >
            {children}
        </DashProvider>
    );
}
