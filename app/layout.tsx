'use client'

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Navbar from '@/components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider } from "@/app/context/session/SessionContext";
import { ActualUser } from "@/lib/types/user";
import { validateRequest } from "@/lib/auth/session";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [isConnected, setIsConnected] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [user, setUser] = React.useState<ActualUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const thisUser = await validateRequest();
      if (thisUser === null) {
        setUser(null);
        setLoading(false);
        return;
      } else if (thisUser === undefined) {
        console.error('Failed to fetch user');
        return;
      }
      
      setLoading(false);
    }
    fetchUser();
  }, [setUser, setLoading]);
    

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

  const logout = async () => {
      const logginOut = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user }),
      })
      .then(response => {
        return response.json();
      })
      .catch(error => console.error('Error:', error));
      if (logginOut.status === 200) {
        setUser(null);
        router.refresh();
      } else {
        console.error('Failed to logout');
      }
  };

  return (
    <html lang="en">
      <SessionProvider logout={logout} connectionState={isConnected} setConnectionState={setIsConnected} setUser={setUser} user={user}>
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