
import Loader from "@/components/misc/loader";
import SignUpPage from "@/components/pagecomponents/auth/signuppage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sign Up page',
    description: 'A page that allows users to sign up.',
}

export default async function Page() {
    
    return (
        <Loader>
            <SignUpPage />
        </Loader>
    )
}