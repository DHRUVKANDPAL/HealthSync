import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bot } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title:
    "HealthSync | Advanced Real-Time Healthcare Solution for Hospitals, Patients, Doctors, and Pharmacies",
  description:
    "HealthSync is an all-in-one healthcare platform designed for hospitals, patients, doctors, and pharmacies. Offering real-time OPD management, bed availability tracking, patient care optimization, pharmacy inventory management, and a centralized health dashboard. Experience seamless healthcare collaboration with cutting-edge technology built for the modern healthcare ecosystem.",
  icons: {
    icon: ["https://i.imghippo.com/files/4OFtW1729338402.jpg"],
  },
  openGraph: {
    title:
      "HealthSync | Real-Time Healthcare Solution for Hospitals, Doctors, Patients & Pharmacies",
    description:
      "HealthSync revolutionizes healthcare with an integrated platform for hospitals, patients, doctors, and pharmacies. It offers real-time OPD tracking, pharmacy inventory control, bed availability updates, and a centralized patient dashboard for optimized care.",
    url: "https://healthsync-alpha.vercel.app/",
    images: [
      {
        url: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
        width: 800,
        height: 600,
        alt: "HealthSync logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "HealthSync | Transforming Real-Time Healthcare for Hospitals, Doctors, Patients & Pharmacies",
    description:
      "Join the future of healthcare with HealthSync's all-in-one platform for hospitals, patients, doctors, and pharmacies. Real-time OPD management, bed tracking, pharmacy solutions, and patient dashboards for seamless healthcare collaboration.",
    images: ["https://i.imghippo.com/files/4OFtW1729338402.jpg"],
  },
  keywords:
    "HealthSync, healthcare platform, real-time healthcare solution, hospital management software, patient care system, pharmacy inventory management, doctor-patient communication, OPD tracking software, bed availability tracker, healthcare technology, health dashboard, modern healthcare ecosystem,OPD queuing, patient history management, patient care optimization, healthsync vercel, vercel healthsync, healthsync, vercel, vercel.app",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.opencagedata.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="shortcut icon"
          href="https://i.imghippo.com/files/4OFtW1729338402.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "HealthSync",
              description:
                "HealthSync is an all-in-one healthcare platform for hospitals, doctors, patients, and pharmacies, offering real-time OPD management, bed tracking, pharmacy control, and patient dashboards.",
              applicationCategory: "Healthcare",
              operatingSystem: "Web",
              author: [
                {
                  "@type": "Organization",
                  name: "HealthSync",
                },
                {
                  "@type": "Person",
                  name: "Dhruv Kandpal",
                  role: "Team Lead & Backend Developer",
                },
                {
                  "@type": "Person",
                  name: "Sumit Sati",
                  role: "Frontend Developer",
                },
                {
                  "@type": "Person",
                  name: "Dewansh Mishra",
                },
                {
                  "@type": "Person",
                  name: "Tarush Gupta",
                },
              ],
              url: "https://healthsync-alpha.vercel.app/",
              image: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
              screenshot: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
            }),
          }}
        />
        <link rel="canonical" href="https://healthsync-alpha.vercel.app" />
        <meta
          name="google-site-verification"
          content="2tZd09eJ5U0jzjc3J802qGxywHG4Pkn_ckfWozi7SHA"
        />
        <meta name="msvalidate.01" content="F58EC3AEFB2BF4428D99AB71DCC624D4" />
      </head>
      <body className={inter.className}>
        <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary Background Elements */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-200/30 dark:bg-teal-900/20 blur-3xl" />
            <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-900/20 blur-3xl" />

            {/* Centered Bottom Glow - Light Mode */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                          bg-gradient-to-t from-teal-300/50 to-teal-200/10 
                          blur-3xl rounded-t-full 
                          dark:opacity-0"
            />

            {/* Centered Bottom Glow - Dark Mode */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                          bg-gradient-to-t from-teal-800/60 to-teal-700/5
                          blur-3xl rounded-t-full opacity-0 
                          dark:opacity-100"
            />

            {/* Additional Background Elements */}
            <div className="absolute -bottom-32 left-1/4 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl" />

            {/* Light Mode Particles */}
            <div className="absolute bottom-24 left-1/4 w-4 h-4 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
            <div className="absolute bottom-36 left-2/3 w-3 h-3 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
            <div className="absolute bottom-48 left-1/3 w-2 h-2 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />

            {/* Dark Mode Particles */}
            <div className="absolute bottom-24 left-1/4 w-4 h-4 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
            <div className="absolute bottom-36 left-2/3 w-3 h-3 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
            <div className="absolute bottom-48 left-1/3 w-2 h-2 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />

            {/* Repeated Pattern for Longer Pages */}
            <div className="absolute top-[60%] -left-32 w-96 h-96 rounded-full bg-teal-200/30 dark:bg-teal-900/20 blur-3xl" />
            <div className="absolute top-[90%] right-0 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-900/20 blur-3xl" />
            <div className="absolute top-[120%] left-1/4 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl" />
          </div>

          {/* Main Content Container */}
          
          <div className="relative z-10">{children}</div>
          <Toaster richColors></Toaster>
          <Analytics></Analytics>
          <SpeedInsights></SpeedInsights>
        </div>
      </body>
    </html>
  );
}
