'use client'

import login from "@/app/api/auth/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage({ user }: { user: any }) {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/dashboard");
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const loggedin = await login({ formData });

        if (loggedin === 'Logged in successfully') {
            router.push("/dashboard");
        } else {
            alert(loggedin);
            console.log(loggedin);
        }
    };

    return (
        <>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input name="email" id="email" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button>Continue</button>
            </form>
            <Link href="/signup">Create an account</Link>
        </>
    );
}