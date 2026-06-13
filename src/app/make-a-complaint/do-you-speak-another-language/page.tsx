import type { Metadata } from "next";
import { LanguagesPage } from "@/components/LanguagesPage";

export const metadata: Metadata = {
  title: "Do you speak another language?",
  description:
    "Information and support about making a complaint to AFCA is available in many languages.",
};

export default function Page() {
  return <LanguagesPage />;
}
