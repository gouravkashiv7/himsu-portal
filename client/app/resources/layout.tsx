import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Resources – Notes, PYQs & Videos",
  description:
    "Free study resources for Chandigarh college students — previous year question papers, digital notes, and video lectures. Community-driven by HIMSU.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Study Resources – HIMSU",
    description:
      "Free PYQs, notes, and videos for college students in Chandigarh.",
    url: "https://himsu.in/resources",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
