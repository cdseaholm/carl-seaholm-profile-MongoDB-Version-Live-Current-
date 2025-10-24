
import Loader from "@/components/misc/loader";
import ProfessionalPage from "@/components/pagecomponents/about/professionalpage";
import { useUserStore } from "@/context/userStore";
import { IUser } from "@/models/types/user";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const userInfo = useUserStore.getState().userInfo as IUser;
  const userName = userInfo ? userInfo.name : 'Guest';

  return {
    title: `${userName}'s Professional Page`,
    description: `A page dedicated to the professional career of ${userName}`,
  };
}

export default async function Page() {
  return (
    <Loader>
      <ProfessionalPage />
    </Loader>
  );
}