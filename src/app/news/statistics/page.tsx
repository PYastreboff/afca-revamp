import type { Metadata } from "next";
import { StatisticsPage } from "@/components/StatisticsPage";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Complaint statistics, annual reviews, and data snapshots from AFCA, including the AFCA Datacube for comparative reporting.",
};

export default function Page() {
  return <StatisticsPage />;
}
