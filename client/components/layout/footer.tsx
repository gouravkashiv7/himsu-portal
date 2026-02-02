import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-sm font-medium">
              © HIMSU {2011}-{currentYear}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Himachal Students Union. All rights reserved.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://www.instagram.com/himsu_official/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background rounded-full hover:text-primary transition-colors border shadow-sm"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:contact@himsu.org"
              className="p-2 bg-background rounded-full hover:text-primary transition-colors border shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            Designed by{" "}
            <a
              href="https://gouravkashiv.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors"
            >
              Codefinite
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
