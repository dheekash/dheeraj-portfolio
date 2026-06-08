import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { StickyResumeButton } from "@/components/common/StickyResumeButton";
import { GlassBackground } from "@/components/layout/GlassBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://dheerajkashyap.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Dheeraj Kashyap | BI & Analytics Engineer — Microsoft Fabric, Databricks, Snowflake, Power BI",
    template: "%s | Dheeraj Kashyap",
  },
  description:
    "Senior BI & Analytics Engineer with 7+ years of experience delivering Lakehouse architectures, enterprise reporting, and scalable data platforms using Microsoft Fabric, Databricks, Snowflake, and Power BI.",
  keywords: [
    "BI Engineer",
    "Analytics Engineer",
    "Microsoft Fabric",
    "Databricks",
    "Snowflake",
    "Power BI Developer",
    "Data Engineer",
    "Lakehouse Architecture",
    "Business Intelligence",
    "Analytics Engineering",
    "Dheeraj Kashyap",
    "dbt",
    "PySpark",
    "Delta Lake",
    "SQLMesh",
  ],
  authors: [{ name: "Dheeraj Kashyap", url: siteUrl }],
  creator: "Dheeraj Kashyap",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dheeraj Kashyap",
    title: "Dheeraj Kashyap | BI & Analytics Engineer",
    description:
      "Senior BI & Analytics Engineer specializing in Microsoft Fabric, Databricks, Snowflake, Power BI, and Lakehouse Architecture.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Dheeraj Kashyap — BI & Analytics Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dheeraj Kashyap | BI & Analytics Engineer",
    description:
      "Senior BI & Analytics Engineer — Microsoft Fabric, Databricks, Snowflake, Power BI.",
    images: [`${siteUrl}/og-image.png`],
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
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dheeraj Kashyap",
  jobTitle: "BI & Analytics Engineer",
  description:
    "Senior BI & Analytics Engineer specializing in Microsoft Fabric, Databricks, Snowflake, Power BI, and Lakehouse Architecture.",
  url: siteUrl,
  email: "kash.dheeraj.yap@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: [
    "https://linkedin.com/in/kashyap-dheeraj",
    "https://github.com/dheekash",
  ],
  knowsAbout: [
    "Microsoft Fabric",
    "Databricks",
    "Snowflake",
    "Power BI",
    "Lakehouse Architecture",
    "Data Engineering",
    "Analytics Engineering",
    "Business Intelligence",
    "dbt",
    "PySpark",
    "Python",
    "SQL",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Deakin University" },
    { "@type": "CollegeOrUniversity", name: "REVA University" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TooltipProvider>
            <GlassBackground />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <StickyResumeButton />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
