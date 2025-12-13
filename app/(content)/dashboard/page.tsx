
import { Metadata } from "next";
import DashProvider from "./components/dashProvider";

export async function generateMetadata(): Promise<Metadata> {
  // const session = await getServerSession();
  // let user = session ? session.user as IUser : {} as IUser;
  // const userName = user ? user.name : 'Guest'
  return {
    title: `Dashboard for Carl`,
    description: `A dashboard for Carl to manage their personal information and hobbies.`,
  };
}

export default async function Page() {

  return (
    <DashProvider />
  );
}