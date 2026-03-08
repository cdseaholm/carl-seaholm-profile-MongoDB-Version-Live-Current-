'use client'

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useModalStore } from "@/context/modalStore";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";

export default function ModalLogin() {

    //context
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const signInForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
        }
    });

    //variables
    const pathName = usePathname();
    const router = useRouter();

    //functions
    const handleOpenSub = () => {
        setModalOpen('subscribe');
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        setLoading(true);
        signInForm.clearErrors();

        const validated = signInForm.validate();
        if (validated.hasErrors) {
            signInForm.setErrors(validated.errors);
            setLoading(false);
            return;
        }

        event.preventDefault();

        try {

            if (session?.user !== null && session?.user !== undefined) {
                alert('You are already logged in');
                setLoading(false);
                return;
            }

            const res = await signIn('credentials', {
                email: event.currentTarget['modalLoginEmail'].value,
                password: event.currentTarget['modalLoginPassword'].value,
                redirect: false,
            });

            if (!res) {
                console.log('No response from signIn');
                setLoading(false);
                return;
            }

            if (res.error) {
                console.log('Error logging in:', res.error);
                setLoading(false);
                return;
            }

            setModalOpen('');
            setLoading(false);
            router.replace(pathName);

        } catch (error) {
            console.log('Catch Error', error);
            setLoading(false);
            return;
        }
    }

    return (
        <form id="loginForm" className="p-4 md:p-5" onSubmit={handleSubmit}>
            <LoadingOverlay visible={loading} />
            <div className="grid gap-4 mb-6 grid-rows-2">
                <TextInput
                    id="modalLoginEmail"
                    label="Email"
                    placeholder="Email"
                    required
                    {...signInForm.getInputProps('email')}
                    key={'signInEmail'}
                    error={signInForm.errors.email ? 'Invalid email' : undefined}
                />
                <PasswordInput
                    id="modalLoginPassword"
                    label="Password"
                    placeholder="Password"
                    required
                    {...signInForm.getInputProps('password')}
                    key={'signInPassword'}
                    error={signInForm.errors.password ? 'Password must be at least 6 characters' : undefined}
                />
            </div>
            <div className="flex flex-row justify-start items-center">
                <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                    Sign In
                </button>
            </div>
            <div className="flex flex-row justify-around items-center space-x-1 pt-12">
                <div className="text-sky-400 cursor-pointer text-sm hover:text-gray-700" onClick={() => setModalOpen('forgotpassword')}>
                    Forgot password?
                </div>
                {/*<div className="text-sky-700 cursor-pointer text-sm hover:text-gray-700" onClick={() => {console.log('createClicked')}}>
                    Create an account here
                </div>**/}
                <div className="text-sky-400 cursor-pointer text-sm hover:text-gray-700" onClick={handleOpenSub}>
                    Subscribe here
                </div>
            </div>
        </form>
    )
}