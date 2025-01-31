import "@/app/globals.css";
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import { Inter } from "next/font/google";
import React from "react";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import AuthWrapper from "@/components/wrappers/authWrapper";
import PageWrapper from "@/components/wrappers/pagewrapper";
import { Toaster } from "sonner";
import { Providers } from "./context/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={inter.className} {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AuthWrapper>
            <PageWrapper>
              {children}
            </PageWrapper>
            <Providers />
            <Toaster />
          </AuthWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}