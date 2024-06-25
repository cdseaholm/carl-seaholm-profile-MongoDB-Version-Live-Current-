import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Carl Seaholm Blog',
    description: 'A page dedicated to the blog Carl Seaholm had written.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}