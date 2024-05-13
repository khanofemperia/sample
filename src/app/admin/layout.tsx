import Navbar from "@/components/admin/Navbar";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-10 min-h-[calc(100vh-56px)] bg-neutral-50">
        <div className="w-full max-w-screen-lg mx-auto">{children}</div>
      </main>
    </>
  );
}
