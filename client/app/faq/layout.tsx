import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Frequently Asked Questions",
  description:
    "Find answers to common questions about college admissions, exams, hostel, and campus life in Chandigarh. Get help from HIMSU volunteers.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ – HIMSU",
    description:
      "Common questions about admissions, exams, hostel, and campus life answered.",
    url: "https://himsu.in/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
