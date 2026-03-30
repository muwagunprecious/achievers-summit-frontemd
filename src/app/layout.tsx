import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
