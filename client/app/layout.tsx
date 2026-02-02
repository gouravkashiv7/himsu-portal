import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import "./globals.css";

// Font optimization (assuming variable fonts are set up in globals or similar)
// If not, we can stick to defaults for now, but imports should be clean.

export const metadata = {
  title: "HIMSU - Himachal Students Union",
  description:
    "Official Admission Portal for PU, DAV, PPGC-11, and SD College.",
};

import { Footer } from "@/components/layout/footer";
import { WhatsAppWidget } from "@/components/communication/whatsapp-widget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  );
}
