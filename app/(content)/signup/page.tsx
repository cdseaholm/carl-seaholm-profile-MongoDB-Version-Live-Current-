
import SignUpPage from "@/components/pagecomponents/auth/signuppage";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sign Up page',
    description: 'A page that allows users to sign up.',
}

export default async function Page() {
    
    return (
        <MainPageBody>
            <SignUpPage />
        </MainPageBody>
    )
}