import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";

const poppins = Poppins({weight:["400","700"], subsets: ["latin"] });
const raleway = Raleway({weight:["400","700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moments",
  description: "The place to chat with your friends and save all your favorite memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} ${poppins.className}`}>{children}</body>
    </html>
  );
}
