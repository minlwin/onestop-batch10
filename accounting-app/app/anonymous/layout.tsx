"use client"

export default function AnonymousLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-8">
      {/* Title */}
      <h1 className="text-3xl">My Balance</h1>
      
      <div className="flex flex-row mt-4">

        <div className="basis-3/4">
          {/* Cover Image */}
          <img src="/cover-image.jpg" alt="" />
        </div>

        <div className="basis-1/4 p-4">
          {children}
        </div>
      </div>

    </main>
  );
}
