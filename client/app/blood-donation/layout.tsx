import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Donation – Donate & Save Lives",
  description:
    "Find and register as a blood donor in Chandigarh. HIMSU connects donors with those in need across PGI, GMCH-32, and local hospitals.",
  alternates: {
    canonical: "/blood-donation",
  },
  openGraph: {
    title: "Blood Donation – HIMSU",
    description:
      "Emergency blood donation platform connecting donors and recipients in Chandigarh.",
    url: "https://himsu.in/blood-donation",
  },
};

export default function BloodDonationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
