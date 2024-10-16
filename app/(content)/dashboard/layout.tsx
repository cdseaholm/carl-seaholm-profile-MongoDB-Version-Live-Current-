import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Carl Seaholm's Dashboard",
    description: 'A dashboard for Carl Seaholm to manage his personal information and hobbies.',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}