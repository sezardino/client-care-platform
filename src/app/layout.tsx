import { getQueryClientForHydration } from "@/libs/react-query";
import "@/styles/index.css";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import { currentUserQuery } from "./hooks/current-user";
import { ClientProviders } from "./providers";

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

export const metadata: Metadata = {
  title: "Client care",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClientForHydration();
  await queryClient.prefetchQuery(currentUserQuery);
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </ClientProviders>
      </body>
    </html>
  );
};

export default RootLayout;
