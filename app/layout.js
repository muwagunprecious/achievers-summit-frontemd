import "./globals.css";
import Script from "next/script";

import { Providers } from "@/components/Providers";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import StyledJsxRegistry from "./registry";

export const metadata = {
  title: "Achievers Summit 2026 | Connect. Lead. Achieve.",
  description: "Achievers Summit 2026 brings together leaders, innovators, policymakers, and visionaries shaping Africa’s future in Victoria Island, Lagos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <StyledJsxRegistry>
          <Providers>
            {children}
            <AnnouncementPopup />
          </Providers>
          <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
