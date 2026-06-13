import type { Metadata } from "next";
import { ApplyForMembershipPage } from "@/components/ApplyForMembershipPage";

export const metadata: Metadata = {
  title: "Apply for membership",
  description:
    "Apply for AFCA membership as an Authorised Credit Representative or Licensee. View FY27 fees, explainer videos, and membership requirements.",
};

export default function Page() {
  return <ApplyForMembershipPage />;
}
