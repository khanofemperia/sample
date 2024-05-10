import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mt-[116px] md:mt-16">{children}</main>
      <Footer />
    </>
  );
}
