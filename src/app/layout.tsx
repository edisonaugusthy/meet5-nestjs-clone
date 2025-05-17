import { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "@/shared/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet5 - Find Activities Near You",
  description: "Discover and join local activities with likeminded people.",
  keywords:
    "social activities, meetups, events, gatherings, local events, networking",
  openGraph: {
    title: "Meet5 - Find Activities Near You",
    description: "Discover and join local activities with likeminded people.",
    url: "https://meet5.de",
    siteName: "Meet5",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
