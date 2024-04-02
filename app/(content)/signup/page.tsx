'use client'

import createUser from "@/app/api/prisma/actions/user/create";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const createAccount = await createUser({ formData });
        if (createAccount) {
            router.push("/login");
        } else {
            alert("An error occurred. Please try again.");
        }
    };

	return (
		<>
			<h1>Create an account</h1>
			<form onSubmit={handleSubmit}>
                <div className="flex flex-row pr-5">
                    <label htmlFor="email">Email</label>
                    <input name="email" id="email" />
                </div>
				<br />
                <div className="flex flex-row pr-5">
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
                </div>
				<br />
                <div className="flex flex-row pr-5">
                <label htmlFor="username">Username</label>
                <input name="username" id="username" />
                </div>
				<button>Continue</button>
			</form>
			<Link href="/login">Sign in</Link>
		</>
	);
}