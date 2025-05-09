import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { getBaseUrl } from "./helpers";

export async function SignUpAttempt({ registerEmail, registerPassword, registerBlogsub, registerName, session }: { registerEmail: string, registerPassword: string, registerBlogsub: string, registerName: string, session: Session | null }) {

    const url = await getBaseUrl();

    if (!url) {
        return false;
    }

    const user = session?.user ? session.user : null;

    if (user) {
        console.log('You are already logged in');
        return false;
    }

    try {
        const res = await fetch(`${url}/api/registerStatic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ registerPassword: registerPassword, registerEmail: registerEmail, registerBlogsub: registerBlogsub, registerName: registerName }),
        });

        if (res.ok) {
            console.log('Account created successfully');
            const approvedRes = await signIn('credentials', {
                email: registerEmail,
                password: registerPassword,
                redirect: false,
            });
            if (approvedRes) {
                console.log('Logged in successfully');
            } else {
                console.log('Error logging in:', approvedRes ? approvedRes : 'No response')
                return false;
            }
            return true;

        } else {
            console.log('Error creating account:', res ? res : 'No response')
            return false;
        }
    } catch (error) {
        console.log('Error creating account:', error ? error : 'No error')
        return false;

    };
}