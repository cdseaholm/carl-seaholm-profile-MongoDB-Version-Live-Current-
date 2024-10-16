import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { GetData } from "@/utils/data/get";
import { Metadata } from "next";

async function initData() {
    const data = await GetData();
    const returnData = data.data;
    return returnData;
  }
  
  export async function generateMetadata(): Promise<Metadata> {
    const data = await initData();
    const userName = data.name;
  
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