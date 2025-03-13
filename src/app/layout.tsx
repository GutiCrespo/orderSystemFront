import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Order Management System",
  description: "A order management system to track orders from pending to completed state.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`antialiased flex flex-col items-center m-4`}
      >
        {children}
      </body>
    </html>
  );
}
