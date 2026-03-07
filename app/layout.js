import "./globals.css";

import { Providers } from "@/components/Providers";
import AnnouncementPopup from "@/components/AnnouncementPopup";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://achieverssummit.com.ng";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Achievers Summit 2026 | Africa's Premier Leadership & Innovation Summit",
    template: "%s | Achievers Summit 2026",
  },
  description:
    "Join 5,000+ leaders, innovators, policymakers, and visionaries at the Achievers Summit 2026 — a 3-day International Youth Day conference in Lagos, Nigeria. August 12-14, 2026.",
  keywords: [
    "Achievers Summit",
    "leadership summit",
    "Africa innovation",
    "Lagos conference",
    "International Youth Day",
    "EAI",
    "Emmanuel Agida International",
    "African leaders",
    "youth empowerment",
    "Nigeria summit 2026",
  ],
  authors: [{ name: "Emmanuel Agida International" }],
  creator: "Emmanuel Agida International",
  publisher: "Emmanuel Agida International",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Achievers Summit 2026",
    title: "Achievers Summit 2026 | Africa's Premier Leadership & Innovation Summit",
    description:
      "Join 5,000+ leaders at a 3-day conference uniting innovators, policymakers, and changemakers redefining the African narrative. Lagos, August 12-14, 2026.",
    images: [
      {
        url: "/images/past-edition/ed-020.jpg",
        width: 1920,
        height: 1080,
        alt: "Achievers Summit 2026",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievers Summit 2026 | Connect. Lead. Achieve.",
    description:
      "Africa's premier leadership & innovation summit. 5,000+ attendees, 20+ countries, 3 days. Lagos, August 12-14, 2026.",
    images: ["/images/past-edition/ed-020.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Achievers Summit 2026",
    description:
      "Africa's Premier Leadership & Innovation Summit — a 3-day International Youth Day conference uniting innovators, policymakers, and changemakers.",
    startDate: "2026-08-12T09:00:00+01:00",
    endDate: "2026-08-14T18:00:00+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Lagos, Nigeria",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Emmanuel Agida International (EAI)",
      url: SITE_URL,
    },
    image: `${SITE_URL}/images/past-edition/ed-020.jpg`,
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_URL}/#tickets`,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
          <Providers>
            {children}
            <AnnouncementPopup />
          </Providers>
      </body>
    </html>
  );
}
