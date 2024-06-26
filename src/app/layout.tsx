import { AllClientContexts } from "@/components/AllClientContexts";
import { UserProvider } from "@/components/userContext";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serving the People",
  description: "Portal for SERVING the PEOPLE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="1GsF-xV-sPLqVz0VpBxDUG3mMx9ampe6l8VFGtTdO10"
      />
      <body>
        <div>
          <AllClientContexts>
            <ClerkProvider
              publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            >
              <UserProvider>
                {children}
                <Analytics />
              </UserProvider>
            </ClerkProvider>
          </AllClientContexts>
        </div>
      </body>
    </html>
  );
}
