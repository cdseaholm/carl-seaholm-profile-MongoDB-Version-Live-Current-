import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Carl Seaholm Profile Page',
    description: 'A page dedicated to controlling the profile of Carl Seaholm.',
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}