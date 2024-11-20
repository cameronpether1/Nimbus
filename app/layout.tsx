import { GeistSans } from "geist/font/sans";
import "./globals.css";
import HeaderAuth from "@/components/header-auth";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

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
          <main className="min-h-screen flex flex-col items-center ">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full justify-around bg-background shadow-md flex border-b border-b-foreground/10">
                <div className="w-full flex justify-evenly items-center p-3 px-5 text-sm ">
                  <div className="flex gap-5 w-[50%] items-center font-semibold ">
                    <Link href={"/"} className="text-lg">
                      NIMBUS
                    </Link>
                    <div className="flex items-center gap-2 ">
                      <Link
                        className=" flex justify-center items-center rounded-md p-2 py-1 hover:bg-accent"
                        href={"/fleet"}
                      >
                        Fleet
                      </Link>
                      <Link
                        className=" flex justify-center items-center rounded-md p-2 py-1 hover:bg-accent"
                        href={"/protected"}
                      >
                        Flights
                      </Link>
                    </div>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="w-full h-full flex flex-col justify-center items-center ">
                {children}
              </div>
              <Toaster />
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
