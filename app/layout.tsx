
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import "@/app/globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import AuthWrapper from "@/components/wrappers/authWrapper";
import PageWrapper from "@/components/wrappers/pagewrapper";
import { Toaster } from "sonner";
import { ModalsProvider } from "@mantine/modals";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={inter.className} {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <ColorSchemeScript />
      </head>
      <body className="overflow-hidden">
        <AuthWrapper>
          <MantineProvider>
            <ModalsProvider>
              <PageWrapper>
                {children}
              </PageWrapper>
            </ModalsProvider>
          </MantineProvider>
          <Toaster />
        </AuthWrapper>
      </body>
    </html>
  );
}

//tooke out ModalWrapper as it was causing issues with modals not working properly implemented ModalsProvider directly here