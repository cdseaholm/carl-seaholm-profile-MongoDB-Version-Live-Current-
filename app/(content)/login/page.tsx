'use client'

import { useSession } from "@/app/SessionContext";
import login from "@/app/api/auth/login";
import Session from "@/app/api/auth/session";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();
    console.log('LoginPage rendered');

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/dashboard");
        }
    }, [router]);

    const { setSession, setUser, user, session } = useSession();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit function called');
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (user || user && session) {
            alert('You are already logged in');
            return;
        }
        const loggedin = await login({ formData });
    
        if (typeof loggedin === 'string') {
            alert(loggedin);
            console.log(loggedin);
        } else {
            setSession(loggedin.session);
            setUser(loggedin.user);
            router.push("/dashboard");
        }
    };

    return (
        <>
            <InnerHeader>
                <h1 className="text-lg underline">Sign in</h1>
            </InnerHeader>
            <MainChild>
                <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-evenly">
                        <label className="py-2" htmlFor="email">Email</label>
                        <input name="email" id="email" className="rounded-md px-2" />
                        <br />
                        <label className="py-2" htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="rounded-md px-2" />
                        <br />
                        <button className="my-4 p-2 bg-gray-700 text-white text-sm rounded-md">Continue</button>
                    </form>
                    <div className="flex flex-row justify-around my-4 p-2 text-sm space-x-1">
                        <p className="text-black">
                            Don&apos;t have an account yet? 
                        </p>
                        <Link className="text-sky-700" href="/signup">
                            Create an account here
                        </Link>
                    </div>
                </div>
            </MainChild>
        </>
    );
}