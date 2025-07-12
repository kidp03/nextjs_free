import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/header";
import { Toaster } from "sonner";
import Appprovider from "@/app/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import { AccountResType } from "@/schemaValidations/account.schema";
import { baseOpenGraph } from "@/app/shared-metadata";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Productic",
    default: "Productic",
  },
  description: "Học NextJs Free",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: AccountResType["data"] | null = null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Appprovider user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </Appprovider>
        </ThemeProvider>
      </body>
    </html>
  );
}
