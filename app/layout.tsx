'use client'

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Navbar from '@/components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "@/app/context/session/SessionContext";
import type { Session as SessionType } from "lucia";
import { ActualUser } from "@/types/user";
import Session from "@/lib/auth/session/session";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const [sessionState, setSessionState] = React.useState<SessionType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [userState, setUserState] = React.useState<ActualUser | null>(null);

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

    useEffect(() => {
      if (sessionState !== null) {
        return;
      }

      const fetchSession = async () => {
        console.log('Fetching session...');
          try {
              const { user, session } = await Session();
              setSessionState(session);
              setUserState(user);
          } catch (error) {
              console.error("Failed to fetch session:", error);
          } finally {
              setLoading(false);
          }
      };
      fetchSession();
    }, [setSessionState, setUserState, sessionState]);

    const logout = () => {
      setSessionState(null);
      setUserState(null);
    };



  return (
    <html lang="en">
      <SessionProvider session={sessionState} user={userState} loading={loading} logout={logout} setSession={setSessionState} setUser={setUserState}>
      {pathname !== '/demo_303' &&
      <body className={inter.className}>
        <div className="first">
          <div className="h-screen">
          {loading ? (
            <div>Loading...</div>
          ) : (
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
          )}
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