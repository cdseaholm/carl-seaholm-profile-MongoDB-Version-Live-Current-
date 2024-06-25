import { Inter } from "next/font/google";
import "@/app/globals.css";
import React from "react";
import AnimateAndAuthWrapper from "@/components/misc/animateandauthwrapper";
import PageWrapper from "@/components/misc/pagewrapper";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Carl Seaholm Portfolio Site',
  description: 'A site for all things Carl Seaholm',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <AnimateAndAuthWrapper>
        <body className={`${inter.className}`}>
          <PageWrapper>
            {children}
          </PageWrapper>
        </body>
      </AnimateAndAuthWrapper>
    </html>
  );
}