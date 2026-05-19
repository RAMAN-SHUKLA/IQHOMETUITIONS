import { Metadata } from "next";
import FindTutorClient from "./FindTutorClient";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Best Home Tutors in Kanpur | Verified Private Teachers | IQ Home Tuitions",
  description: "Find the best home tutors in Kanpur for all subjects, classes, and boards. Choose verified private teachers near you on IQ Home Tuitions.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/find-tutor`,
  },
};

export default function FindTutorPage() {
  return <FindTutorClient />;
}
