 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
//import { ModalProvider } from '@/app/modalContext'
import { useState } from 'react';
import { useSession } from './SessionContext';
import { useRouter } from 'next/navigation';
import login from '@/lib/auth/login/login';
import logoutAuth from '@/lib/auth/logout/logout';
import logout from '@/lib/auth/session/session';
import ModalLogin from '@/components/modals/auth/login/loginModal';

export function Providers({children}: { children: React.ReactNode }) {
  {/**

  const [show, setShow] = useState(false);
  const { setSession, setUser, user, session } = useSession();
  const router = useRouter();

  const handleSubmit = () => async (event: React.FormEvent<HTMLFormElement>) => {
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
    } else if (typeof loggedin === 'string' && loggedin === 'Password is incorrect') {
        console.log('incorrectPW', loggedin);
        alert('Password is incorrect');
    } else {
        setSession(loggedin.session);
        setUser(loggedin.user);
        router.push("/dashboard");
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      if (session) {
        const loggingOut = await logoutAuth({ session });
        if (loggingOut === 'Logged out successfully') {
          logout();
          router.push('/login');
        } else {
          alert('Already logged out');
          console.log(loggingOut);
        }
      }
    }
  };
  */}

  return (
    //<ModalProvider modalOpen={show} logout={handleLogout} login={handleSubmit} setModalOpen={setShow}>
      //{<ModalLogin show={modalOpen ? modalOpen : false} attemptLogin={login}>
        //{children}
 // </ModalLogin>}
      <NextUIProvider>
        {children}
      </NextUIProvider>
    //</ModalProvider>
  )
}