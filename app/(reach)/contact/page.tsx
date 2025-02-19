import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { useUserStore } from "@/context/userStore";
import { IUser } from "@/models/types/user";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const userInfo = useUserStore.getState().userInfo as IUser;
    const userName = userInfo ? userInfo.name : 'Guest';

    return {
        title: `${userName}'s Contact Page`,
        description: `A page dedicated to Contacting ${userName}`,
    };
}

export default async function Page() {
    return (
        <MainPageBody>
            <MainChild>
                <InnerTemplate>
                    <div className="flex flex-col justify-center items-center text-center h-full w-full space-y-2" style={{ minHeight: '50dvh' }}>
                        <h1 className="text-black font-bold">Email: cdseaholm@gmail.com</h1>
                        <h1 className="text-black font-bold">For more information, email with your inquiry.</h1>
                    </div>
                </InnerTemplate>
            </MainChild>
        </MainPageBody>
    );
};