"use client"

import "./globals.css";
import { LoginUserProvider } from "@/model/states/LoginUserState";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <LoginUserProvider>
            {children}
          </LoginUserProvider>
        </body>
    </html>
  );
}
