"use client"

export default function AdminLayout({
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
