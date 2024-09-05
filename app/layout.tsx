import { GeistSans } from "geist/font/sans";
import "./globals.css";
import HeaderAuth from "@/components/header-auth";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import Image from "next/image";
import nimbus from "../public/nimbusalt.png";
import { useEffect } from "react";
import Aircraft from "@/components/aircraft";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nimbus",
  description: "The new Era Of Flight Simulation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-[80%] mt-5 justify-around  rounded-full bg-background flex border-b border-b-foreground/10 h-16">
                <div className="w-full flex justify-evenly items-center p-3 px-5 text-sm ">
                  <div className="flex gap-5 w-[50%] items-center font-semibold ">
                    <Link href={"/"}>NIMBUS</Link>
                    <div className="flex items-center gap-2 ">
                      <Link
                        className="border rounded-md p-2 py-1 hover:bg-accent"
                        href={"/fleet"}
                      >
                        Fleet
                      </Link>
                      <Link
                        className="border rounded-md p-2 py-1 hover:bg-accent"
                        href={"/protected"}
                      >
                        Flights
                      </Link>
                    </div>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div>{children}</div>
              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
