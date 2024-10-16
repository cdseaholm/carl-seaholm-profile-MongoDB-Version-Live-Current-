import { signIn } from "@/auth";
import { useSession } from "next-auth/react";

export default async function SignInAttempt({ event, router }: { event: React.FormEvent<HTMLFormElement>, router: any }) {
    const { data: session } = useSession();

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log('formData', Object.fromEntries(formData));

    if (session?.user) {
        console.log('You are already logged in');
        return;
    }

    try {
        const res = await fetch('/api/registerStatic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (res.ok) {
            const approvedRes = await signIn('credentials', {
                email: event.currentTarget['registerEmail'].value,
                password: event.currentTarget['registerPassword'].value,
                redirect: false
            });
            if (approvedRes && approvedRes.ok) {
                router.replace('/dashboard');
            } else {
                console.log('Error logging in:', approvedRes ? approvedRes : 'No response')
                return;
            }
        } else {
            console.log('Error creating account:', res ? res : 'No response')
            return;
        }
    } catch (error) {
        console.log('Error creating account:', error ? error : 'No error')
        return

    };
}