import { Inter } from "next/font/google";
import "@/app/globals.css";
import React from "react";
import AnimateAndAuthWrapper from "@/components/wrappers/animateAndAuthWrapper";
import PageWrapper from "@/components/wrappers/pageWrapper";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Carl Seaholm Portfolio Site',
  description: 'A site for all things Carl Seaholm',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={inter.className}>
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