import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/header";
import { Toaster } from "sonner";
import Appprovider from "@/app/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import accountApiRequest from "@/apiRequest/account";
import { AccountResType } from "@/schemaValidations/account.schema";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Productic',
    default: 'Productic'
  },
  description: 'Học NextJs Free'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  let user: AccountResType["data"] | null = null;
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken.value);
    user = data.payload.data;
  }
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
          <Appprovider initialSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </Appprovider>
        </ThemeProvider>
      </body>
    </html>
  );
}
