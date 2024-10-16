import { Inter } from "next/font/google";
import React from "react";
import AnimateAndAuthWrapper from "@/components/wrappers/animateandauthwrapper";
import PageWrapper from "@/components/wrappers/pagewrapper";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <AnimateAndAuthWrapper>
        <body>
          <PageWrapper>
            {children}
          </PageWrapper>
        </body>
      </AnimateAndAuthWrapper>
    </html>
  );
}