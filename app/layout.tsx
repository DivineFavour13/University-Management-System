import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { QueryProvider } from "@/components/shared/query-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UniManage - The Modern University, Fully Managed",
  description:
    "A comprehensive university management system for students, faculty, and administrators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#3B82F6",
          colorBackground: "#111827",
          colorText: "#F9FAFB",
          colorInputBackground: "#1F2937",
          colorInputText: "#F9FAFB",
          colorDanger: "#EF4444",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "bg-[#111827] border border-[#1F2937]",
          formFieldInput: "bg-[#1F2937] border-[#374151] text-[#F9FAFB]",
          formButtonPrimary: "bg-[#3B82F6] hover:bg-[#2563EB]",
          footerActionLink: "text-[#3B82F6] hover:text-[#60A5FA]",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} font-sans antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
          >
            <QueryProvider>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "#111827",
                    border: "1px solid #1F2937",
                    color: "#F9FAFB",
                  },
                }}
              />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
