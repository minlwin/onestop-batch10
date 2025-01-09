"use client"

import AppProvider from "@/model/states/AppProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <AppProvider>
            {children}
          </AppProvider>
        </body>
    </html>
  );
}
