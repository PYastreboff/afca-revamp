import type { Metadata } from "next";
import { LatestNewsPage } from "@/components/LatestNewsPage";

export const metadata: Metadata = {
  title: "Latest news",
  description:
    "Stay informed with the latest news from AFCA, including updates on dispute resolution, systemic issues, and new initiatives to support consumers.",
};

export default function Page() {
  return <LatestNewsPage />;
}
