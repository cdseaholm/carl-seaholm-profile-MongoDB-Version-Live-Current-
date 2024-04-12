'use client'

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Navbar from '@/components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ActualUser } from "@/types/user";
import { SessionProvider } from "@/app/context/session/SessionContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [isConnected, setIsConnected] = useState(false);
  const pathname = usePathname();
  //const [loading, setLoading] = React.useState(true);
  const [userState, setUserState] = React.useState<ActualUser | null>(null);

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

  //fetch session was here

  const logout = () => {
    setUserState(null);
  };

  const handleLogin = async (formData: FormData) => {
    const tryLogin = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).catch(e => {
      console.error('Fetch error:', e);
    });

    if (tryLogin.error) {
      console.log(tryLogin.error);
      return tryLogin.error;
    } else {
      setUserState(tryLogin.user);
      return 'success';
    }
  }

  return (
    <html lang="en">
      <SessionProvider logout={logout} setUser={setUserState} user={userState} connectionState={isConnected} setConnectionState={setIsConnected} getSession={function (): Promise<any> {
        throw new Error("Function not implemented.");
      } }>
      {pathname !== '/demo_303' &&
      <body className={inter.className}>
        <div className="first">
          <div className="h-screen">
            <>
              <SpeedInsights/>
              <Providers>
                <Navbar />
                <main>
                  {children}
                </main>
                <FooterNavBar />
              </Providers>
            </>
          
          </div>
        </div>
      </body>
      }

      {pathname === '/demo_303' &&
          <body>
            <main className="min-h-screen bg-gray-800">
              {children}
            </main>
          </body>
        }
        </SessionProvider>
    </html>
  );
}