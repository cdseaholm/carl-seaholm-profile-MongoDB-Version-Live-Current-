import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'A page dedicated to allow users to login.',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}