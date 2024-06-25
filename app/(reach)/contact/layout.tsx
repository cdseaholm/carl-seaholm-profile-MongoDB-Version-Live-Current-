import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Carl Seaholm Contact Page',
    description: 'A page dedicated to Contacting Carl Seaholm.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}