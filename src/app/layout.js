import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Ben Abraham Biju",
  description: "Portfolio of Ben Abraham Biju",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HF2QCF3HDT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HF2QCF3HDT');
        `}
      </Script>
      <body className={`${inter.className} antialiased min-h-screen bg-black text-white flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
