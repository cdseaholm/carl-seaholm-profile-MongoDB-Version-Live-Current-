'use client'

import { useSession } from "@/app/context/session/SessionContext";
import login from "@/lib/auth/login/login";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import { set } from "date-fns";
import { useModalContext } from "@/app/context/modal/modalContext";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.replace("/dashboard");
        }
    }, [router]);

    const { handleSubmit } = useModalContext();

    

    return (
        <>
            <InnerHeader>
                <h1 className="text-lg underline">Sign in</h1>
            </InnerHeader>
            <MainChild>
                <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-evenly">
                        <label className="py-2" htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="rounded-md px-2" />
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