 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { ModalProvider } from '@/app/context/modals/modalContext'
import { useState } from 'react';
import { useSession } from '@/app/context/session/SessionContext';
import { useRouter } from 'next/navigation';
import login from '@/lib/auth/login/login';
import { logoutAuth } from '@/lib/auth/logout/logout';
import ModalLogin from '@/components/modals/auth/login/loginModal';
import { usePathname } from 'next/navigation';
import createUser from '@/lib/prisma/actions/user/create/createUser';
import ModalSignUp from '@/components/modals/auth/signup/signupModal';

export function Providers({children}: { children: React.ReactNode }) {

  const [showModal, setShowModal] = useState(false);
  const { setSession, setUser, user, session, logout } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);

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
    } else if (typeof loggedin === 'string' && loggedin === 'Password is incorrect') {
        console.log('incorrectPW', loggedin);
        alert('Password is incorrect');
    } else {
        setSession(loggedin.session);
        setUser(loggedin.user);
        setShowModal(false);
        if (pathname === '/dashboard') {
          router.refresh();
        } else {
          router.replace("/dashboard");
        }
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      if (true) {
          if (session) {
            try {
              const loggingOut = await logoutAuth();
              if (loggingOut.valueOf() === true) {
                logout();
                router.replace('/');
              } else {
                alert('Already logged out');
              }
            } catch (error) {
              console.log('error logging out', error);
            }
          }
      }
    };
  }

  //better to directly send to dashboard and auto signin or ask for login after?
  const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const createAccount = await createUser({ formData });
    if (createAccount) {
        console.log('Account created', createAccount);
        setModalSignUpOpen(false);
        setShowModal(true); //ask for login after sign up
    } else {
        alert("An error occurred. Please try again.");
    }
  };

  const swapAuthDesire = async () => {
    if (modalSignUpOpen) {
      setModalSignUpOpen(false);
      setShowModal(true);
    } else if (showModal) {
      setShowModal(false);
      setModalSignUpOpen(true);
    }
  };

  return (
    <ModalProvider modalOpen={showModal} handleLogout={handleLogout} handleSubmit={handleSubmit} setModalOpen={setShowModal} setModalSignUpOpen={setModalSignUpOpen} modalSignUpOpen={modalSignUpOpen} handleSignUpSubmit={handleSignUpSubmit} swapAuthDesire={swapAuthDesire}>
      <ModalLogin/>
      <ModalSignUp/>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ModalProvider>
  )
}