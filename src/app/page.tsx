import { Metadata } from "next";
import ClientPage from "@/shared/layout/ClientPage";

export const metadata: Metadata = {
  title: "Meet5 - Activities",
  description:
    "Discover and join local activities with likeminded people in your area.",
};

export default function HomePage() {
  return <ClientPage />;
}
