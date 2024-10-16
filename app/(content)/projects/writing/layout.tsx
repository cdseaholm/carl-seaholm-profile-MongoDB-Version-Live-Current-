import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Carl Seaholm's Writing Page",
    description: 'A page dedicated to the writing works of Carl Seaholm.',
}

export default function WritingLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}