import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'NP Web Apps',
    description: 'A page dedicated to web pages and apps that Carl Seahom has written.',
}

export default function NPWebAppsLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}