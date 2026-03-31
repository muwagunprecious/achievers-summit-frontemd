import type { Metadata } from "next";
import AchieversFooter from "./components/footer/AchieversFooter";
import SiteNavbar from "./components/navigation/SiteNavbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Achievers Summit Africa",
  description: "Africa's most influential leadership and entrepreneurship summit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050b11]">
        <div className="relative min-h-screen bg-[#050b11] text-[#f0f1f4]">
          <SiteNavbar />
          <main>{children}</main>
          <AchieversFooter />
        </div>
      </body>
    </html>
  );
}
