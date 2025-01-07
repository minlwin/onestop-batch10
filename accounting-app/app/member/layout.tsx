"use client"

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          {children}
        </body>
    </html>
  );
}
