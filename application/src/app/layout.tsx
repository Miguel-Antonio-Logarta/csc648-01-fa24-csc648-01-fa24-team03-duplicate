import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Josefin_Sans, Shantell_Sans } from "next/font/google"
import Provider from "./context/Provider";
import { Toaster } from "react-hot-toast";
import SearchProvider from "./context/SearchContext";
import Script from "next/script";
import GoogleMapsLibraryProvider from "./context/GoogleMapsLibraryContext";

// Backup fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Our main fonts
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: "swap",
  variable: "--font-josefin-sans"
});

const shantellSans = Shantell_Sans({
  subsets: ['latin'],
  display: "swap",
  variable: "--font-shantell-sans"
});

export const metadata: Metadata = {
  title: "Coffee Spot",
  description: "An Application Focused on Finding Third Spaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* MUST WRAP PROVIDER AROUND ENTIRE HTML PAGES TO ACCESS SESSION DATA */}
      <Provider>
        <GoogleMapsLibraryProvider>
          <SearchProvider>
            <body
              className={`${josefinSans.variable} ${shantellSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <Toaster />
              {children}
            </body>
          </SearchProvider>
        </GoogleMapsLibraryProvider>
      </Provider>
      {/* Script used for Places API */}
      {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`} /> */}
    </html>
  );
}
