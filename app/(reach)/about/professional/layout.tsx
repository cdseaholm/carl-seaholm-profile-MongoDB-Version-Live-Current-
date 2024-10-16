import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Carl Seaholm Professional Page',
    description: 'A page dedicated to the Professional life of Carl Seaholm.',
}

export default function ProfessionalLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}