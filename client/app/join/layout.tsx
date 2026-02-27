import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join HIMSU – Register or Login",
  description:
    "Join 50,000+ Himachali students. Register as a HIMSU member, login to your dashboard, or sign up as a blood donor.",
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: "Join HIMSU",
    description:
      "Register as a member or blood donor. Access your HIMSU dashboard.",
    url: "https://himsu.in/join",
  },
  robots: {
    index: false, // Login/registration pages shouldn't be indexed
    follow: true,
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
